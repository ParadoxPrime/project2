//Function Component
function FormButtons() {
//Component UI: HTML Rendering
    return(<>
        <input type="submit" className="btn me-3 text-dark bg-white" style={{width: '5em'}} value="SUBMIT" />
        <input type="reset" className="btn me-3 text-dark bg-white" style={{width: '5em'}} value="RESET" />
        <input type="button" className="btn me-3 text-dark bg-white" style={{width: '5em'}} value="FAQ" />
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormButtons;