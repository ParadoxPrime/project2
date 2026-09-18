//Function Component
function FormCost() {
    //Component UI: HTML Rendering
    return(<>
        <h2>Cost</h2>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value="0.00" readonly />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value="85.00" readonly/>
        </div>
        <div class="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value="0.00" readonly />
        </div>

        <div class="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">GST ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value="0.00" readonly />
        </div>
        <div class="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total(+GST) ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value="0.00" readonly />
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost;