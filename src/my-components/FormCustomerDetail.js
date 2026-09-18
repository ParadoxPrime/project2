//Function Component
function FormCustomerDetail() {
    //Component UI: HTML Rendering
    return(<>
        <h2>Customer Details</h2>
        {/*Customer type*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                <legend className="col-11 float-none w-auto">Customer type *</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Customer</label>
                    <input type="radio" name="customer-type" value="customer" checked />
                </div>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Business</label>
                    <input type="radio" name="customer-type" value="business" />
                </div>
            </fieldset>
        </div>
        {/*Details*/}
        <div className="row mt-2">
            <label className="col-12 col-md-12 col-lg-4">Title *</label>
            <select className="col-12 col-md-12 col-lg-7">
                <option value="Mr" selected>Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
            </select>
        </div>

        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">First Name *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                pattern="^[A-Za-z][A-Za-z\s'-]*$"
                title="Please enter a valid first name using letters, spaces, apostrophes, or hyphens."
                onInput={(e) => e.target.setCustomValidity('')}
                required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                pattern="^[A-Za-z][A-Za-z\s'-]*$"
                title="Please enter a valid last name using letters, spaces, apostrophes, or hyphens."
                onInput={(e) => e.target.setCustomValidity('')}
                required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Street *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                pattern="^[A-Za-z0-9\s.'-]+$"
                title="Please enter a valid street address."
                onInput={(e) => e.target.setCustomValidity('')}
                required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Suburb</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                pattern="^[A-Za-z\s.'-]*$"
                title="Please enter a valid suburb name."
                onInput={(e) => e.target.setCustomValidity('')}
            />
        </div>

        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">City *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                pattern="^[A-Za-z\s.'-]+$"
                title="Please enter a valid city name."
                onInput={(e) => e.target.setCustomValidity('')}
                required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Post Code</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                pattern="^\d{4}$"
                title="Please enter a 4-digit postcode."
                onInput={(e) => e.target.setCustomValidity('')}
            />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Phone Number *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                pattern="^(?:\+64\s?|0)?(?:\d{1,2}[\s-]?)?\d{3,4}[\s-]?\d{3,4}$"
                title="Please enter a valid NZ phone number, e.g. 021 123 4567 or +64 21 123 4567."
                onInput={(e) => e.target.setCustomValidity('')}
                required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Email *</label>
            <input className="col-12 col-md-12 col-lg-7" type="email" required/>
        </div>


    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCustomerDetail;