//Function Component
function FormCourtesyPhone() {
//Component UI: HTML Rendering
return(<>
    <h2>Courtesy Phone</h2>
    {/*Phone item types*/}
    <h4 className='ms-4 mt-2'>Choose a phone</h4>
    <div className="row mt-2 ms-3">
        <label className="col-12 col-md-12 col-lg-4">Item Type </label>
        <select className="col-12 col-md-12 col-lg-7" >
            <option value="none" selected>None</option>
            <option value="1">iPhone</option>
            <option value="2">Samsung Galaxy</option>
            <option value="3">Nokia</option>
        </select>
    </div>

    {/*Charger item types*/}
    <h4 className='ms-4 mt-2'>Choose a charger</h4>
    <div className="row mt-2 ms-3">
        <label className="col-12 col-md-12 col-lg-4">Item Type </label>
        <select className="col-12 col-md-12 col-lg-7" >
            <option value="none" selected>None</option>
            <option value="4">iPhone Charger</option>
            <option value="5">Samgsung Charger</option>
            <option value="6">Nokia Charger</option>
        </select>
    </div>
    {/*Table of added Courtesy items*/}
    <h4 className='ms-4 mt-2'>Borrow items</h4>
    <div className="row mt-2 ms-3 me-3 bg-white">
        <table class="table table-bordered" >
            <tr>
                <td>Item</td>
                <td>Cost</td>
            </tr>
        </table>
    </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCourtesyPhone;