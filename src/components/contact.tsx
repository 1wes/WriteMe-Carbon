import React, { FormEventHandler, useState } from "react";
import "./contact.css";
import SectionHeader from "./heading";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { CtaButton } from "./services";
import { FormLegend } from "./create-order";
import testimonial1 from "../assets/testi.jpeg";
import testimonail2 from "../assets/testi2.jpeg";

const Testimonial: React.FunctionComponent<{
  name: string;
  occupation: string;
  testimony: string;
  src: string;
}> = ({ name, occupation, testimony, src }) => {
  return (
    <React.Fragment>
      <div className="testimonial">
        <div className="t-image">
          <img src={src} alt="client" />
        </div>
        <div className="id">
          <span className="name">{name} </span>
          <span> - </span>
          <span className="occupation">{occupation}.</span>
        </div>
        <div className="quote">
          <div>
            <i>
              <FaQuoteLeft />
            </i>
          </div>
          <div className="quote-text">{testimony.substring(0, 400)}</div>
          <div>
            <i>
              <FaQuoteRight />
            </i>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Contact: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setName(e.target.value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setEmail(e.target.value);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setSubject(e.target.value);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== "") {
      setMessage(e.target.value);
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <React.Fragment>
      <div className="section" id="contact-section">
        <div className="contact">
          <SectionHeader
            heading={`Contact Us`}
            tagline={`Fill in the submission form below to connect directly with us for queries and enquiries.`}
          />

          <div className="contact-content">
            <div className="testimonials">
              <SectionHeader
                tagline={`First, hear from some of our clients.`}
              />
              <div className="testimonials-card">
                <Testimonial
                  name={`John P.`}
                  occupation={`Researcher`}
                  src={testimonial1}
                  testimony={`It has
                                 been a pleasure working with the company's writers and I can confidently say that 
                                their writing skills are exceptional. their versatile styles of writing and adaptability to different writing formats 
                                have enabled them to consistently produce top notch content that captivates the mind.`}
                />
                <Testimonial
                  name={`Marylin S.`}
                  occupation={`Banker`}
                  src={testimonail2}
                  testimony={`Working with the writers has
                                 been a great delight as all my writing needs have always been 
                                fulfilled with superior craftsmanship. They have a great mastery in different writing formats thus delivering exactly what is required by
                                 guidelines and rubric. Additionally, they are also very creative.`}
                />
              </div>
            </div>
            <div className="contact-form" id="contact-form-section">
              <SectionHeader tagline={`Get in touch with us.`} />

              <div className="form-section">
                <form className="contact-us-form" onSubmit={submitForm}>
                  <label className="required">Name</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Your Name."
                      value={name}
                      onChange={handleNameChange}
                      required
                    ></input>
                  </div>

                  <label className="required">Email</label>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter Your Email."
                      value={email}
                      onChange={handleEmailChange}
                      required
                    ></input>
                  </div>

                  <label className="required">Subject</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Your Subject."
                      value={subject}
                      onChange={handleSubjectChange}
                      required
                    ></input>
                  </div>
                  <label className="required">Message</label>
                  <div>
                    <textarea
                      placeholder="Enter Your Message."
                      value={message}
                      onChange={handleMessageChange}
                      required
                    ></textarea>
                  </div>
                  <FormLegend />
                  <CtaButton
                    type={`submit`}
                    message={`Submit`}
                    id="contact-form-submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Contact;
