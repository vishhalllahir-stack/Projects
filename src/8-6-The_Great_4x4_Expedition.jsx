import "./8-6-TheGreat4x4Expedition.css";
import ToyotaFooter from "./Footer";
import { useEffect, useState } from "react";

/*
=========================================================
LOCAL IMAGES
=========================================================

Put your images inside:

src/
 └── assets/
     └── expedition/
         ├── hero.jpg
         ├── sakleshpur.jpg
         ├── lonavala.jpg
         ├── hoshiarpur.jpg
         ├── purulia.jpg
         ├── guwahati.jpg
         ├── testimonial1.jpg
         ├── testimonial2.jpg
         ├── testimonial3.jpg
         ├── testimonial4.jpg
         ├── hilux.jpg
         ├── fortuner.jpg
         ├── legender.jpg
         ├── lc300.jpg
         └── hyryder.jpg
=========================================================
*/

const heroImage =
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=85";
const hiluxImage =
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85";
const fortunerImage =
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85";
const legenderImage =
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85";
const lc300Image =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1000&q=85";
const hyryderImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85";
const sakleshpurImage =
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=85";
const lonavalaImage =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85";
const hoshiarpurImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85";
const puruliaImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85";
const guwahatiImage =
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85";

const expeditions = [
  {
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=85",
    title: "The Great 4x4 Expedition",
    location: "Sakleshpur",
    date: "May 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
    title: "The Great 4x4 Expedition",
    location: "Lonavala",
    date: "September 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    title: "The Great 4x4 Expedition",
    location: "Hoshiarpur",
    date: "September 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
    title: "The Great 4x4 Expedition",
    location: "Purulia",
    date: "October 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85",
    title: "The Great 4x4 Expedition",
    location: "Guwahati",
    date: "March 2024",
  },
];

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85",
    name: "Expedition Participant",
    text:
      "The experience was amazing. Exploring new terrains and meeting people with the same passion for adventure made this expedition unforgettable.",
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",
    name: "4x4 Enthusiast",
    text:
      "It was an incredible experience to explore challenging trails and experience the capability of a true 4x4.",
  },
  {
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    name: "Adventure Explorer",
    text:
      "The expedition brought together a fantastic community of people who love adventure and off-roading.",
  },
];

const vehicles = [
  {
    name: "Toyota Hilux",
    image: hiluxImage,
    text:
      "The Toyota Hilux is made for those who always keep their destination within their sight. From taking on the toughest trails to gliding under the city lights, this powerful 4X4 is for those who crave thrilling experiences every day.",
  },
  {
    name: "Toyota Fortuner",
    image: fortunerImage,
    text:
      "The Fortuner boasts of a power-packed 6-speed Diesel and Petrol AT as well as MT engine capable of turning mountains into molehills.",
  },
  {
    name: "Toyota Legender",
    image: legenderImage,
    text:
      "The Legender houses a refined 6-speed Diesel AT engine. The power on tap complements the cutting-edge design seamlessly.",
  },
  {
    name: "Toyota LC300",
    image: lc300Image,
    text:
      "The Land Cruiser evokes strong emotions and represents Toyota's legendary off-road capability.",
  },
  {
    name: "Toyota Urban Cruiser Hyryder",
    image: hyryderImage,
    text:
      "The Toyota Urban Cruiser Hyryder gives you the advantages of hybrid electric and petrol technology.",
  },
];


const stories = [
  {
    title: "The Great 4x4 Expedition – Sakleshpur",
    image: sakleshpurImage,
    text:
      "The first-ever Great 4X4 Expedition to Sakleshpur brought together 4x4 enthusiasts for an adventure through the Western Ghats. Participants experienced scenic trails, an off-road track, challenging slopes, ditches, steep climbs and descents, followed by a memorable sunset experience.",
  },
  {
    title: "The Great 4x4 Expedition – Lonavala",
    image: lonavalaImage,
    text:
      "The Lonavala expedition combined monsoon landscapes, nature trails, road-safety engagement with students and specially curated off-road tracks with hill climbs, rumbles and angular drops.",
  },
  {
    title: "The Great 4x4 Expedition – Hoshiarpur",
    image: hoshiarpurImage,
    text:
      "The northern expedition took participants into the Shivaliks, with rugged terrains, uphill climbs, sharp descents, plantation activities and a night drive through the hills.",
  },
  {
    title: "The Great 4x4 Expedition – Purulia",
    image: puruliaImage,
    text:
      "The eastern expedition travelled through the Ajodhya Hills, forest trails and challenging off-road tracks before visiting Lahariya Dam and participating in a cleaning drive.",
  },
  {
    title: "The Great 4x4 Expedition – Guwahati",
    image: guwahatiImage,
    text:
      "The Guwahati expedition explored the Northeast with winding roads, tea estates, hill drives, a specially designed off-road track and scenic landscapes around Meghalaya.",
  },
];


export default function Expedition() {

  const [activeExpedition, setActiveExpedition] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextExpedition = () => {
    setActiveExpedition(
      (previous) =>
        (previous + 1) % expeditions.length
    );
  };

  const previousExpedition = () => {
    setActiveExpedition(
      (previous) =>
        (previous - 1 + expeditions.length) %
        expeditions.length
    );
  };


  useEffect(() => {

    const interval = setInterval(() => {
      setActiveExpedition(
        (previous) =>
          (previous + 1) % expeditions.length
      );
    }, 5500);

    return () => clearInterval(interval);

  }, []);


  return (
    <>
    <div className="expedition-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="expedition-hero">

        <img
          src={heroImage}
          alt="Great 4x4 Expedition by Toyota"
          className="expedition-hero-image"
        />

        <div className="expedition-hero-overlay"></div>

        <div className="expedition-hero-content">

          <span className="expedition-eyebrow">
            TOYOTA IN INDIA
          </span>

          <h1>
            THE GREAT
            <br />
            <strong>4X4 EXPEDITION</strong>
          </h1>

          <p>
            Unleash your inner adventure
            <br />
            and conquer roads untravelled.
          </p>

          <a
            href="#join-expedition"
            className="expedition-red-button"
          >
            JOIN THE EXPEDITION
          </a>

        </div>

      </section>


      {/* =================================================
          INTRO
      ================================================= */}

      <section className="expedition-intro">

        <div className="expedition-container">

          <span className="section-kicker">
            THE GREAT 4X4 EXPEDITION BY TOYOTA
          </span>

          <h2>
            Adventure
            <span> beyond limits.</span>
          </h2>

          <p>
            Get ready to unleash your inner adventure and
            conquer roads untravelled with The Great 4x4
            Expedition by Toyota.
          </p>

          <p>
            Experience an ultimate off-road journey and
            connect with a community that shares the same
            passion for adventure, exploration and 4x4
            driving.
          </p>

        </div>

      </section>


      {/* =================================================
          EXPEDITION SLIDER
      ================================================= */}

      <section className="expedition-slider-section">

        <div className="expedition-container">

          <div className="section-heading-white">

            <span>
              EXPLORE THE JOURNEY
            </span>

            <h2>
              Great 4x4 Expedition
            </h2>

          </div>


          <div className="expedition-slider">

            <button
              className="expedition-arrow expedition-arrow-left"
              onClick={previousExpedition}
              aria-label="Previous expedition"
            >
              ‹
            </button>


            <div className="expedition-slider-image">

              <img
                src={
                  expeditions[activeExpedition].image
                }
                alt={
                  expeditions[activeExpedition].location
                }
              />

              <div className="expedition-slider-gradient"></div>

              <div className="expedition-slider-content">

                <span>
                  {expeditions[activeExpedition].date}
                </span>

                <h3>
                  {expeditions[activeExpedition].location}
                </h3>

                <button>
                  KNOW MORE
                </button>

              </div>

            </div>


            <button
              className="expedition-arrow expedition-arrow-right"
              onClick={nextExpedition}
              aria-label="Next expedition"
            >
              ›
            </button>

          </div>


          <div className="expedition-slider-dots">

            {expeditions.map((item, index) => (

              <button
                key={item.location}
                className={
                  index === activeExpedition
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveExpedition(index)
                }
              />

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          TESTIMONIALS
      ================================================= */}

      <section className="expedition-testimonials">

        <div className="expedition-container">

          <div className="section-heading">

            <span>
              WHAT EXPEDITIONERS SAY
            </span>

            <h2>
              The experience
            </h2>

          </div>


          <div className="testimonial-layout">

            <div className="testimonial-image">

              <img
                src={
                  testimonials[activeTestimonial].image
                }
                alt={
                  testimonials[activeTestimonial].name
                }
              />

            </div>


            <div className="testimonial-content">

              <div className="testimonial-quote">
                “
              </div>

              <p>
                {testimonials[activeTestimonial].text}
              </p>

              <h3>
                {testimonials[activeTestimonial].name}
              </h3>

              <div className="testimonial-controls">

                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (previous) =>
                        (previous -
                          1 +
                          testimonials.length) %
                        testimonials.length
                    )
                  }
                >
                  ‹
                </button>

                <span>
                  {String(activeTestimonial + 1).padStart(
                    2,
                    "0"
                  )}
                  {" / "}
                  {String(testimonials.length).padStart(
                    2,
                    "0"
                  )}
                </span>

                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (previous) =>
                        (previous + 1) %
                        testimonials.length
                    )
                  }
                >
                  ›
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          EXPEDITION GALLERY
      ================================================= */}

      <section className="expedition-gallery">

        <div className="expedition-container">

          <div className="section-heading-white">

            <span>
              MEMORIES FROM THE ROAD
            </span>

            <h2>
              Expedition Gallery
            </h2>

          </div>


          <div className="expedition-gallery-grid">

            {expeditions.map((item) => (

              <div
                className="expedition-gallery-card"
                key={item.location}
              >

                <img
                  src={item.image}
                  alt={item.location}
                />

                <div className="gallery-card-overlay">

                  <span>
                    GREAT 4X4 EXPEDITION
                  </span>

                  <h3>
                    {item.location}
                  </h3>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          VEHICLES
      ================================================= */}

      <section className="expedition-vehicles">

        <div className="expedition-container">

          <div className="section-heading">

            <span>
              BUILT FOR THE ADVENTURE
            </span>

            <h2>
              Explore the 4X4s
            </h2>

          </div>


          <div className="vehicle-grid">

            {vehicles.map((vehicle) => (

              <article
                className="vehicle-card"
                key={vehicle.name}
              >

                <div className="vehicle-image">

                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                  />

                </div>

                <div className="vehicle-info">

                  <h3>
                    {vehicle.name}
                  </h3>

                  <p>
                    {vehicle.text}
                  </p>

                  <button>
                    KNOW MORE
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          PRESS / MEDIA
      ================================================= */}

      <section className="expedition-media">

        <div className="expedition-container">

          <div className="section-heading-white">

            <span>
              EXPEDITION STORIES
            </span>

            <h2>
              Press & Media
            </h2>

          </div>


          <div className="media-tabs">

            <button className="media-tab-active">
              PRESS RELEASE
            </button>

            <button>
              MEDIA COVERAGE
            </button>

          </div>


          <div className="media-grid">

            <article>
              <span>
                2024
              </span>

              <h3>
                The Fifth Great 4X4 Expedition
                by Toyota Held in Guwahati
              </h3>

              <p>
                TKM successfully concluded the
                Great 4X4 Expedition in the
                Northeast region.
              </p>

              <a href="#read">
                READ MORE →
              </a>
            </article>


            <article>
              <span>
                2023
              </span>

              <h3>
                Toyota Kirloskar Motor Flags Off
                the First Zonal Drive
              </h3>

              <p>
                The first zonal drive marked the
                beginning of an extraordinary
                adventure for motoring enthusiasts.
              </p>

              <a href="#read">
                READ MORE →
              </a>
            </article>


            <article>
              <span>
                2023
              </span>

              <h3>
                The First-ever Great 4x4
                Expedition Initiative in India
              </h3>

              <p>
                Toyota introduced a new adventure
                experience for its 4x4 community.
              </p>

              <a href="#read">
                READ MORE →
              </a>
            </article>

          </div>

        </div>

      </section>


      {/* =================================================
          STORIES
      ================================================= */}

      <section className="expedition-stories">

        <div className="expedition-container">

          <div className="section-heading">

            <span>
              FROM THE EXPEDITIONS
            </span>

            <h2>
              Stories from the trail
            </h2>

          </div>


          <div className="story-list">

            {stories.map((story, index) => (

              <article
                className="story-card"
                key={story.title}
              >

                <div className="story-image">

                  <img
                    src={story.image}
                    alt={story.title}
                  />

                </div>

                <div className="story-content">

                  <span>
                    0{index + 1}
                  </span>

                  <h3>
                    {story.title}
                  </h3>

                  <p>
                    {story.text}
                  </p>

                  <button>
                    READ MORE
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          JOIN FORM
      ================================================= */}

      <section
        className="expedition-form-section"
        id="join-expedition"
      >

        <div className="expedition-container">

          <div className="form-heading">

            <span>
              UP FOR AN ADVENTURE?
            </span>

            <h2>
              Join the Great Expedition
            </h2>

            <p>
              Tell us about yourself and your
              off-roading experience.
            </p>

          </div>


          <form
            className="expedition-form"
            onSubmit={(event) => {
              event.preventDefault();
              alert(
                "Thank you! Your expedition request has been submitted."
              );
            }}
          >

            <div className="form-row">

              <div className="form-group">
                <label>Name*</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </div>

            </div>


            <div className="form-row">

              <div className="form-group">
                <label>Mobile*</label>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  required
                />
              </div>

              <div className="form-group">
                <label>State*</label>

                <select required defaultValue="">
                  <option value="" disabled>
                    Select State
                  </option>

                  <option>Gujarat</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Punjab</option>
                  <option>West Bengal</option>
                  <option>Assam</option>
                  <option>Delhi</option>
                </select>

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">
                <label>City*</label>

                <select required defaultValue="">
                  <option value="" disabled>
                    Select City
                  </option>

                  <option>Ahmedabad</option>
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Hoshiarpur</option>
                  <option>Purulia</option>
                  <option>Guwahati</option>
                </select>

              </div>


              <div className="form-group">

                <label>
                  Level of off-roading experience*
                </label>

                <div className="radio-group">

                  <label>
                    <input
                      type="radio"
                      name="experience"
                      value="Beginner"
                      required
                    />
                    Beginner
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="experience"
                      value="Intermediate"
                    />
                    Intermediate
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="experience"
                      value="Expert"
                    />
                    Expert
                  </label>

                </div>

              </div>

            </div>


            <div className="form-group">

              <label>
                Additional comments*
              </label>

              <textarea
                rows="5"
                placeholder="Enter your comments"
                required
              ></textarea>

            </div>


            <div className="form-consent">

              <label>

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I understand that TKM may process
                  certain personal data collected herein
                  for providing requisite services and
                  promotional activities.
                </span>

              </label>

              <label>

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I acknowledge and give my consent to
                  TKM to process the provided information
                  for its internal and business purposes.
                </span>

              </label>

            </div>


            <button
              type="submit"
              className="form-submit"
            >
              SUBMIT
            </button>

          </form>

        </div>

      </section>


      {/* =================================================
          FOOTER CTA
      ================================================= */}

      <section className="expedition-footer-cta">

        <div>

          <span>
            THE ADVENTURE AWAITS
          </span>

          <h2>
            Ready for your next expedition?
          </h2>

          <a href="#join-expedition">
            JOIN THE GREAT EXPEDITION
          </a>

        </div>

      </section>

    </div>
    <ToyotaFooter   />
    </>
  );
}


