//Function Component
function Header() {

    const headerStyle = {
        minheight: '15vh',
        backgroundColor: '#2C3E50'
    };

    const taglineStyle = {
        minheight: '15vh',
        backgroundColor: '#2C3E50'
    };

    //Component UI: HTML Rendering
    return (<>
        <header className="row" style={headerStyle}>
            <div className="col-12 col-md-12 col-lg-8 text-center text-white display-5" style={taglineStyle}>
                Phone Fix Booking System
            </div>

            <div className="col-12 col-md-12 col-lg-4">
                <div className="row">
                    <button className="col-12 col-md-6 col-lg-6 bg-info p-0 m-0 border border-dark text-center text-white">HOME</button>
                    <button className="col-12 col-md-6 col-lg-6 bg-info p-0 m-0 border border-dark text-center text-white">EXTENSION</button>
                </div>
            </div>
        </header>
    </>);
}

//Export this component to the entire app, can be re-used or hooked into other Components
export default Header;