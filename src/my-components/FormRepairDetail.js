import { useState } from "react";

//Handle the warranty checkbox, improved functions credit to Michael in class.
//Local date as YYYY-MM-DD
const toLocalISO = (d) => d.toLocaleDateString("en-CA");

//True if purchase date greater than 24 months before today
const isOverTwoYears = (value) => {
    if (!value) return false;
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setMonth(cutoff.getMonth() - 24);
    return new Date(value + "T00:00:00") < cutoff;
};

//Function Component
function FormRepairDetail() {
    //States
    const [purchaseDate, setPurchaseDate] = useState("");
    const [warranty, setWarranty] = useState(false);
    //Date Limits
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    //Warranty is disabled until purchasedate entered,a nd when over 24months
    //to leave enabled until a date is entered, use: isOverTwoYears(purchaseDate);
    const warrantyDisabled = !purchaseDate || isOverTwoYears(purchaseDate);

    //Methods and functions
    const handlePurchaseDateChange = (e) => {
        const value = e.target.value;
        setPurchaseDate(value);
        //Untick box if becoming disabled to prevent incorrect 'true' states
        if (!value || isOverTwoYears(value)) setWarranty(false);
    }

    //Old warranty handler function. Deprecated.
    const OLD_handleWarrantyChange = (e) => { 
        //Handle the warranty checkbox
        let purchaseDate = new Date(document.getElementById('purchaseDate').value);//Get entered purchase date
        let currentDate = new Date();//Get today
        let diffTime = Math.abs(currentDate - purchaseDate);//Get the difference in milliseconds
        let diffMonth = Math.ceil(diffTime/ (1000*60*60*24*30));//Convert milliseconds to months
        if(diffMonth > 24){//If the difference is more than 24 months (2 years), the warranty is disabled
            document.getElementById('warrantyCheckbox').disabled = true;
        } else {
            document.getElementById('warrantyCheckbox').disabled = false;
        }
    }

    //Component UI: HTML Rendering
    return(<>
        <h2>Repair Details</h2>
        <div className="row mt-1">
            <label class="col-12 col-md-12 col-lg-4">Purchase Date *</label>
            <input class="col-12 col-md-12 col-lg-7" type="date" id="purchaseDate"
                max={/*purchase date must not be before today*/
                    toLocalISO(today)}
                value={purchaseDate}
                onChange={handlePurchaseDateChange}
            required/>
        </div>
        <div class="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
            <input className="col-12 col-md-12 col-lg-7" type="date" 
            min={toLocalISO(tomorrow)}
            required/>
        </div>
        {/*Under Warranty*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                <legend className="col-11 float-none w-auto">Under Warranty</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                    <input type="checkbox" id="warrantyCheckbox" 
                    checked={warranty}
                    disabled={warrantyDisabled} 
                    onChange={(e) => setWarranty(e.target.checked)}/>
                </div>
            </fieldset>
        </div>
        {/*Other details*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">IMEI *</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" required />
        </div>
        <div className="row mt-2">
            <label className="col-12 col-md-12 col-lg-4">Make *</label>
            <select className="col-12 col-md-12 col-lg-7">
                <option value="Apple" selected>Apple</option>
                <option value="LG">LG</option>
                <option value="Motorola">Motorola</option>
                <option value="Nokia">Nokia</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Model Number</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"/>
        </div>
        <div className="row mt-2">
            <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
            <select className="col-12 col-md-12 col-lg-7">
                <option value="Battery" selected>Battery</option>
                <option value="Screen">Screen</option>
                <option value="Charging">Charging</option>
                <option value="SD-Storage">SD-Storage</option>
                <option value="Software">Software</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Description</label>
            <textarea className="col-12 col-md-12 col-lg-7" style={{ resize: 'none' }} rows="7"></textarea>
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormRepairDetail;