//Import dependancy components
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import { useNavigate } from "react-router-dom";

//Function Component
function Home() {

const navigate = useNavigate();
const onSubmit = async(event) => {
    event.preventDefault();//prevent browser from sending data to server
    try {
        //open the "Bookings" component
        //alert('Form was submitted!');
        navigate("/bookings");
    }
    catch(e) {
        alert('ERROR!!!');
    }
    }

    //Component UI: HTML Rendering
    return(<>
        <form className="row" style={{minHeight: '60vh'}} onSubmit={onSubmit}>
            {/*Customner Details*/}
            <div className="col-12 col-lg-4 p-4 m-0"
            style={{minHeight:'30vh', backgroundColor:'#FCF3CF'}}> <FormCustomerDetail />
            </div>

            {/*Repair Details*/}
            <div className="col-12 col-lg-4 p-4 m-0"
            style={{minHeight:'30vh', backgroundColor:'#D5F5E3'}}> <FormRepairDetail />
            </div>

            {/*Courtesy Phone & Cost*/}
            <div className="col-12 col-lg-4 p-0 m-0">
                {/*Courtesy phone*/}
                <div className="p-4"
                style={{minHeight:'30vh', backgroundColor:'#2874A6'}}> <FormCourtesyPhone />
                </div>
                
                {/*Cost*/}
                <div className="p-4" style={{minHeight:'20vh', backgroundColor:'#EDBB99'}}> <FormCost />
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