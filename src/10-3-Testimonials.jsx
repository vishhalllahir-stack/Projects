import './10-1-Contact.css'
import ToyotaFooter from './Footer'

import {
  FaCloudUploadAlt,
  FaImage,
  FaVideo,
  FaSyncAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Testimonials () {
  return (
    <>
    <div className="csPage">

      {/* Hero Section */}

      <section className="csHero">
        <div className="csOverlay">
          <div className="csHeroContent">
            <h1>Customer Stories</h1>
          </div>
        </div>
      </section>

      {/* Navigation */}

      <nav className="csTabs">
        <a href="/">TESTIMONIAL VIDEOS</a>
        <a href="/">TESTIMONIALS</a>
        <a href="/" className="active">
          SUBMIT STORY
        </a>
      </nav>

      {/* Main */}

      <section className="csContainer">

        <div className="csGrid">

          {/* LEFT */}

          <div className="csLeft">

            <h3>
              <span></span>
              PERSONAL INFORMATION:
              <small> PROVIDE COMPLETE DETAILS</small>
            </h3>

            <div className="csRow">

              <select>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss</option>
              </select>

              <input
                type="text"
                placeholder="NAME*"
              />

            </div>

            <input
              type="email"
              placeholder="EMAIL"
            />

            <input
              type="text"
              placeholder="MOBILE"
            />

            <div className="csRow">

              <select>
                <option>Select Your Existing Car*</option>
                <option>Innova Hycross</option>
                <option>Fortuner</option>
                <option>Glanza</option>
                <option>Rumion</option>
                <option>Camry</option>
              </select>

              <input
                type="text"
                placeholder="REGISTRATION NUMBER"
              />

            </div>

          </div>

          {/* RIGHT */}

          <div className="csRight">

            <h3>
              <span></span>
              WRITE / UPLOAD
            </h3>

            <textarea
              rows="7"
              placeholder="WRITE YOUR STORY HERE...*"
            ></textarea>

            <div className="csUpload">

              <button>
                <FaCloudUploadAlt />
                Upload Your Story
              </button>

              <button>
                <FaImage />
                Upload Image
              </button>

              <button>
                <FaVideo />
                Upload Video
              </button>

            </div>

            <div className="csCaptcha">

              <div className="captchaBox">
                OG7P8P
              </div>

              <FaSyncAlt className="refresh" />

              <input
                type="text"
                placeholder="ENTER CAPTCHA*"
              />

            </div>

            <div className="csSubmit">

              <button>
                SUBMIT
              </button>

            </div>

          </div>

        </div>

        {/* Disclaimer */}

        <div className="csDisclaimer">

          <h4>
            <FaMapMarkerAlt />
            Disclaimer:
          </h4>

          <p>
            The information you submit can be used and/or distributed on
            Toyota India's digital and social media platforms like
            Facebook, Instagram, Twitter or YouTube as a testimonial.
            By sharing the same you grant Toyota Kirloskar Motor Pvt.
            Ltd. permission to use your name, image, video and/or face
            for promotional purposes.
          </p>

        </div>

      </section>

    </div>

    <div>
        <ToyotaFooter />
    </div>
    </>
  );
}