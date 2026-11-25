import {
  ShieldCheck,
  ClipboardList,
  BadgeCheck,
  Shield,
  Building2,
  Wrench,
} from "lucide-react";

  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Legendary Toyota Quality",
    },
    {
      icon: <Shield size={32} />,
      title: "Up to 2 years / 30,000 Km Warranty*",
    },
    {
      icon: <ClipboardList size={32} />,
      title: "203 Point Inspection",
    },
    {
      icon: <Building2 size={32} />,
      title: "Warranty available across Toyota dealer network",
    },
    {
      icon: <BadgeCheck size={32} />,
      title: "Quality Certification by Toyota",
    },
    {
      icon: <Wrench size={32} />,
      title: "Up to 3 free services*",
    },
  ];



import ToyotaFooter from "./Footer";
import './5-1-UsedCar.css'
export default function UsedCars() {
  return (
    <>
      
        <div className="used-car-IMG">
          <img src="/used-car.png" alt="Used car showcase" />
        </div>

<div className="main">
        <div>
             <h2 className="one">TOYOTA U TRUST</h2>
        </div>

        <div className="para">
          <p>
            Toyota Kirloskar Motors in India started the Toyota U Trust Program
            in 2007. Our main aim is to provide the used car buyer and sellers
            an experience at par with New Car buyer.
            <br />
    
            Toyota U Trust is set to facilitate Sales, Purchase & Exchange of
            Toyota and Non Toyota Cars. It allows potential customers an
            opportunity to exchange their old cars of any make for a brand new
            Toyota or a competitively priced used Toyota car.
            <br />

            Used car segment in the country is largely unorganized and with
            Toyota U Trust we want to ensure our customers gets necessary
            choice, convenience and transparency when they buy or sell a used
            car.
            <br />
          
            Each car is purchased at fair price and will go through extensive
            inspection and refurbishment process so that customers get the best
            quality cars.
            <br />
          
            When customer purchase Toyota used car at Toyota U Trust they are
            eligible to obtain certification and warranty offer backed by
            Toyota. Along with upto 2 Years/30,000 km warranty offer customer
            can get upto three labour free services at any Toyota dealerships.
          </p>
        </div>
      </div>


      <div>
    <section className="toyota-features">
      <h2 className="brand">TOYOTA U TRUST</h2>
      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon-box">{item.icon}</div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
      </div>
      <ToyotaFooter />
    </>
  );
}
