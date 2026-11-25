import './7-2-Accessories.css';

// <<<<<-----   HEADER ONE ------->>>>>>

import ToyotaLogo from './7-2-1-Logo';
import SearchBar from './7-2-2-Search-Bar';
import WishList from './7-2-3-WishList';
import Track_Order from './7-2-4-Track-Order';
import My_Cart from './7-2-5-My_Cart';
import Sign_In from './7-2-6-Sign_In';
import WhatsApp from './7-2-7WhatsApp';



// >>>>>>>>> HEADER TWO   <<<<<<<<<<<<<<

import BookServiceAppoinment from './7-2-8-BookServiceAppoinment';
import ServiceCostCalculator from './7-2-9-ServiceCostCalc';
import ConnectTOServiceShop from './7-2-10-ConnectServiceShop';
import FindDealer from './7-2-11-FindDealer';
import AbouteUS from './7-2-12-AbouteUS';
import HomeBannerSlider from './7-2-13-HomeBannerSlider';
import CarsShow from './7-2-14-CarsShow';
import SecondPage from './7-2-16-SecondPage';
import AccessoriesFooter from './7-2-Accessories_Footer';
import { NavLink } from 'react-router-dom';
import FirstPage from './7-2-15-FirstPage';


export default function Accessories() {
  return (
    <>
    <header className="accHeader">
      <div className="accHeaderContainer">

        <ToyotaLogo />
        <SearchBar />

        {/* Right - Menu */}
        <div className="accMenu">

          <WishList />
          <Track_Order />
          <My_Cart />
          <Sign_In />
          <WhatsApp />

        </div>

      </div>
    </header>







                         {/*============================== SECOND HEADER ===================================*/}

     <div className="toyotaServiceBar">
      <NavLink to="/Service/Services/Book_Service_Calculator"> <BookServiceAppoinment /> </NavLink>
      {/* <BookServiceAppoinment /> */}

      <div className="toyotaServiceDivider"></div>
      <NavLink  to="/Service/Services/Service_Cost_Calculator"> <ServiceCostCalculator /> </NavLink>
      {/* <ServiceCostCalculator /> */}

      <div className="toyotaServiceDivider"></div>
      <NavLink  to="/Tcar">  <ConnectTOServiceShop /> </NavLink>
      {/* <ConnectTOServiceShop /> */}

      <div className="toyotaServiceDivider"></div>
      <NavLink  to="/Service/Services/Service_Dealer_Locator">       <FindDealer /> </NavLink>
      {/* <FindDealer /> */}

      <div className="toyotaServiceDivider"></div>
      <NavLink to="/Products"> <AbouteUS /> </NavLink>
      {/* <AbouteUS /> */}

    </div>



    <div>
      <HomeBannerSlider />
    </div>


    <div>
      <CarsShow />
    </div>


    <div>
      <FirstPage />
    </div>

    <div>
      <SecondPage />
    </div>


    <div>
      <AccessoriesFooter />
    </div>
    </>
  );
}