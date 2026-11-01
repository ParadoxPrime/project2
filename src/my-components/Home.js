//Import dependancy components
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from './include/supabaseClient';

//Function Component
function Home() {
    //Parent Component "Home"
    //Child1 FormCourtesyPhone and Child2 FormCost
    const updateSharedState = (value) => setsharedBond(value);//Child1(FormCourtesyPhone) pass data to Child2
    const [sharedBond, setsharedBond] = useState(0);//Child2(FormCost) receive data from Child1
    //Child1 FormRepairDetail and Child2 FormCost
    const updateWarranty = (value) => setSharedWarranty(value);//Child1(FormRepairDetail) pass data to Child2
    const [sharedWarranty, setSharedWarranty] = useState(false);//Child2(FormCost) receive data from Child1
    //Child1 FormCustomerDetail and Child2 FormCost
    const updateCustomerType = (value) => setSharedCustomerType(value);//Child1(FormCustomerDetail) pass data to Child2
    const [sharedCustomerType, setSharedCustomerType] = useState("customer");//Child2(FormCost) receive data from Child1

    //-----------
    //Data
    const navigate = useNavigate();
    
    //Form Submit Event Handler
    const onSubmit = async(event) => {
        event.preventDefault();//prevent browser from sending data to server
        try {
            const form = event.currentTarget;
            const formData = new FormData(form);
            const customerType = formData.get('customer_type');
            const courtesyPhone = form.querySelector('[name="courtesy_phone"]').selectedOptions[0].textContent;
            const courtesyCharger = form.querySelector('[name="courtesy_charger"]').selectedOptions[0].textContent;
            const serviceFee = sharedWarranty ? 0 : 85;
            const bond = customerType === "customer" ? sharedBond : 0;
            const total = bond + serviceFee;
            const gst = Number((total * 0.15).toFixed(2));

            //1: Build bookingData Object. Job number and invoice date are set by database defaults.
            const bookingData = {
                customertype: customerType,
                title: formData.get('title'),
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                street: formData.get('street'),
                suburb: formData.get('suburb'),
                city: formData.get('city'),
                postcode: formData.get('postcode'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                purchase_date: formData.get('purchase_date'),
                repair_date: formData.get('repair_date'),
                warranty: sharedWarranty,
                imei: formData.get('imei'),
                make: formData.get('make'),
                model_number: formData.get('model_number'),
                fault_category: formData.get('fault_category'),
                description: formData.get('description'),
                courtesy_phone: courtesyPhone,
                courtesy_charger: courtesyCharger,
                bond,
                service: serviceFee,
                total,
                gst,
                total_with_gst: Number((total + gst).toFixed(2))
            };
            // log the built data to console for verification
            console.log("bookingData: ", bookingData);
        
            //2: Insert bookingData into Supabase table
            const { data, error } = await supabase.from('bookings').insert([bookingData]);
            if (error) throw error;

            //Log success and clear the form
            console.log("Booking data inserted successfully:", data);
            form.reset();
            
            //3: Notify User
            alert('Booking submitted successfully!');

            //Navigate to bookings page
            navigate('/bookings');
        }
        catch(e) {
            console.error("Error submitting booking:", e);
            alert('onSubmit Error: ' + e.message);
        }
    }

    //Component UI: HTML Rendering
    return(<>
        <form className="row" style={{minHeight: '60vh'}} onSubmit={onSubmit}>
            {/*Customner Details*/}
            <div className="col-12 col-lg-4 p-4 m-0"
            style={{minHeight:'30vh', backgroundColor:'#FCF3CF'}}>
                <FormCustomerDetail passDataToParent={updateCustomerType} />
            </div>

            {/*Repair Details*/}
            <div className="col-12 col-lg-4 p-4 m-0"
            style={{minHeight:'30vh', backgroundColor:'#D5F5E3'}}> <FormRepairDetail passDataToParent={updateWarranty} />
            </div>

            {/*Courtesy Phone & Cost*/}
            <div className="col-12 col-lg-4 p-0 m-0">
                {/*Courtesy phone*/}
                <div className="p-4" style={{minHeight:'30vh', backgroundColor:'#2874A6'}}>
                    <FormCourtesyPhone passDataToParent={updateSharedState} /> {/*Child1*/}
                </div>
                
                
                {/*Cost*/}
                <div className="p-4" style={{minHeight:'20vh', backgroundColor:'#EDBB99'}}> 
                    <FormCost sharedPropBond={sharedBond} 
                                sharedPropWarranty={sharedWarranty}
                                sharedPropCustomerType={sharedCustomerType}
                                /> {/*Child2 (FormCost)*/}
                </div>
            </div>
            
            {/*Button area*/}
            <div className="p-4 text-center" style={{minHeight: '10vh', backgroundColor: '#EDBB99'}}> <FormButtons />
            </div>
        </form>
    </>);
}

//Export this component to the entire app, can be re-used or hooked into other Components
export default Home;