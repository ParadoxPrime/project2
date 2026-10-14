//Import all dependencies, other Components
import Header from './my-components/Header'; //import Header Component
import Footer from './my-components/Footer'; //import Footer Component
import Home from './my-components/Home'; //import Home Component

//Function Component "App"
function App() {

    //Component UI: HTML Rendering
  return (
    <> {/*React Fragment: serve as parent component in JSX and doesn't add anything to the DOM */}
      <Header />
      <Home />
      <Footer />
    </>
  );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default App;