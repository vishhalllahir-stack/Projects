import './3-3-warranty.css'
import { Wrench, RefreshCcw, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { ChevronDown, Settings} from "lucide-react";
import ToyotaFooter from './Footer';




  const ecoDriving = [
    "Avoid racing cold engines or exceeding maximum speed in gears.",
    "Ensure that the tyres are inflated to specified air pressure (crucial for fuel economy).",
    "Avoid frequent acceleration/deceleration and high speed driving.",
    "Switch off the engine when expecting long duration stops (e.g., traffic jams).",
    "Maintain a moderate speed on highways.",
    "Use the clutch only when it is required and avoid clutch riding.",
    "Never turn off the engine while coasting downhill.",
    "Use good-quality fuel from authorised filling stations.",
    "Observe the fuel consumption and if found irregular, immediately report to the Toyota Authorised Dealer."
  ];

  const emissionControl = [
    "Make sure the fuel tank cap is securely fastened and there is no leakage in the exhaust system, fuel system or lubrication system. If a leak is observed, please contact a Toyota Authorised Dealer.",
    "Ensure that vehicle inlet grills in front of the windshield are clear of snow, dust, leaves, or any obstructions.",
    "Use only Toyota Genuine Motor Oil and lubricants, and also ensure to use uncontaminated fuel.",
    "Ensure your vehicle is checked for PUC Emissions whenever it is attended by the authorised workshop.",
    "Check and maintain your vehicle regularly, so that its pollution is below the regulation limit all the time. Follow frequency of checking at least as per law, if not earlier.",
    "Ensure that consumable parts such as filter elements are replaced at proper recommended intervals or if it goes bad due to unavoidable conditions before service period. (whichever is earlier)",
    "Ensure that part replacement due to wear and tear and due to accidental damages is done with only Toyota recommended Genuine Parts at Toyota Dealer."
  ];



const warrantyItems = [
  {
    title: "Factors beyond the manufacturer's control",
    content: [
      "Repairs and adjustments required as a result of misuse (e.g, racing, overloading, over-revving or similar improper usage, negligence, modification, alteration, tampering, disconnection, improper adjustments or repairs by unauthorised Toyota dealer and/or personnel and use of add-on parts/materials not supplied by Toyota. The warranty shall cover neither accident repair nor trouble arising from accidents.",
      "Cosmetic or surface corrosion from stone chips or paint scratches.",
      "Damages and/or surface corrosion problems due to the environment, such as acid rain, airborne fallout (chemicals, tree, sap, etc.), salt, hail, windstorms, lightning, floods, torrential rain, and other acts of gods and any further damage to the related parts due to the above-mentioned reasons."
    ]
  },
  {
    title: "Extra Expenses",
    content: [
      "Incidental or consequential damages such as telephone calls, conveyance, loss of time, inconvenience or commercial loss.",
      "Towing charges unless specifically covered.",
      "Hotel, food, telephone and travel expenses.",
      "Loss of time, inconvenience or commercial loss.",
      "Any indirect or consequential damages."
    ]
  },
  {
    title: "Altered Mileage",
    content: [
      "Failure of a vehicle on which the odometer mileage has been altered so that the vehicle mileage cannot be readily ascertained.",
      "Warranty is not applicable if the odometer has been tampered with."
    ]
  },
  {
    title: "Normal Noise, Vibration and Deterioration",
    content: [
      "Normal noise, vibration, wear and tear or deterioration such as discolouration, fading, deformation or blurring and fabric discolouration",
      "Normal noise and vibration that do not affect vehicle performance.",
    ]
  },
  {
    title: "Failure due to negligence",
    content: [
      "Non-adherence to Periodic maintenance [PM] service schedule.",
      "Use of oil & fluids other than Toyota-recommended or contaminated fuel.",
      "Improper maintenance.",
      "Racing or competition use.",
      "Vehicle overload or misuse.",
      "Unauthorized modifications or repairs."
    ]
  },
  {
    title: "Maintenance is at Owner's Expense",
    content: [
      "Engine oil and filter replacement.",
      "Brake pads and clutch wear.",
      "Wheel alignment and balancing.",
      "Tyre rotation and replacement.",
      "Cleaning and polishing."
    ]
  }
];



  const warrantyData = [
    {
      item : "New Vehicle",
      duration : "3 Years or 1,00,000 km*"
    },

    {
      item : "HV battery for Hybrid Electric vehicle",
      duration : "8 Years or 1,60,000 km*"
    },
    {
      item : "HV battery for Battery Electric Vehicle",
      duration : "8 years or 2,00,000 km**"
    },

    {
      item : "Paint & Surface Rust",
      duration : "	3 years / 1,00,000 km***"
    },

    {
      item : "Accessories",
      duration : "1 year from the date of installation"
    },

    {
      item : "Service Parts",
      duration : "  6 months or 10,000 km*"
    },

    {
      item : "Counter sale Parts",
      duration : "6 months from the date of sale"
    },

    {
    item: "Extended Warranty",
    duration: (
      <>
        Starts immediately after completion of the standard vehicle
        warranty. For details,{" "}
        <a href="#">click here</a>
      </>
    ),
  },
];


export default function Waranty() {
   const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }    

  return (
    <>




    <div className='warranty-main'>
      <h1>1. Warranty Coverage</h1>
    </div>

    <div className="warranty-container">
      <div className="table-header">
        <div>Coverage Item</div>
        <div>Duration</div>
      </div>

      {
        warrantyData.map((itm,idx)=>(
          <div className="table-row" key={idx}>
              <div>{itm.item}</div>
              <div>{itm.duration}</div>
          </div>
        ))
      }
    </div>









    <div className='warranty-para'>
      <p>*Whichever is earlier from the date of sale.</p>
      <p>**HV Battery for BEV - Minimum 70% of Battery capacity throughout the Warranty Period.</p>
      <p>***For Innova, HyCross, Hilux & Fortuner (2 years / 50,000 km), Hilux - 1 year / 20,000 km (for deck)</p>
      <p>For vehicles used for conversion and commercial purposes such as taxis, hired cars, luxury rental cars, fleets, rally, or</p>
      <p>other competitive usage, the warranty applicability for the HV battery is 3 years or 1,00,000 km, whichever is earlier.</p>
    </div>

    <div className="warranty-info">

      <div className="info-row">
        <div className="icon-box">
          <Wrench size={30} strokeWidth={2.5} />
        </div>

        <p>
          <span>Repair Cost:</span> Warranty repairs are made at no cost to
          customers.
        </p>
      </div>

      <div className="info-row">
        <div className="icon-box">
          <RefreshCcw size={30} strokeWidth={2.5} />
        </div>

        <p>
          <span>Fully Transferable:</span> The unexpired portion is fully
          transferable to the subsequent owner.
        </p>
      </div>

      <div className="info-row">
        <div className="icon-box">
          <BadgeCheck size={30} strokeWidth={2.5} />
        </div>

        <p>
          <span>Validity:</span> Valid only within the country where the Toyota
          Distributor is registered.
        </p>
      </div>

    </div>







   <div className='mix-both'>
    <div className='head'>
    <h2>2. Exceptions</h2>
    <p>Tyres & Auxiliary Battery</p>
    </div>
  <div className="warranty-boxes">
    
    
  <div className="card">
    <div className="card-header">
      <span className="card-icon">⚙</span>
      <h6>Tyres</h6>
    </div>

    <div className="line"></div>

    <ul>
      <li>
        Tyres are warranted under a separate warranty provided by the tyre
        manufacturer.
      </li>

      <li>
        In case the service network of the respective manufacturer is not
        available in India, Toyota shall handle the warranty on behalf of the
        manufacturer, as per the manufacturer's terms & conditions.
      </li>
    </ul>
  </div>

  <div className="card">
    <div className="card-header">
      <span className="card-icon">🔋</span>
      <h6>Auxiliary Battery</h6>
    </div>

    <div className="line"></div>

    <ul>
      <li>
        Battery is warranted under a separate warranty provided by the battery
        manufacturer.
      </li>

      <li>
        In case the service network of the respective manufacturer is not
        available in India, Toyota shall provide a warranty of 12 months from
        the date of sale of the vehicle to the customer on behalf of the
        manufacturer.
      </li>
    </ul>
  </div>
</div>
</div>







    <div className="limitations-container">

      <h2>
        3. Limitations (What is NOT Covered)
      </h2>

      <div className="heading-line"></div>

      {warrantyItems.map((item, index) => (

        <div className="accordion" key={index}>

          <button
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.title}</span>

            <ChevronDown
              className={openIndex === index ? "rotate" : ""}
              size={28}
            />
          </button>

          <div
            className={`accordion-body ${
              openIndex === index ? "show" : ""
            }`}
          >
            <ul>
              {item.content.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>

        </div>

      ))}

    </div>








     <div className="nonWarranty">

      <h2 className="nonWarranty-title">
        4. Non-Warrantable Parts and Materials
      </h2>

      <div className="title-line"></div>

      <div className="nonWarranty-card">

        <p className="number-text">
          <strong>1.</strong> The following parts shall not be covered by the
          warranty when they are replaced as a maintenance service ordinarily
          required with the Vehicle use.
        </p>

        <div className="bullet-row">
          <span className="bullet"></span>

          <p>
            Bulbs (excluding Sealed Beam, Halogen Bulbs, High Intensity
            Discharge HID, Light Emitting Diode LED), Fuses, Spark Plugs
            (excluding Platinum, Iridium), Drive Belts (except Timing Belts),
            Air Cleaner Filter Element, Oil Filter, Fuel Filter, Air Conditioner
            Filter, Air Filter, Fuel Pump Filter, Brake Linings, Brake Shoe,
            Brake Pads, Wiper Blades and/or Rubbers, Room Lamp, Transmitter
            Battery, Clutch Disc & Clutch Pressure Plate, Electrolyte, Cooler
            Refrigerant, Fuel, Fluids, Oil, Grease, Lubricants, Additives.
          </p>
        </div>

        <div className="bullet-row">
          <span className="bullet"></span>

          <p>
            Electrolyte, Cooler Refrigerant, Fuel, Fluids, Oil, Grease,
            Lubricants, Additives.
          </p>
        </div>

        <p className="number-text">
          <strong>2.</strong> Notwithstanding item (1) above. Other than for
          fuel, the warranty shall cover any replacement and replenishment
          considered necessary to the performance of Warranty Repairs.
        </p>

      </div>

    </div>











     <div className="owner-container">

      <h2 className="owner-title">
        5. Owner's Responsibilities
      </h2>

      {/* Card 1 */}

      <div className="owner-card">

        <div className="card-heading">
          <Settings size={22} />
          <span>Obtaining Warranty Service</span>
        </div>

        <div className="line"></div>

        <p>
          You are responsible for taking your vehicle to any Authorised Toyota
          Service Centre in order to obtain warranty service.
        </p>

        <p>
          Your Toyota Service Centre will make the necessary repairs using
          Toyota Genuine parts. While any Toyota Service Centre will perform
          warranty service, Toyota recommends that you return to the dealer
          from whom the vehicle was bought because of their continued and
          personal interest in you.
        </p>

      </div>

      {/* Card 2 */}

      <div className="owner-card">

        <div className="card-heading">
          <Wrench size={22} />
          <span>Maintenance</span>
        </div>

        <div className="line"></div>

        <p>
          You are responsible for the proper maintenance, operation and care of
          your Toyota Vehicle in accordance with the instructions in the
          owner's Manual.
        </p>

        <p>
          If your vehicle is subject to use under severe driving conditions,
          you should follow the maintenance requirements specified accordingly
          in the owner's Manual.
        </p>

      </div>

      <h2 className="table-title">
        Free Maintenance Services (Free Labour Only)
      </h2>

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>Service</th>

              <th>
                HyRyder, Glanza, Rumion,
                <br />
                Taisor, Urban Cruiser
                <br />
                Ebella
              </th>

              <th>Other Models</th>

            </tr>

          </thead>

          <tbody>

            <tr>
              <td>First Free Service</td>
              <td>1000 km or 1 month*</td>
              <td>-</td>
            </tr>

            <tr>
              <td>Second Free Service</td>
              <td>5000 km or 6 months*</td>
              <td>10,000 km or 1 year*</td>
            </tr>

            <tr>
              <td>Third Free Service</td>
              <td>10,000 km or 1 year*</td>
              <td>20,000 km or 2 years*</td>
            </tr>

          </tbody>

        </table>

      </div>

      <div className="notes">

        <p>*whichever is earlier from the date of sale</p>

        <p>
          These Maintenance Services shall be performed by Authorised Toyota
          Dealers in India, at no cost for labour.
        </p>

        <p>
          However, lubricants, consumables & parts used would be charged,
          since they are regular maintenance items.
        </p>

        <p>
          Kindly contact the nearest dealer for availing these Free
          Maintenance Services.
        </p>

      </div>

    </div>






<section className="environment">
      <div className="container">
        <h2>
          6. Environmental Protection & Driving Tips
        </h2>

        <div className="red-line"></div>

        <p className="description">
          Responsible driving and proper maintenance significantly reduce your
          environmental footprint while enhancing fuel efficiency and vehicle
          longevity.
        </p>

        <div className="tips-grid">

          <div className="tip-card">
            <div className="card-title">
               <h1>🚘</h1>
              <h3>Eco-Driving Practices</h3>
            </div>

            <div className="list">
              {ecoDriving.map((item, index) => (
                <div className="list-item" key={index}>
                  <span className="bullet"></span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tip-card">
            <div className="card-title">
              <h1>🚏</h1>
              <h3>Maintaining Emission Control</h3>
            </div>

            <div className="list">
              {emissionControl.map((item, index) => (
                <div className="list-item" key={index}>
                  <span className="bullet"></span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>





 <section className="contactSection">
      <div className="contactContainer">

        <h2 className="contactHeading">
          7. Contact Us
        </h2>

        <div className="headingBorder"></div>

        <h3 className="contactTitle">
          ENQUIRY. FEEDBACK. ASSISTANCE
        </h3>

        <p className="contactText">
          Your complete satisfaction is our top priority. If you have any
          questions or feedback about your Toyota vehicle, please follow the
          steps below to ensure your concerns are resolved quickly and
          efficiently.
        </p>

        <div className="cards">

          {/* Left Card */}

          <div className="card">

            <h4 className="redHeading">
              Talk to Toyota
            </h4>

            <p className="text">
              <strong>24/7 Call us for enquiry / feedback at</strong>
            </p>

            <p className="label">
              Toll Free Number:
            </p>

            <div className="redNumber">
              1800 309 0001
            </div>

            <div className="blackNumber">
              080 4505 9000
            </div>

            <p className="email">
              Write to us at{" "}
              <a href="mailto:voc@toyota-kirloskar.co.in">
                voc@toyota-kirloskar.co.in
              </a>
            </p>

          </div>

          {/* Right Card */}

          <div className="card">

            <h4 className="blackHeading">
              24/7 Roadside Assistance
            </h4>

            <p className="label">
              Toll Free Number:
            </p>

            <div className="redNumber">
              1800 102 5001
            </div>

            <div className="blackNumber">
              0124 235 5001
            </div>

          </div>

        </div>

      </div>
    </section>




    <div>
      <ToyotaFooter />
    </div>
    </>
  );
}
