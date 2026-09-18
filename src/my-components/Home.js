//Function Component
function Home() {
    //Component UI: HTML Rendering
    return(<>
        <form className="row" style={{minHeight: '60vh'}}>
            {/*Customner Details*/}
            <div className="col-12 col-lg-4 p-4 m-0"
            style={{minHeight:'30vh', backgroundColor:'#FCF3CF'}}> Customer Details
            </div>

            {/*Repair Details*/}
            <div className="col-12 col-lg-4 p-4 m-0"
            style={{minHeight:'30vh', backgroundColor:'#D5F5E3'}}>Repair Details
            </div>

            {/*Courtesy Phone & Cost*/}
            <div className="col-12 col-lg-4 p-0 m-0">
                {/*Courtesy phone*/}
                <div className="p-4"
                style={{minHeight:'30vh', backgroundColor:'#2874A6'}}>Courtesy Phone
                </div>
                
                {/*Cost*/}
                <div className="p-4" style={{minHeight:'20vh', backgroundColor:'#EDBB99'}}>Cost
                </div>
            </div>
            
            {/*Button area*/}
            <div className="p-4 text-center" style={{minHeight: '10vh', backgroundColor: '#EDBB99'}}>Buttons
            </div>
        </form>
    </>);
}

//Export this component to the entire app, can be re-used or hooked into other Components
export default Home;