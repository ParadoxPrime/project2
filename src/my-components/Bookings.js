//Import all dependancies, other comps, etc
import { useState, useEffect } from 'react';
import { supabase } from './include/supabaseClient';

const formatInvoiceDate = (value) => {
    if (!value) return 'Not set';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Invalid date';

    return new Intl.DateTimeFormat('en-NZ', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    }).format(date);
};

const getBookingSearchText = (booking) => [
    `Job Number: ${booking.job_number ?? 'Not set'}`,
    `Invoice Date: ${formatInvoiceDate(booking.invoice_date)}`,
    `Customer: ${booking.customertype ?? ''} - ${booking.title ?? ''} ${booking.first_name ?? ''} ${booking.last_name ?? ''}`,
    `Address: ${[booking.street, booking.suburb, booking.city, booking.postcode].filter(Boolean).join(', ')}`,
    `Phone: ${booking.phone ?? ''} | Email: ${booking.email ?? ''}`,
    `Purchase Date: ${booking.purchase_date ?? ''} | Repair Date: ${booking.repair_date ?? ''}`,
    `Warranty: ${booking.warranty ? 'Yes' : 'No'} | IMEI: ${booking.imei ?? ''}`,
    `Make: ${booking.make ?? ''} | Model: ${booking.model_number ?? ''}`,
    `Fault: ${booking.fault_category ?? ''}`,
    `Description: ${booking.description ?? ''}`,
    `Courtesy Phone: ${booking.courtesy_phone ?? 'none'} | Courtesy Charger: ${booking.courtesy_charger ?? 'none'}`,
    `Bond: ${booking.bond ?? ''}`,
    `Service fee: ${booking.service ?? ''}`,
    `Total: ${booking.total ?? ''} | GST: ${booking.gst ?? ''} | Total (+GST): ${booking.total_with_gst ?? ''}`
].join(' ').toLowerCase();

//Function Component
function Bookings() {
    //States
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [enteredKeywords, setEnteredKeywords] = useState(''); //State for keyword search

    // Fetch bookings from supa
    const fetchBookings = async () => {
        try {
        //Set loading state
        setLoading(true);
        //Fetch Supa data
        const { data, error } = await supabase.from('bookings').select('*');
        console.log('Fetched bookings:', data);
        //handle error
        if (error) throw error;
        //Update state with fetched data
        setBookings(data);

        } catch (error) {
        setError(error.message);
        console.error('Error fetching bookings:', error);
        } finally {
        setLoading(false);
        }
    };

    //UseEffect to fetch bookings
    useEffect(() => {
        fetchBookings();
    }, []);

    const keyword = enteredKeywords.trim().toLowerCase();
    const filteredBookings = bookings.filter((booking) =>
        getBookingSearchText(booking).includes(keyword)
    );

    //Component UI: HTML Rendering
    return (
        <>
            <h1>Bookings</h1>
            {/*Add search box on top*/}
            <div className='row'>
                <input className='col-11 m-3'
                    type='text'
                    name='search'
                    onChange={(e) => {setEnteredKeywords(e.target.value)} } placeholder='Keywords' >
                </input>
            </div>

            {/*Retrieve data from bookings table on supabase */}
            <div className="p-2 m-2 row">
            {loading ? (<p>Loading bookings...</p>) : error ? (<p style={{ color: "red" }}>Error: {error}</p>) : (
                <div className="row">
                    {filteredBookings.map((booking) => (
                    <div className="col-12 col-lg-6 mb-3" key={booking.id}>
                    <div style={{ border: "1px solid gray", padding: "10px", height: "100%", borderRadius: "5px" }}>
                    <p>{"Job Number: " + (booking.job_number ?? 'Not set')}</p>
                    <p>{"Invoice Date: " + formatInvoiceDate(booking.invoice_date)}</p>
                    <p>{"Customer: " + booking.customertype + " - " + booking.title + " " + booking.first_name + " " + booking.last_name}</p>
                    <p>{"Address: " + [booking.street, booking.suburb, booking.city, booking.postcode].filter(Boolean).join(", ")}</p>
                    <p>{"Phone: " + (booking.phone ?? '') + " | Email: " + (booking.email ?? '')}</p>
                    <p>{"Purchase Date: " + (booking.purchase_date ?? '') + " | Repair Date: " + (booking.repair_date ?? '')}</p>
                    <p>{"Warranty: " + (booking.warranty ? 'Yes' : 'No') + " | IMEI: " + (booking.imei ?? '')}</p>
                    <p>{"Make: " + (booking.make ?? '') + " | Model: " + (booking.model_number ?? '')}</p>
                    <p>{"Fault: " + (booking.fault_category ?? '')}</p>
                    <p>{"Description: " + (booking.description ?? '')}</p>
                    <p>{"Courtesy Phone: " + (booking.courtesy_phone ?? 'none') + " | Courtesy Charger: " + (booking.courtesy_charger ?? 'none')}</p>
                    <p>{"Bond: " + booking.bond}</p>
                    <p>{"Service fee: " + booking.service}</p>  
                    <p>{"Total: " + (booking.total ?? '') + " | GST: " + (booking.gst ?? '') + " | Total (+GST): " + (booking.total_with_gst ?? '')}</p>
                    </div>
                </div>
                    ))}
                </div>
            )
            }</div>
        </>
    );
}
//Export
export default Bookings;
