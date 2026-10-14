//Import dependancies
import { useState } from 'react';

//Function Component
function FormCourtesyPhone() {

    //Courtesy Phone Form Component
    let courtesyList = [ 
        {id: 1, type: 'phone', name: 'iphone 10', bond: 275},
        {id: 2, type: 'phone', name: 'iphone 14', bond: 300},
        {id: 3, type: 'phone', name: 'iphone 16', bond: 500},
        {id: 4, type: 'phone', name: 'samsung galaxy', bond: 200},
        {id: 5, type: 'phone', name: 'nokia', bond: 150},
        {id: 6, type: 'phone', name: 'xiaomi', bond: 100},

        {id: 7, type: 'charger', name: 'iphone charger', bond: 45},
        {id: 8, type: 'charger', name: 'samsung charger', bond: 30},
        {id: 9, type: 'charger', name: 'nokia charger', bond: 25},
        {id: 10, type: 'charger', name: 'xiaomi', bond: 25}
    ];

    //Declare "state"
    const [phoneBorrow, setPhoneBorrow] = useState(0);// 0 = 'none'
    //Handle "onChange" event
    let addPhone = (selectedOption) => {
        selectedOption == 'none' ? setPhoneBorrow(0) : setPhoneBorrow(Number(selectedOption));
    }

    //Declare state, for courtesy chargers
    const [chargerBorrow, setChargerBorrow] = useState(0);// 0 = 'none'
    //Handle "onChange" event
    let addCharger = (selectedOption) => {
        selectedOption == 'none' ? setChargerBorrow(0) : setChargerBorrow(Number(selectedOption));
    }

    //Component UI: HTML Rendering
    return(<>
        <h2>Courtesy Phone</h2>
        {/*Phone item types*/}
        <h4 className='ms-4 mt-2'>Choose a phone</h4>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Item Type </label>
            <select className="col-12 col-md-12 col-lg-7"
                onChange={(selected) => addPhone(selected.target.value)}>
                <option value="none" selected>None</option>
                <option value="1">iPhone 10</option>
                <option value="2">iPhone 14</option>
                <option value="3">iPhone 16</option>
                <option value="4">Samsung Galaxy</option>
                <option value="5">Nokia</option>
                <option value="6">Xiaomi</option>
            </select>
        </div>

        {/*Charger item types*/}
        <h4 className='ms-4 mt-2'>Choose a charger</h4>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Item Type </label>
            <select className="col-12 col-md-12 col-lg-7" id="courtesyChargerSelect"
                onChange={(selected) => addCharger(selected.target.value)}>
                <option value="none" selected>None</option>
                <option value="7">iPhone Charger</option>
                <option value="8">Samsung Charger</option>
                <option value="9">Nokia Charger</option>
                <option value="10">Xiaomi Charger</option>
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

            {/*Display all items in the state in the table */}
            {phoneBorrow == 0 ? (null) : (
                <tr>
                    <td>{courtesyList.filter(item => {return item.id == phoneBorrow})[0].name}</td>
                    <td>{courtesyList.filter(item => {return item.id == phoneBorrow})[0].bond}</td>
                </tr>
            )
            }
            {chargerBorrow == 0 ? (null) : (
                <tr>
                    <td>{courtesyList.filter(item => {return item.id == chargerBorrow})[0].name}</td>
                    <td>{courtesyList.filter(item => {return item.id == chargerBorrow})[0].bond}</td>
                </tr>
            )}
            </table>
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCourtesyPhone;