import './7-1-2-HowItWorks.css';
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import TwebFooter from './7-1-Tweb-Footer';

export default function HowItWork() {
  const faqData = [
    {
      title: "How to Login/Register?",
      content:
        "Click on Login/Register, enter your mobile number or email address, verify using OTP, and complete your profile.",
    },
    {
      title: "How to Book Vehicle?",
      content:
        "Choose your preferred Toyota model, select variant and dealer, then proceed with booking by paying the booking amount.",
    },
    {
      title: "How to Book Test Drive?",
      content:
        "Select your preferred vehicle, choose your nearest dealer, pick a convenient date & time, and submit your request.",
    },
    {
      title: "How to Select Dealer?",
      content:
        "Use the dealer locator to find and choose your nearest authorized Toyota dealership.",
    },
    {
      title: "How to explore the product in Virtual Showroom?",
      content:
        "Open the Virtual Showroom to explore the vehicle with 360° view, features, colors, and specifications.",
    },
    {
      title: "How to add Extended Warranty in Quotation/Order?",
      content:
        "While creating your quotation or booking, simply select the Extended Warranty option before proceeding.",
    },
    {
      title: "How to add Smiles Plus in Quotation/Order?",
      content:
        "Choose the Smiles Plus package during quotation or order confirmation before making payment.",
    },
    {
      title: "How to evaluate the price for a Used Car?",
      content:
        "Provide your vehicle details such as model, year, kilometers driven, and condition to receive an estimated valuation.",
    },
    {
      title: "How to book physical valuation for a Used Car?",
      content:
        "Schedule an appointment with your nearest Toyota dealer for physical inspection and valuation.",
    },
    {
      title: "How to connect to customer care?",
      content:
        "Use the Contact Us section or call Toyota customer support for any assistance.",
    },
    {
      title: "How to Amend order?",
      content:
        "Contact your selected dealer before invoice generation to request changes to your order.",
    },
    {
      title: "How to Cancel Order?",
      content:
        "Go to My Orders, select your booking, and submit a cancellation request as per Toyota policy.",
    },
    {
      title: "How to Generate Quotation?",
      content:
        "Select your preferred model, variant, accessories, and dealer to generate a detailed quotation.",
    },
    {
      title: "How to View Payment Receipt?",
      content:
        "Visit My Orders > Payment History to download or print your payment receipt.",
    },
    {
      title: "How to Make Down Payment?",
      content:
        "Proceed to the payment section, enter the amount, and complete payment using your preferred payment method.",
    },
    {
      title: "How to initiate Finance?",
      content:
        "Choose Finance while booking, fill in your details, upload the required documents, and submit your application.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <div className="howGuideContainer">
      <div className="howGuideWrapper">
        {faqData.map((item, index) => (
          <div className="howGuideItem" key={index}>
            <button
              className="howGuideHeader"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.title}</span>

              {activeIndex === index ? (
                <FaMinus className="howGuideIcon" />
              ) : (
                <FaPlus className="howGuideIcon" />
              )}
            </button>

            {activeIndex === index && (
              <div className="howGuideContent">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <div>
        <TwebFooter />
    </div>
    </>
  );
}