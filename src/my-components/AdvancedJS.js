//Imports
import Demo1 from './js-demos/demo1.js';
//Constants and functions


//Function Component
function AdvancedJS() {
    //Component UI: HTML Rendering
    return(<>
    <div style={{minHeight: '60vh'}}>
        <div class="accordion row align-items-start g-1" id="accordionDemo">{/*Start of All Demos Section*/}
        
            <div class="row col-12 col-lg-3 g-1">{/*Accordian Header Buttons*/}
                <h2 class="accordion-header col-6 col-lg-12">
                    <button class="accordion-button border border-primary" type="button" 
							data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        DEMO 1
                    </button>
                </h2>
                <h2 class="accordion-header col-6 col-lg-12">
                    <button class="accordion-button collapsed border border-primary" type="button" 
						data-bs-toggle="collapse" data-bs-target="#collapseTwo">
						DEMO 2
                    </button>
                </h2>
                <h2 class="accordion-header col-6 col-lg-12">
                    <button class="accordion-button collapsed border border-primary" type="button" 
						data-bs-toggle="collapse" data-bs-target="#collapseThree">
						DEMO 3
                    </button>
                </h2>
                <h2 class="accordion-header col-6 col-lg-12">
                    <button class="accordion-button collapsed border border-primary" type="button" 
						data-bs-toggle="collapse" data-bs-target="#collapseFour">
						DEMO 4
                    </button>
                </h2>
            </div>

            {/*<!--DEMOS BEGIN HERE-->*/}
            <div class="col-12 col-lg-9"> {/*<!--main demos div-->*/}

                <div class="accordion-item"> {/*<!--Demo 1-->*/}
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionDemo">
                        <div class="accordion-body">
                            <div class="bg-warning fs-2 p-2 text-center">Placeholder Title</div>   
                            <div>
                                <Demo1 />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item"> {/*<!--Demo 2-->*/}
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionDemo">
                        <div class="accordion-body">
                            <div class="bg-warning fs-2 p-2 text-center">Placeholder Title</div>   
                            <div>
                                {/*DEMO SPACE*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item"> {/*<!--Demo 3-->*/}
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionDemo">
                        <div class="accordion-body">
                            <div class="bg-warning fs-2 p-2 text-center">Placeholder Title</div>   
                            <div>
                                {/*DEMO SPACE*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item"> {/*<!--Demo 4-->*/}
                    <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionDemo">
                        <div class="accordion-body">
                            <div class="bg-warning fs-2 p-2 text-center">Placeholder Title</div>   
                            <div>
                                {/*DEMO SPACE*/}
                            </div>
                        </div>
                    </div>
                </div>



            </div>



        </div>{/*<!--End of All Demos Section-->*/}
    </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default AdvancedJS;