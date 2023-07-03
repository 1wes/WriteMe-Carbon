import React from "react";
import './home.css'

const Home=()=>{

    return(
        <React.Fragment>
            <div className="section" id="home-section">
                <div className="home">
                    <p className="punchline">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, <span>adipisci</span> velit.</p>
                    <p className="tagline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices ullamcorper fringilla. Integer auctor massa id dolor 
                    ultricies efficitur. Proin eu felis metus. Aenean vestibulum 
                    interdum magna nec vehicula. Sed et tincidunt orci. Morbi molestie ligula at lectus iaculis gravida. Mauris sit amet fermentum purus, vel dapibus magna.</p>

                    <div className="prompt">
                        <div className="scroll-down">
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Home;