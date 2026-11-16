import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../include/supabaseClient';
import './demo4.css';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseDateKey(value) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
        ? date
        : null;
}

function Demo4() {
    const today = new Date();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [visibleMonth, setVisibleMonth] = useState(
        () => new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [selectedDate, setSelectedDate] = useState(() => toDateKey(today));

    const loadBookings = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            const { data, error: queryError } = await supabase
                .from('bookings')
                .select('id, job_number, repair_date, fault_category, make, model_number');

            if (queryError) throw queryError;
            setBookings(data ?? []);
        } catch (loadError) {
            setError(`Unable to load the bookings dashboard: ${loadError.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBookings();
    }, [loadBookings]);

    const bookingsByDate = useMemo(() => bookings.reduce((groups, booking) => {
        if (parseDateKey(booking.repair_date)) {
            groups[booking.repair_date] = [...(groups[booking.repair_date] ?? []), booking];
        }
        return groups;
    }, {}), [bookings]);

    const faultCounts = useMemo(() => {
        const counts = bookings.reduce((totals, booking) => {
            const category = booking.fault_category?.trim() || 'Not specified';
            totals[category] = (totals[category] ?? 0) + 1;
            return totals;
        }, {});

        return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    }, [bookings]);

    const monthBookings = bookings.filter(booking => {
        const date = parseDateKey(booking.repair_date);
        return date &&
            date.getFullYear() === visibleMonth.getFullYear() &&
            date.getMonth() === visibleMonth.getMonth();
    });

    const calendarDays = useMemo(() => {
        const firstWeekday = new Date(
            visibleMonth.getFullYear(),
            visibleMonth.getMonth(),
            1
        ).getDay();

        return Array.from({ length: 42 }, (_, index) =>
            new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index - firstWeekday + 1)
        );
    }, [visibleMonth]);

    const selectedBookings = bookingsByDate[selectedDate] ?? [];
    const maxFaultCount = faultCounts[0]?.[1] ?? 0;
    const monthLabel = new Intl.DateTimeFormat('en-NZ', {
        month: 'long',
        year: 'numeric'
    }).format(visibleMonth);

    function changeMonth(offset) {
        setVisibleMonth(current => new Date(current.getFullYear(), current.getMonth() + offset, 1));
        setSelectedDate(null);
    }

    function selectDate(date) {
        setSelectedDate(toDateKey(date));
    }

    return (
        <section className="demo4-dashboard" aria-labelledby="demo4-title">
            <header className="demo4-header">
                <div>
                    <p className="demo4-eyebrow">REPAIR WORKSHOP</p>
                    <h2 id="demo4-title">Bookings dashboard</h2>
                    <p className="demo4-subtitle">A quick view of upcoming repair dates and fault trends.</p>
                </div>
                <button className="demo4-refresh" type="button" onClick={loadBookings} disabled={loading}>
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </header>

            {error && (
                <div className="demo4-error" role="alert">
                    <span>{error}</span>
                    <button type="button" onClick={loadBookings} disabled={loading}>Try again</button>
                </div>
            )}

            {loading ? (
                <p className="demo4-empty" role="status">Loading bookings...</p>
            ) : !error ? (
                <>
                    <div className="demo4-summary" aria-label="Booking summary">
                        <article className="demo4-summary-card">
                            <span>Total bookings</span>
                            <strong>{bookings.length}</strong>
                        </article>
                        <article className="demo4-summary-card">
                            <span>Bookings this month</span>
                            <strong>{monthBookings.length}</strong>
                        </article>
                        <article className="demo4-summary-card">
                            <span>Fault categories</span>
                            <strong>{faultCounts.length}</strong>
                        </article>
                    </div>

                    <div className="demo4-panels">
                        <section className="demo4-panel demo4-calendar-panel" aria-labelledby="demo4-calendar-title">
                            <div className="demo4-panel-heading">
                                <div>
                                    <h3 id="demo4-calendar-title">Repair calendar</h3>
                                    <p>Bookings grouped by repair date</p>
                                </div>
                                <div className="demo4-month-controls">
                                    <button
                                        type="button"
                                        aria-label="Previous month"
                                        onClick={() => changeMonth(-1)}
                                    >
                                        &lsaquo;
                                    </button>
                                    <strong aria-live="polite">{monthLabel}</strong>
                                    <button
                                        type="button"
                                        aria-label="Next month"
                                        onClick={() => changeMonth(1)}
                                    >
                                        &rsaquo;
                                    </button>
                                </div>
                            </div>

                            <div className="demo4-calendar" role="group" aria-labelledby="demo4-calendar-title">
                                {weekDays.map(day => (
                                    <span className="demo4-weekday" key={day}>{day}</span>
                                ))}
                                {calendarDays.map(date => {
                                    const dateKey = toDateKey(date);
                                    const dayBookings = bookingsByDate[dateKey] ?? [];
                                    const outsideMonth = date.getMonth() !== visibleMonth.getMonth();
                                    const isToday = dateKey === toDateKey(today);

                                    return (
                                        <button
                                            className={[
                                                'demo4-day',
                                                outsideMonth ? 'is-outside-month' : '',
                                                isToday ? 'is-today' : '',
                                                selectedDate === dateKey ? 'is-selected' : ''
                                            ].filter(Boolean).join(' ')}
                                            type="button"
                                            key={dateKey}
                                            aria-label={`${date.toLocaleDateString('en-NZ', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}${dayBookings.length ? `, ${dayBookings.length} ${dayBookings.length === 1 ? 'booking' : 'bookings'}` : ''}`}
                                            aria-pressed={selectedDate === dateKey}
                                            onClick={() => selectDate(date)}
                                        >
                                            <span>{date.getDate()}</span>
                                            {dayBookings.length > 0 && (
                                                <span className="demo4-day-count">
                                                    {dayBookings.length} {dayBookings.length === 1 ? 'booking' : 'bookings'}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="demo4-day-details" aria-live="polite">
                                <h4>
                                    {selectedDate
                                        ? new Intl.DateTimeFormat('en-NZ', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long'
                                        }).format(parseDateKey(selectedDate))
                                        : 'Select a date'}
                                </h4>
                                {selectedBookings.length > 0 ? (
                                    <ul>
                                        {selectedBookings.map((booking, index) => (
                                            <li key={booking.id ?? `${booking.job_number}-${index}`}>
                                                <strong>Job {booking.job_number || '—'}</strong>
                                                <span>{[booking.make, booking.model_number].filter(Boolean).join(' ') || 'Device not specified'}</span>
                                                <span>{booking.fault_category || 'Fault not specified'}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="demo4-muted">
                                        {selectedDate ? 'No bookings for this date.' : 'Choose a calendar date to see its bookings.'}
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="demo4-panel demo4-fault-panel" aria-labelledby="demo4-fault-title">
                            <div className="demo4-panel-heading">
                                <div>
                                    <h3 id="demo4-fault-title">Common fault types</h3>
                                    <p>Booking count by fault category</p>
                                </div>
                            </div>
                            {faultCounts.length > 0 ? (
                                <ul className="demo4-fault-list">
                                    {faultCounts.map(([category, count]) => (
                                        <li key={category}>
                                            <div className="demo4-fault-label">
                                                <span>{category}</span>
                                                <strong>{count}</strong>
                                            </div>
                                            <div
                                                className="demo4-bar-track"
                                                role="img"
                                                aria-label={`${category}: ${count} ${count === 1 ? 'booking' : 'bookings'}`}
                                            >
                                                <span style={{ width: `${(count / maxFaultCount) * 100}%` }} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="demo4-muted">Fault type data will appear when bookings are available.</p>
                            )}
                        </section>
                    </div>
                </>
            ) : null}
        </section>
    );
}

export default Demo4;