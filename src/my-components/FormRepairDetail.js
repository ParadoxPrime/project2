//Function Component
function FormRepairDetail() {
//Component UI: HTML Rendering
return(<>
    <h2>Repair Details</h2>
    <div className="row mt-1">
        <label class="col-12 col-md-12 col-lg-4">Purchase Date *</label>
        <input class="col-12 col-md-12 col-lg-7" type="date" required/>
    </div>
    <div class="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
        <input className="col-12 col-md-12 col-lg-7" type="date" required/>
    </div>
    {/*Under Warranty*/}
    <div className="row">
        <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
            <legend className="col-11 float-none w-auto">Under Warranty</legend>
            <div>
                <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                <input type="checkbox" />
            </div>
        </fieldset>
    </div>
    {/*Other details*/}
    <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">IMEI *</label>
        <input className="col-12 col-md-12 col-lg-7" type="number" required />
    </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormRepairDetail;