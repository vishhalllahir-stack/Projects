import "./8-13-Plant-Visit.css";
import ToyotaFooter from "./Footer";

import  { useState } from "react";


const galleryImages = [
  {
    src: "https://static3.toyotabharat.com/images/plant-visit/gallery/gallery-1.jpg",
    category: "Education Institutes",
  },
  {
    src: "https://static3.toyotabharat.com/images/plant-visit/gallery/gallery-2.jpg",
    category: "Corporate",
  },
  {
    src: "https://static3.toyotabharat.com/images/plant-visit/gallery/gallery-3.jpg",
    category: "Education Institutes",
  },
  {
    src: "https://static3.toyotabharat.com/images/plant-visit/gallery/gallery-4.jpg",
    category: "Corporate",
  },
];

const testimonials = [
  {
    quote:
      "TKM stands for quality at its true sense, One of the best manufacturing plants that I have witnessed. Appreciate the hospitality extended, awesome experience.",
    name: "Mr. Keerthan Kumar M",
    company: "Soundarya Group of Institutions",
    role: "Chief Executive Officer",
  },
  {
    quote:
      "I am deeply impressed with Toyota's sustainability initiatives which have set the benchmark for corporate sustainability. Their commitment in reducing Carbon emissions.",
    name: "Mr. Ajith Kuamr PN",
    company: "Infenox Technologies India",
    role: "Managing Director & CEO",
  },
  {
    quote:
      "Amazed by the processes, people centric approach and sustainability initiatives at TKM which is followed both in principle and practice.",
    name: "Mr. Shravan Guduthur",
    company: "CNK HSKA & Associates LLP",
    role: "Chartered Accountants",
  },
];

const instructionItems = [
  {
    title: "PO",
    text: "No hand in the pocket",
    icon: "🤲",
  },
  {
    title: "KE",
    text: "No use of mobile while walking",
    icon: "📵",
  },
  {
    title: "TE",
    text: "Hold the handrails while walking on stairs",
    icon: "🪜",
  },
  {
    title: "NA",
    text: "Don't touch the cars",
    icon: "🚘",
  },
  {
    title: "SHI",
    text: "Confirm the situation",
    icon: "👀",
  },
];

function PlantVisit() {
  const [activeGallery, setActiveGallery] = useState("All");
  const [testimonial, setTestimonial] = useState(0);

  const filteredGallery =
    activeGallery === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeGallery);

  const nextTestimonial = () => {
    setTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <>

    <div className="plant-page">

      {/* ================= HEADER ================= */}
      <header className="plant-header">
        <div className="plant-header-inner">

          <a href="/" className="plant-logo">
            <span className="toyota-symbol">TOYOTA</span>
          </a>

          <nav className="plant-main-nav">
            <a href="#plant-visit">Plant Visit</a>
            <a href="#objectives">Objectives</a>
            <a href="#process">Process</a>
            <a href="#craftsmanship">Craftsmanship</a>
            <a href="#building-nation">Building Nation</a>
            <a href="#plan-visit">Plan a Visit</a>
          </nav>

          <a href="#contact" className="plant-header-contact">
            Contact Us
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="plant-hero" id="plant-visit">

        <div className="plant-hero-overlay"></div>

        <div className="plant-hero-content">
          <p className="plant-eyebrow">TOYOTA KIRLOSKAR MOTOR</p>

          <h1>
            Experience
            <br />
            <span>Awesome</span>
          </h1>

          <p className="plant-hero-subtitle">
            Step inside the heart of car manufacturing
          </p>

          <div className="plant-hero-buttons">
            <a href="#plan-visit" className="toyota-red-button">
              Book Plant Tour
            </a>

            <a href="#contact" className="toyota-outline-button">
              Contact Us
            </a>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ================= QUICK NAV ================= */}
      <section className="plant-subnav">
        <div className="plant-subnav-inner">
          <a className="active" href="#plant-visit">
            Plant Visit
          </a>
          <a href="#eligibility">Who can visit us?</a>
          <a href="#instructions">Instructions to visitors</a>
          <a href="#route">Route Map</a>
          <a href="#contact">More</a>
        </div>
      </section>

      {/* ================= OBJECTIVES ================= */}
      <section className="plant-section objectives-section" id="objectives">
        <div className="plant-container">

          <div className="section-heading">
            <span>01</span>
            <h2>Objectives</h2>
          </div>

          <div className="objective-grid">

            <div className="objective-image">
              <img
                src="https://static3.toyotabharat.com/images/plant-visit/objectives.jpg"
                alt="Toyota sustainability"
              />
            </div>

            <div className="objective-content">
              <p>
                To gain insights into Toyota’s commitment to sustainability
                through advanced eco-friendly technologies and responsible
                manufacturing practices.
              </p>

              <p>
                Guests will experience a culture of excellence that emphasizes
                innovation, continuous improvement, and social responsibility.
              </p>

              <p>
                The visit also highlights Toyota’s dedication to human
                development through impactful initiatives in education, skill
                enhancement, and community engagement.
              </p>

              <div className="objective-number">
                <strong>01</strong>
                <span>Purpose driven manufacturing</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="plant-section process-section" id="process">

        <div className="process-background"></div>

        <div className="plant-container process-container">

          <div className="section-heading light-heading">
            <span>02</span>
            <h2>Process</h2>
          </div>

          <div className="process-content">
            <div className="process-text">
              <p className="large-copy">
                The process of car making is a seamless blend of advanced
                technology and skilled craftsmanship.
              </p>

              <p>
                It begins with innovative design and engineering, followed by
                precision manufacturing of components.
              </p>

              <p>
                On the assembly line, every part is meticulously fitted,
                tested, and refined to ensure safety, performance, and quality.
              </p>

              <p>
                From concept to completion, it’s a journey of teamwork and
                innovation, bringing vehicles to life.
              </p>
            </div>

            <div className="process-card">
              <div className="process-icon">⚙</div>
              <h3>Technology</h3>
              <p>
                Precision engineering combined with advanced manufacturing
                technology.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CRAFTSMANSHIP ================= */}
      <section
        className="plant-section craftsmanship-section"
        id="craftsmanship"
      >
        <div className="plant-container">

          <div className="section-heading">
            <span>03</span>
            <h2>Craftmanship</h2>
          </div>

          <div className="craftsmanship-grid">

            <div className="craftsmanship-content">
              <h3>
                Precision.
                <br />
                Passion.
                <br />
                Skill.
              </h3>

              <p>
                Craftsmanship in car making is the heart and soul of every
                vehicle. It’s about blending precision, passion, and skill to
                create machines that inspire and endure.
              </p>

              <p>
                Every employee plays a critical role, from meticulous
                attention to detail in assembly to the innovative spirit in
                design and engineering.
              </p>

              <p>
                Their dedication ensures that every car is not just a mode of
                transport but a masterpiece of reliability, performance, and
                artistry.
              </p>

              <p>
                This commitment to excellence is what drives the future of
                mobility forward.
              </p>
            </div>

            <div className="craftsmanship-image">
              <img
                src="https://static3.toyotabharat.com/images/plant-visit/craftsmanship.jpg"
                alt="Toyota craftsmanship"
              />

              <div className="image-caption">
                <span>THE SPIRIT OF</span>
                <strong>MONOZUKURI</strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BUILDING NATION ================= */}
      <section
        className="plant-section nation-section"
        id="building-nation"
      >
        <div className="nation-image"></div>

        <div className="plant-container nation-container">

          <div className="nation-content">

            <div className="section-heading">
              <span>04</span>
              <h2>Building Nation</h2>
            </div>

            <p className="large-copy">
              Car making is more than just manufacturing vehicles; it’s about
              building the nation’s progress.
            </p>

            <p>
              By driving innovation, creating jobs, and boosting the economy,
              the automotive industry plays a pivotal role in shaping a
              brighter future.
            </p>

            <p>
              From empowering communities with skill development to fostering
              technological advancements, every car made contributes to the
              nation’s growth and global standing.
            </p>

            <a href="#plan-visit" className="text-arrow">
              Discover More <span>→</span>
            </a>

          </div>
        </div>
      </section>

      {/* ================= PLAN VISIT ================= */}
      <section className="plant-section plan-section" id="plan-visit">

        <div className="plant-container">

          <div className="section-heading centered-heading">
            <span>05</span>
            <h2>Plan a Visit</h2>
          </div>

          <p className="section-intro">
            Experience Toyota’s manufacturing excellence, sustainability
            initiatives and people-centric culture.
          </p>

          <div className="visit-cards">

            <a href="#eligibility" className="visit-card">
              <div className="visit-card-number">01</div>
              <h3>Check your eligibility criteria</h3>
              <p>See available timings and who can join.</p>
              <span>→</span>
            </a>

            <a href="#instructions" className="visit-card">
              <div className="visit-card-number">02</div>
              <h3>Instructions, Do’s and Don’ts</h3>
              <p>Review visitor guidelines before your visit.</p>
              <span>→</span>
            </a>

            <a href="#route" className="visit-card">
              <div className="visit-card-number">03</div>
              <h3>Factory Layout & Route</h3>
              <p>Find the map location and getting-here details.</p>
              <span>→</span>
            </a>

          </div>

          <div className="visit-actions">
            <a href="#booking" className="toyota-red-button">
              Book a Tour
            </a>

            <a href="#contact" className="dark-outline-button">
              Contact Us →
            </a>
          </div>

        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="eligibility-section" id="eligibility">
        <div className="plant-container">

          <div className="section-heading">
            <span>06</span>
            <h2>Who Can Visit Us?</h2>
          </div>

          <div className="eligibility-grid">

            <div className="eligibility-box">
              <div className="eligibility-icon">18+</div>
              <h3>Minimum Age</h3>
              <p>
                Visitors must be 18 years of age or above.
              </p>
            </div>

            <div className="eligibility-box">
              <div className="eligibility-icon">MON–FRI</div>
              <h3>Visit Days</h3>
              <p>
                Plant visits are available Monday to Friday.
                Saturday and Sunday visits are not available.
              </p>
            </div>

            <div className="eligibility-box">
              <div className="eligibility-icon">08:30</div>
              <h3>Visit Timings</h3>
              <p>
                Visit timings are from 8:30 AM to 1:00 PM.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= INSTRUCTIONS ================= */}
      <section className="instruction-section" id="instructions">

        <div className="plant-container">

          <div className="section-heading">
            <span>07</span>
            <h2>Instructions to Visitors</h2>
          </div>

          <div className="instruction-intro">
            <h3>FOLLOW PO-KE-TE-NA-SHI</h3>
            <p>
              Safety and responsible behaviour are an essential part of the
              Toyota plant visit experience.
            </p>
          </div>

          <div className="instruction-grid">
            {instructionItems.map((item) => (
              <div className="instruction-card" key={item.title}>
                <div className="instruction-icon">{item.icon}</div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="rules-grid">

            <div className="rules-column">
              <h3>Privacy & Safety</h3>

              <ul>
                <li>Don’t use mobile phone inside plant premises.</li>
                <li>
                  Don’t touch any parts or vehicle inside the shop floor.
                </li>
                <li>Wear helmets where required.</li>
                <li>
                  Don’t carry personal electronic devices inside plant
                  premises.
                </li>
              </ul>
            </div>

            <div className="rules-column dos">
              <h3>Do’s</h3>

              <ul>
                <li>Adhere to formal wear.</li>
                <li>Closed-toe shoes are required.</li>
              </ul>
            </div>

            <div className="rules-column donts">
              <h3>Don’t</h3>

              <ul>
                <li>
                  Remain with your batch, friends or colleagues and avoid
                  moving around independently.
                </li>
                <li>
                  Smoking, eating and drinking are strictly prohibited inside
                  the plant.
                </li>
                <li>
                  Please refrain from visiting if you are feeling unwell.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="testimonial-section">

        <div className="plant-container">

          <div className="testimonial-heading">
            <span>SHARE YOUR EXPERIENCE</span>
            <h2>Testimonials</h2>
          </div>

          <div className="testimonial-wrapper">

            <button
              className="testimonial-arrow left"
              onClick={previousTestimonial}
            >
              ←
            </button>

            <div className="testimonial-content">

              <div className="quote-mark">“</div>

              <p className="testimonial-quote">
                {testimonials[testimonial].quote}
              </p>

              <h3>{testimonials[testimonial].name}</h3>

              <p className="testimonial-company">
                {testimonials[testimonial].company}
              </p>

              <span className="testimonial-role">
                {testimonials[testimonial].role}
              </span>

              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={index === testimonial ? "active" : ""}
                    onClick={() => setTestimonial(index)}
                  />
                ))}
              </div>

            </div>

            <button
              className="testimonial-arrow right"
              onClick={nextTestimonial}
            >
              →
            </button>

          </div>

          <div className="testimonial-links">
            <a href="#reviews">See all reviews →</a>
            <a href="#feedback">Write a feedback →</a>
          </div>

        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="gallery-section" id="gallery">

        <div className="plant-container">

          <div className="gallery-heading">
            <div className="section-heading">
              <span>08</span>
              <h2>Gallery</h2>
            </div>

            <a href="#gallery" className="gallery-link">
              See Gallery →
            </a>
          </div>

          <div className="gallery-filters">
            {["All", "Education Institutes", "Corporate"].map((filter) => (
              <button
                key={filter}
                className={activeGallery === filter ? "active" : ""}
                onClick={() => setActiveGallery(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="gallery-grid">

            {filteredGallery.map((image, index) => (
              <div className="gallery-item" key={`${image.src}-${index}`}>
                <img src={image.src} alt="Toyota plant visit gallery" />

                <div className="gallery-overlay">
                  <span>{image.category}</span>
                  <strong>Plant Visit</strong>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= ROUTE ================= */}
      <section className="route-section" id="route">

        <div className="route-map">
          <iframe
            title="Toyota Kirloskar Motor Bidadi location"
            src="https://www.google.com/maps?q=Toyota%20Kirloskar%20Motor%20Bidadi%20Karnataka&output=embed"
            loading="lazy"
          ></iframe>
        </div>

        <div className="route-content">

          <span className="route-small-title">GETTING HERE</span>

          <h2>Route Map</h2>

          <p>
            Find Toyota Kirloskar Motor Private Limited at Bidadi Industrial
            Area, Ramanagara District, Karnataka.
          </p>

          <address>
            <strong>TOYOTA KIRLOSKAR MOTOR PRIVATE LIMITED</strong>
            <br />
            Plot No. 1, Bidadi Industrial Area,
            <br />
            Bidadi, Ramanagara District,
            <br />
            PIN - 562109, Karnataka, India
          </address>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Toyota+Kirloskar+Motor+Bidadi"
            target="_blank"
            rel="noreferrer"
            className="toyota-red-button"
          >
            Open in Google Maps
          </a>

        </div>

      </section>

      {/* ================= CONTACT ================= */}
      <section className="contact-section" id="contact">

        <div className="plant-container">

          <div className="contact-title">
            <span>NEED HELP?</span>
            <h2>Get in Contact with us</h2>
            <p>
              Have a question or need help?
              <br />
              Drop an email and our dedicated team will be happy to assist you.
            </p>
          </div>

          <div className="contact-grid">

            <div className="contact-card">
              <div className="contact-icon">⌂</div>

              <span>Address</span>

              <p>
                <strong>
                  TOYOTA KIRLOSKAR MOTOR PRIVATE LIMITED
                </strong>
                <br />
                Plot No. 1, Bidadi Industrial Area,
                <br />
                Bidadi, Ramanagara District,
                <br />
                PIN - 562109,
                <br />
                Karnataka, India
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">☎</div>

              <span>Contact</span>

              <p>
                Contact during working hours
                <br />
                <strong>8:30 AM to 5:30 PM</strong>
              </p>

              <a href="tel:08066292929">
                080-6629 2929
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">@</div>

              <span>Email</span>

              <p>
                Write to our dedicated
                <br />
                plant visit team.
              </p>

              <a href="mailto:experiencetkm.bidadi@toyota-kirloskar.co.in">
                experiencetkm.bidadi@
                <br />
                toyota-kirloskar.co.in
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section className="booking-section" id="booking">

        <div className="booking-content">
          <span>READY TO EXPERIENCE TOYOTA?</span>

          <h2>
            Step inside
            <br />
            the heart of
            <br />
            car manufacturing.
          </h2>

          <a href="#contact" className="toyota-white-button">
            Book Plant Tour →
          </a>
        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="plant-footer">

        <div className="plant-container footer-grid">

          <div>
            <div className="footer-logo">TOYOTA</div>
            <p>
              Toyota Kirloskar Motor Private Limited
            </p>
          </div>

          <div>
            <h4>Plant Visit</h4>
            <a href="#objectives">Objectives</a>
            <a href="#process">Process</a>
            <a href="#craftsmanship">Craftsmanship</a>
            <a href="#building-nation">Building Nation</a>
          </div>

          <div>
            <h4>Visit Information</h4>
            <a href="#eligibility">Eligibility</a>
            <a href="#instructions">Instructions</a>
            <a href="#route">Route Map</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <h4>Contact</h4>
            <a href="tel:08066292929">080-6629 2929</a>
            <a href="mailto:experiencetkm.bidadi@toyota-kirloskar.co.in">
              Email Plant Visit Team
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© Toyota Kirloskar Motor Private Limited</p>
          <p>Plant Visit Experience</p>
        </div>

      </footer>

    </div>

    <div>
    <ToyotaFooter />
    </div>
    </>
  );
}

export default PlantVisit;