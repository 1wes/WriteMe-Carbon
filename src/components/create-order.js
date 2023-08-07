import React from "react";
import './create-order.css';
import Navbar,{ MobileNavbar } from "./navbar";
import { OrderBreadcrumb } from "./breadcrumb";

const CreateOrder=()=>{

    return(

        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
            <section className="section" id="create-order-section">
                <div className="create-order">
                    <OrderBreadcrumb/>
                </div>
            </section>
        </React.Fragment>
    )
}
export default CreateOrder;