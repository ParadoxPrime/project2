//Import all dependencies, other Components
import Header from './my-components/Header'; //import Header Component
import Footer from './my-components/Footer'; //import Footer Component
import Home from './my-components/Home'; //import Home Component
import AdvancedJS from './my-components/AdvancedJS'; //import AdvancedJS Component
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';

//Function Component "App"
function App() {

    //Component UI: HTML Rendering
  return (
    <> {/*React Fragment: serve as parent component in JSX and doesn't add anything to the DOM */}
      <BrowserRouter>
        <Header /> {/*Header Component*/}
        <Routes>
          <Route path="/" element={<Home />} /> {/*Home Component*/}
          <Route path="/advanced-js" element={<AdvancedJS />} /> {/*AdvancedJS Component*/}
        </Routes>
        <Footer /> {/*Footer Component*/}
      </BrowserRouter>
    </>
  );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default App;