import { NavLink, Route, Routes } from "react-router-dom";
import Products from "./1-Products";
import VirtualShowroom from "./2-VirtulShowroom";
import Services from "./3-1-Services";
import OwnerManual from "./3-2-Owner-Manual";
import Warranty from "./3-3-warranty";
import SafetyRecall from "./3-4-Safaty-Racall";
import Tcar from "./4-T-Car";
import UsedCars from "./5-Used-care";
import Mobility from "./6-Mobility";
import Tweb from "./7-1-Tweb";
import Accessories from "./7-2-Accessories";
import TOYOTAIndia from "./8-TOYOTA-India";
import DrumTaoIndiaTour from "./9-Drum Tao India Tour";
import ContactIncon from "./10-Contact-US";
import NavDropdown from "./NavDropdown";
import "./App.css";
import Service from "./3-Service";
import Service_Dealer_Locator from "./3-1-1Service-dealer-Locator";
import Service_Cost_Calculator from "./3-1-2-Service-Cost-Calculator";
import Book_Service_Calculator from "./3-1-3-Book-Service-Calculator";
import Parts_Distributors from "./3-1-4-parts-Distributors";
import BuyOnline from "./7-1-1-Buy_Online";
import HowItWork from "./7-1-2-How_IT_Work";
import MyToyota from "./7-1-4-My_Toyota";
import SignUP from "./7-1-3-Sign_Up";
import TwebAbout from "./7-1-1-1-About";
import TwebFeedBack from "./7-1-1-2-FeedBack";
import TwebContactUS from "./7-1-1-3-ContactUS";
import TwebPrivacy from "./7-3-1-Privacy";
import TwebAccessibility from "./7-3-2-Accessibility";
import TwebTerm_Condition from "./7-3-3-Terms-&-Conditions";
import Urban_Cruiser_Hyryder from "./7-1-2-01-Urban_Cruser_Hyryder";
import Innova_Hycross from "./7-1-2-02-Innova_Hycross";
import Innova_Crysta from "./7-1-2-03-Innova_Crysta";
import Carmy from "./7-1-2-04-Carmy";
import Fortuner from "./7-1-2-05-Fortuner";
import Legender from "./7-1-2-06-Legender";
import Hilux from "./7-1-2-07-Hilux";
import BeacomeDealer from "./10-1-Become_Dealer";
import Careers from "./10-2-Careers";
import Testimonials from "./10-3-Testimonials";
import SubmitFeedback from "./10-4-Submit_Feedback";
import About from "./8-1-About_US";
import Happier_Paths_Together from "./8-2-Happier_Paths_Together";
import Environment from "./8-3-Environment";
import Ecozone_Virtual_Tour from "./8-4-Ecozone_Virtual_Tour";
import Social_Contribution from "./8-5-Social_Contribution";
import The_Great_4x4_Expedition from "./8-6-The_Great_4x4_Expedition";
import Tdrive from "./8-7-Tdrive";
import Toyota_Finance from "./8-8-Toyota_Finance";
import Skill_Development from "./8-9-Skill_Development";
import BecomeA_Dealer from "./8-11-BecomeA_Dealer";
import Speak_UP_Policy from "./8-12-Speake_Up_Policy";
import Plant_Visit from "./8-13-Plant_Visit";
import Caareerss from "./8-10-Careers";
import Toyota_In_India from "./7-1-1-1-1-Toyota_In_India";
import History from "./7-1-1-1-2-History";
import Vision from "./7-1-1-1-3-Vision";
import Media from "./7-1-1-1-4-Media";
import Award from "./7-1-1-1-5-Award";



const buyOnlineLinks = [
  { label: "TWEB (Bengaluru only)", path: "/BuyOnline/tweb" },
  { label: "Buy Accessories", path: "/BuyOnline/accessories" },
];

const toyotaIndiaLinks = [
  { label: "About US", path: "/ToyotaIndia/aboutUS" },
  { label: "Happier Paths Together", path: "/ToyotaIndia/HappierPaths_Together" },
  { label: "Environment", path: "/ToyotaIndia/Environment" },
  { label: "Ecozone Virtual Tour", path: "/ToyotaIndia/Ecozone_Virtual_Tour" },
  { label: "Social Contribution", path: "/ToyotaIndia/Social_Contribution" },
  { label: "The Great 4x4 Expedition", path: "/ToyotaIndia/The_Great_4x4_Expedition" },
  { label: "TDRIVE", path: "/ToyotaIndia/Tdrive" },
  { label: "Toyota Finance", path: "/ToyotaIndia/Toyota_Finance" },
  { label: "Skill Development", path: "/ToyotaIndia/Skill_Development" },
  { label: "Careers", path: "/ToyotaIndia/Caareerss" },
  { label: "Become a Dealer", path: "/ToyotaIndia/BecomeA_Dealer" },
  { label: "Speak-up Policy", path: "/ToyotaIndia/Speak_UP_Policy" },
  { label: "Plant Visit", path: "/ToyotaIndia/Plant_Visit" },
];

export default function NavBar() {
  const linkClass = ({ isActive }) => (isActive ? "active nav-link" : "nav-link");

  return (
    <div>
      <header className="site-header">
        <div className="header">
          <NavLink to="/" className="toyota-logo">
            TOYOTA
          </NavLink>

          <nav className="header-nav">
            <NavLink to="/Products" className={linkClass}>
              PRODUCTS
            </NavLink>
            <NavLink to="/VirtualShowroom" className={linkClass}>
              VIRTUAL SHOWROOM
            </NavLink>

            <NavLink to='Service' className={linkClass}>
              SERVICE▾
              </NavLink>

            <NavLink to="/Tcar" className={linkClass}>
              T-CAR
            </NavLink>
            <NavLink to="/UsedCars" className={linkClass}>
              USED CARS
            </NavLink>
            <NavLink to="/Mobility" className={linkClass}>
              MOBILITY
            </NavLink>

            <NavDropdown label="BUY ONLINE▾" items={buyOnlineLinks} />

            <NavDropdown
              label="TOYOTA INDIA▾"
              items={toyotaIndiaLinks}
              // image="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80"
            />

            <NavLink to="/DrumTaoIndiaTour" className={linkClass}>
              DRUM TAO INDIAN TOUR
            </NavLink>
          </nav>

          <NavLink to="/ContactIcon" className="contact-icon">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/phone-message.png"
              alt="Contact"
              width="40"
              height="40"
            />
          </NavLink>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/Products" element={<Products  />}/>
          <Route path="/VirtualShowroom" element={<VirtualShowroom />} />


        {/* Service Main Page */}
        <Route path="/Service" element={<Service />} />

        {/* Services Menu */}
        <Route path="/Service/Services" element={<Services />} />

        {/* Service Pages */}
        <Route
          path="/Service/Services/Service_Dealer_Locator"
          element={<Service_Dealer_Locator />}
        />

        <Route
          path="/Service/Services/Service_Cost_Calculator"
          element={<Service_Cost_Calculator />}
        />

        <Route
          path="/Service/Services/Book_Service_Calculator"
          element={<Book_Service_Calculator />}
        />

        <Route
          path="/Service/Services/Parts_Distributors"
          element={<Parts_Distributors />}
        />








          <Route path="/Service/owners-manual" element={<OwnerManual />} />
          <Route path="/Service/warranty" element={<Warranty />} />
          <Route path="/Service/safety-recall" element={<SafetyRecall />} />
          <Route path="/Tcar" element={<Tcar />} />
          <Route path="/UsedCars" element={<UsedCars />} />
          <Route path="/Mobility" element={<Mobility />}></Route>


          <Route path="/BuyOnline/tweb" element={<Tweb />} />

          <Route path="/BuyOnline/tweb/BuyOnline" element={<BuyOnline />} />

          <Route path="/BuyOnline/UrbanCruserHyryder" element={<Urban_Cruiser_Hyryder />} />
          <Route path="/BuyOnline/InnovaHycross" element={<Innova_Hycross />} />
          <Route path="/BuyOnline/InnovaCrysta" element={<Innova_Crysta />} />
          <Route path="/BuyOnline/Carmy" element={<Carmy />} />
          <Route path="/BuyOnline/Fortuner" element={<Fortuner />} />
          <Route path="/BuyOnline/Legender" element={<Legender />} />
          <Route path="/BuyOnline/Hilux" element={<Hilux />} />

          <Route path="/BuyOnline/tweb/HowItWork" element={<HowItWork />} />
          <Route path="/BuyOnline/tweb/SignUp" element={<SignUP/>} />
          <Route path="/BuyOnline/tweb/MyToyota" element={<MyToyota/>} />

        


<Route path="/BuyOnline/tweb/BuyOnline/about" element={<TwebAbout />}>
         <Route index element={<Toyota_In_India />} />
         <Route path="history" element={<History />} />
         <Route path="vision" element={<Vision />} />
         <Route path="media" element={<Media />} />
         <Route path="award" element={<Award />} />
</Route>



          <Route path="/BuyOnline/tweb/BuyOnline/feedback" element={<TwebFeedBack />} />
          <Route path="/BuyOnline/tweb/BuyOnline/contactus" element={<TwebContactUS />} />

          <Route path="Privacy" element={<TwebPrivacy />} />
          <Route path="Accessibility" element={<TwebAccessibility/>} />
          <Route path="Term&Condition" element={<TwebTerm_Condition />} />


          <Route path="/BuyOnline/accessories" element={<Accessories />} />





          <Route path="/ToyotaIndia" element={<TOYOTAIndia />} />
          //  This is all of TOYOTA INDIA ROUTE.....
          <Route path="/ToyotaIndia/aboutUS" element={<About />} />
          <Route path="/ToyotaIndia/HappierPaths_Together" element={<Happier_Paths_Together />} />
          <Route path="/ToyotaIndia/Environment" element={<Environment />} />
          <Route path="/ToyotaIndia/Ecozone_Virtual_Tour" element={<Ecozone_Virtual_Tour />} />
          <Route path="/ToyotaIndia/Social_Contribution" element={<Social_Contribution />} />
          <Route path="/ToyotaIndia/The_Great_4x4_Expedition" element={<The_Great_4x4_Expedition />} />
          <Route path="/ToyotaIndia/Tdrive" element={<Tdrive />} />
          <Route path="/ToyotaIndia/Toyota_Finance" element={<Toyota_Finance />} />
          <Route path="/ToyotaIndia/Skill_Development" element={<Skill_Development />} />
          <Route path="/ToyotaIndia/Caareerss" element={<Caareerss />} />
          <Route path="/ToyotaIndia/BecomeA_Dealer" element={<BecomeA_Dealer />} />
          <Route path="/ToyotaIndia/Speak_UP_Policy" element={<Speak_UP_Policy />} />
          <Route path="/ToyotaIndia/Plant_Visit" element={<Plant_Visit />} />


          <Route path="/DrumTaoIndiaTour" element={<DrumTaoIndiaTour />} />


          <Route path="/ContactIcon" element={<ContactIncon />} />
          <Route path="/BecomeDealer" element={<BeacomeDealer/>} />
          <Route path="/Careers" element={<Careers />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/SubmitFeedback" element={<SubmitFeedback />} />
        </Routes>

        
      </main>
    </div>
  );
}
