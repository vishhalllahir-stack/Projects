import { NavLink } from 'react-router-dom';
import './7-2-Accessories.css';

export default function FirstPage() {
  return (
    <section className="homePromo">

      <div className="promoContainer">

        {/* ---------- CARD 1 ---------- */}

        <div className="promoCard">

          <div className="promoImage">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900"
              alt="Virtual Showroom"
            />
          </div>

          <div className="promoContent">

            <h2>
              Toyota Virtual Showroom
              <span>.</span>
            </h2>

            <p>
              Explore Toyota vehicles from your home with a
              modern virtual showroom experience.
              Browse interiors, exteriors, colours and
              specifications.
            </p>

<NavLink  to="/VirtualShowroom"><button>
              View Virtual Showroom
            </button> </NavLink>
            
            {/* <button>
              View Virtual Showroom
            </button> */}

          </div>

        </div>

        {/* ---------- CARD 2 ---------- */}

        <div className="promoCard reverse">

          <div className="promoContent">

            <h2>
              Toyota U-Trust
              <span>.</span>
            </h2>

            <p>
              Buy certified pre-owned Toyota cars with
              complete inspection, warranty and trusted
              quality.
            </p>

            <button>
              Explore U-Trust
            </button>

          </div>

          <div className="promoImage">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900"
              alt="Toyota U Trust"
            />
          </div>

        </div>

      </div>

    </section>
  );
}