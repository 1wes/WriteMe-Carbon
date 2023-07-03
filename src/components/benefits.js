import React from "react";
import './benefits.css';
import SectionHeader from "./heading";
import { GiCheckMark } from 'react-icons/gi';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {BsGraphUpArrow} from 'react-icons/bs';

const BenefitsList=({icon, header, benefit})=>{

    return(
        <React.Fragment>
            <div className="list">
                <div className="list-content">
                    <i className="benefit-icon">
                        {icon}
                    </i>
                    <h3 className="benefit-header">
                        {header}
                    </h3>
                    <p className="description">
                        {benefit}
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

const Benefits=()=>{

    return(

        <React.Fragment>
            <div className="section" id="benefits-section">
                 <div className="benefits">
                    <SectionHeader heading={`Benefits of writing with us`}/>

                    <div className="benefits-list">
                        <BenefitsList icon={<BsGraphUpArrow/>} header={`High Quality`} benefit={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed ultrices ullamcorper fringilla. Integer auctor massa id dolor 
                        ultricies efficitur. Proin eu felis metus. Aenean vestibulum `} />
                        <BenefitsList icon={<FaRegMoneyBillAlt/>} header={`Value for Money`} benefit={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed ultrices ullamcorper fringilla. Integer auctor massa id dolor 
                        ultricies efficitur. Proin eu felis metus. Aenean vestibulum `} />
                        <BenefitsList icon={<GiCheckMark/>} header={`Value for Money`} benefit={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed ultrices ullamcorper fringilla. Integer auctor massa id dolor 
                        ultricies efficitur. Proin eu felis metus. Aenean vestibulum `} />
                        <BenefitsList icon={<FaRegMoneyBillAlt/>} header={`Value for Money`} benefit={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed ultrices ullamcorper fringilla. Integer auctor massa id dolor 
                        ultricies efficitur. Proin eu felis metus. Aenean vestibulum `} />
                        <BenefitsList icon={<GiCheckMark/>} header={`High Quality`} benefit={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed ultrices ullamcorper fringilla. Integer auctor massa id dolor 
                        ultricies efficitur. Proin eu felis metus. Aenean vestibulum `} />
                        <BenefitsList icon={<BsGraphUpArrow/>} header={`High Quality`} benefit={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed ultrices ullamcorper fringilla. Integer auctor massa id dolor 
                        ultricies efficitur. Proin eu felis metus. Aenean vestibulum `} />
                    </div>
                 </div>
            </div>
        </React.Fragment>
    )
}
export default Benefits;