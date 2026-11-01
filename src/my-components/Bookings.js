//Import all dependancies, other comps, etc
import { useState, useEffect } from 'react';
import { supabase } from './include/supabaseClient';

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
        [booking.title, booking.first_name, booking.last_name, booking.bond, booking.service]
            .some((value) => String(value ?? '').toLowerCase().includes(keyword))
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
            {loading ? (<p>Loading bookings...</p>) : error ? (<p style={{ color: "red" }}>Error: {error}</p>) : (
                filteredBookings.map((booking) => (
                <div key={booking.id}
                    style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                    <p>{booking.title + ": " + booking.first_name + " " + booking.last_name}</p>
                    <p>{"Bond: " + booking.bond}</p>
                    <p>{"Service fee: " + booking.service}</p>  
                </div>
                ))
            )
            }
        </>
    );
}
//Export
export default Bookings;
