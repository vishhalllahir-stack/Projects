import { useEffect, useState } from "react";
import "./8-5-SocialContribution.css";
import ToyotaFooter from "./Footer";




/* =========================================================
   IMAGES
========================================================= */

const galleryImages = [
   {
    src: "/src/assets/csr-gallery/gallery1.jpg",
    title: "Community & Environment",
  },
  {
    src: "/src/assets/csr-gallery/gallery2.jpg",
    title: "Road Safety Education",
  },
  {
    src: "/src/assets/csr-gallery/gallery3.jpg",
    title: "Employee Volunteering",
  },
  {
    src: "/src/assets/csr-gallery/gallery4.jpg",
    title: "Education & Community",
  },
  {
    src: "/src/assets/csr-gallery/gallery5.jpg",
    title: "Quality Education",
  },
  {
    src: "/src/assets/csr-gallery/gallery6.jpg",
    title: "Environment",
  },
  {
    src: "/src/assets/csr-gallery/gallery7.jpg",
    title: "Skill Development",
  },
  {
    src: "/src/assets/csr-gallery/gallery8.jpg",
    title: "Social Outreach",
  },
];

/* =========================================================
   LEADERS
========================================================= */

const leaders = [
  {
    name: "Masakazu Yoshimura",
    role: "Managing Director & Chief Executive Officer (MD & CEO)",
    image:
      "https://static3.toyotabharat.com/images/csr/masakazu-yoshimura.jpg",
    quote:
      "I strongly believe in Customer First Philosophy, the manifestation of which extends in the social dimension to Community First.",
  },
  {
    name: "Late. Vikram S. Kirloskar",
    role: "",
    image:
      "https://static3.toyotabharat.com/images/csr/vikram-kirloskar.jpg",
    quote:
      "Sustainability and impact have always been the key features of our societal initiatives.",
  },
];

/* =========================================================
   REPORTS
========================================================= */

const reports = [
  "CSR Policy FY 2026-27",
  "CSR Policy FY 2025-26",
  "CSR Annual Report FY 24-25",
  "CSR Impact Assessment Report FY 2025-26",
  "CSR Impact Assessment Report FY 24-25",
  "CSR Annual Report FY 23-24",
];

const focusAreas = [
  {
    number: "01",
    image: "/src/assets/csr-gallery/gallery1.jpg",
    title: "Education",
    description:
      "We focus on building state-of-the-art infrastructure to provide equal opportunities to the leaders of tomorrow.",
  },
  {
    number: "02",
    image: "/src/assets/csr-gallery/gallery2.jpg",
    title: "Environment",
    description:
      "We take pride in bringing communities together to protect and preserve the environment.",
  },
  {
    number: "03",
    image: "/src/assets/csr-gallery/gallery3.jpg",
    title: "Health & Hygiene",
    description:
      "Our aim is to improve hygiene standards and access to safe drinking water in the community.",
  },
  {
    number: "04",
    image: "/src/assets/csr-gallery/gallery4.jpg",
    title: "Road Safety",
    description:
      "We believe in raising awareness on road safety to help make the roads safer for everyone.",
  },
  {
    number: "05",
    image: "/src/assets/csr-gallery/gallery5.jpg",
    title: "Disaster Relief",
    description:
      "Our role in uplifting and providing amenities for rebuilding the communities after a natural disaster.",
  },
  {
    number: "06",
    image: "/src/assets/csr-gallery/gallery6.jpg",
    title: "Skill Development",
    description:
      "Empowering local communities by educating and developing skills that enrich their lives.",
  },
];

const awards = [
  {
    title: "Sustainable CSR Leadership Award",
    year: "2025",
  },
  {
    title: "Community Development Excellence Award",
    year: "2024",
  },
  {
    title: "Best Employee Volunteering Program",
    year: "2023",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function SocialContribution() {
  const [activeGallery, setActiveGallery] = useState(0);

  const nextGallery = () => {
    setActiveGallery(
      (prev) => (prev + 1) % galleryImages.length
    );
  };

  const previousGallery = () => {
    setActiveGallery(
      (prev) =>
        (prev - 1 + galleryImages.length) %
        galleryImages.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGallery(
        (prev) => (prev + 1) % galleryImages.length
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <div className="sc-page">


      {/* ================= STICKY HEADER ================= */}
      <header className="csr-header">
        <nav className="csr-navigation">

          <a href="#home" className="csr-nav-link">
            HOME
          </a>

          <a href="#vision" className="csr-nav-link">
            VISION
          </a>

          <a href="#evolution" className="csr-nav-link">
            EVOLUTION
          </a>

          <a href="#focus" className="csr-nav-link">
            FOCUS AREAS
          </a>

          <a href="#awards" className="csr-nav-link">
            AWARDS AND RECOGNITION
          </a>

          <a href="#committee" className="csr-nav-link">
            CSR COMMITTEE
          </a>

          <a href="#reports" className="csr-nav-link">
            REPORTS
          </a>

        </nav>
      </header>
















      {/* =================================================
          HERO
      ================================================= */}

      <section className="sc-hero">

        <div className="sc-hero-overlay"></div>

        <div className="sc-hero-content">

          <div className="sc-breadcrumb">
            Toyota in India / Social Contribution
          </div>

          <h1>
            Corporate
            <br />
            Social Responsibility
          </h1>

          <p>
            Building vibrant communities in harmony
            with nature.
          </p>

        </div>

      </section>


      {/* =================================================
          INTRODUCTION
      ================================================= */}

      <section className="sc-introduction">

        <div className="sc-section-inner">

          <div className="sc-intro-label">
            CORPORATE SOCIAL RESPONSIBILITY
          </div>

          <h2>
            Building vibrant communities
            <br />
            in harmony with nature.
          </h2>

          <div className="sc-red-line"></div>

          <p>
            Our CSR philosophy, 'Grow Together' focused on
            building a sustainable future for the Indian
            Communities.
          </p>

          <p>
            Toyota Kirloskar Motor (TKM) was established in
            India in 1997, as a joint venture between Toyota
            Motor Corporation Japan and the Kirloskar Systems
            Limited. TKM derives inspiration from Toyota's
            leadership in the global automotive landscape and
            constantly strives towards advancing the legacy.
          </p>

          <p>
            Our endeavours are aimed at contributing to the
            society by making 'ever better cars' and are
            committed to be instrumental in solving the issues
            of the communities we operate in. We draw this
            philosophy from our founder, Kiichiro Toyoda, who
            had always hoped for people's happiness.
          </p>

          <p>
            Thereby, addresses the fundamental issue in its
            core value of Monozukuri, which refers to
            sustainable growth, in harmony with nature. All our
            activities are to be conducted with balance and
            harmony. CSR has been an integral part of Toyota's
            DNA in conducting the business.
          </p>

          <p>
            We believe in the philosophy of 'Grow Together'
            and thus focus on the community around our
            manufacturing plant to ensure that they are
            sustainable.
          </p>

        </div>

      </section>


      {/* =================================================
          SOCIAL OUTREACH
      ================================================= */}

      <section className="sc-outreach">

        <div className="sc-outreach-image">
          <img
            src={galleryImages[7].src}
            alt="Toyota social outreach"
          />
        </div>

        <div className="sc-outreach-content">

          <span>01</span>

          <h2>
            Social
            <br />
            Outreach
          </h2>

          <p>
            As on 31st March 2025
          </p>

          <div className="sc-number">
            42,31,191
          </div>

          <p className="sc-number-text">
            lives touched and enhanced,
            <br />
            our journey has only begun.
          </p>

          <button>
            EXPLORE
          </button>

        </div>

      </section>


      {/* =================================================
          GOING BEYOND
      ================================================= */}

      <section className="sc-going">

        <div className="sc-going-content">

          <div className="sc-small-title">
            CORPORATE SOCIAL RESPONSIBILITY
          </div>

          <h2>
            Going Beyond,
            <br />
            for a better future.
          </h2>

          <div className="sc-red-line"></div>

          <p>
            Toyota believes in not just executing CSR, but
            executing sustainable CSR with optimal resources
            and high impact approach.
          </p>

          <p>
            Our activities are designed around the needs of
            the communities and are implemented with a focus
            on sustainability and measurable impact.
          </p>

          <button>
            EXPLORE
          </button>

        </div>

        <div className="sc-going-image">
          <img
            src={galleryImages[0].src}
            alt="Toyota community activity"
          />
        </div>

      </section>


      {/* =================================================
          THEMATIC APPROACH
      ================================================= */}

      <section className="sc-thematic">

        <div className="sc-section-inner">

          <div className="sc-small-title">
            OUR APPROACH
          </div>

          <h2>
            Thematic approach
            <br />
            and diversified reach
          </h2>

          <div className="sc-red-line"></div>

          <p className="sc-thematic-text">
            Throughout this journey, we ensure that all our
            interventions are need-based, incorporate our
            child to community approach, capture the learnings
            from our multi-stakeholder engagements, integrate
            a behaviour change aspect wherever applicable
            and promote community ownership.
          </p>

        </div>

      </section>


      {/* =================================================
          VISION
      ================================================= */}

      <section className="sc-vision">

        <div className="sc-vision-image">
          <img
            src={galleryImages[5].src}
            alt="Toyota vision"
          />
        </div>

        <div className="sc-vision-content">

          <span className="sc-big-number">
            01
          </span>

          <h2>Vision</h2>

          <div className="sc-red-line"></div>

          <p>
            Our vision for corporate social responsibility
            is to be a socially committed organization engaged
            at building vibrant communities in harmony with
            nature.
          </p>

          <p>
            We aim to become the most admired company in India,
            meet customer expectations and be rewarded with a
            smile.
          </p>

          <button>
            KNOW MORE
          </button>

        </div>

      </section>


      {/* =================================================
          JOURNEY
      ================================================= */}

      <section className="sc-journey">

        <div className="sc-journey-inner">

          <div className="sc-small-title">
            OUR JOURNEY
          </div>

          <h2>
            Journey of Change
          </h2>

          <div className="sc-red-line"></div>

          <p>
            Our drive to build a sustainable future started
            more than 20 years ago. Take a look at our important
            milestones we have crossed in this journey to build
            a better tomorrow.
          </p>

          <div className="sc-timeline">

            <div className="sc-timeline-item">
              <strong>1997</strong>
              <span>TKM established in India</span>
            </div>

            <div className="sc-timeline-item">
              <strong>2014</strong>
              <span>Community development initiatives</span>
            </div>

            <div className="sc-timeline-item">
              <strong>2017</strong>
              <span>iCARE employee volunteering</span>
            </div>

            <div className="sc-timeline-item">
              <strong>2020</strong>
              <span>Expanded CSR interventions</span>
            </div>

            <div className="sc-timeline-item">
              <strong>2025</strong>
              <span>42+ lakh lives touched</span>
            </div>

          </div>

          <button>
            KNOW MORE
          </button>

        </div>

      </section>


      {/* =================================================
          FOCUS AREAS
      ================================================= */}

      <section className="sc-focus">

        <div className="sc-section-inner">

          <div className="sc-small-title">
            OUR INITIATIVES
          </div>

          <h2>
            Focus Areas
          </h2>

          <div className="sc-red-line"></div>

          <p className="sc-focus-intro">
            We have narrowed down to six key thematic
            pillars as our primary focus area to achieve
            our vision of sustainable growth in harmony
            with nature.
          </p>


          <div className="sc-focus-grid">

            {focusAreas.map((area) => (
              <article
                className="sc-focus-card"
                key={area.number}
              >

                <div className="sc-focus-image">

                  <img
                    src={area.image}
                    alt={area.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        galleryImages[
                          Number(area.number) - 1
                        ].src;
                    }}
                  />

                  <span>
                    {area.number}
                  </span>

                </div>

                <div className="sc-focus-card-content">

                  <h3>
                    {area.title}
                  </h3>

                  <p>
                    {area.description}
                  </p>

                  <button>
                    LEARN MORE
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          ICARE
      ================================================= */}

      <section className="sc-icare">

        <div className="sc-icare-image">

          <img
            src={galleryImages[2].src}
            alt="Toyota iCARE"
          />

        </div>

        <div className="sc-icare-content">

          <div className="sc-small-title">
            EMPLOYEE VOLUNTEERING
          </div>

          <h2>
            Programme -
            <br />
            iCARE
          </h2>

          <div className="sc-red-line"></div>

          <p>
            We conceptualized an employee volunteering
            programme called iCARE (I, Community Action to
            Reach Everyone).
          </p>

          <p>
            The philosophy behind this programme is to
            encourage employees to devote their time and
            expertise for the betterment of society.
          </p>

          <div className="sc-icare-number">
            70,864
          </div>

          <span>
            Overall Outreach
          </span>

          <button>
            KNOW MORE
          </button>

        </div>

      </section>


      {/* =================================================
          AWARDS
      ================================================= */}

      <section className="sc-awards">

        <div className="sc-section-inner">

          <div className="sc-small-title">
            RECOGNITION
          </div>

          <h2>
            Awards & Recognition
          </h2>

          <div className="sc-red-line"></div>

          <div className="sc-awards-grid">

            {awards.map((award, index) => (
              <div
                className="sc-award-card"
                key={index}
              >

                <div className="sc-award-image">

                  <span>
                    AWARD
                  </span>

                </div>

                <h3>
                  {award.title}
                </h3>

                {award.year && (
                  <p>
                    {award.year}
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          CSR COMMITTEE
      ================================================= */}

      <section className="sc-committee">

        <div className="sc-section-inner">

          <div className="sc-small-title">
            LEADERSHIP
          </div>

          <h2>
            CSR Committee
          </h2>

          <div className="sc-red-line"></div>


          <div className="sc-leader-feature">

            <div className="sc-leader-photo">

              <img
                src={leaders[0].image}
                alt={leaders[0].name}
                onError={(e) => {
                  e.currentTarget.src =
                    galleryImages[3].src;
                }}
              />

            </div>

            <div className="sc-leader-text">

              <div className="sc-quote">
                "
              </div>

              <p>
                {leaders[0].quote}
              </p>

              <h3>
                {leaders[0].name}
              </h3>

              <span>
                {leaders[0].role}
              </span>

            </div>

          </div>


          <div className="sc-leaders-grid">

            {leaders.map((leader, index) => (
              <div
                className="sc-leader-card"
                key={index}
              >

                <div className="sc-leader-card-image">

                  <img
                    src={leader.image}
                    alt={leader.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        galleryImages[index + 3].src;
                    }}
                  />

                </div>

                <h3>
                  {leader.name}
                </h3>

                <p>
                  {leader.role}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          REPORTS
      ================================================= */}

      <section className="sc-reports">

        <div className="sc-section-inner">

          <div className="sc-reports-header">

            <div>

              <div className="sc-small-title">
                DOCUMENTS
              </div>

              <h2>
                Reports
              </h2>

              <div className="sc-red-line"></div>

            </div>

            <button>
              VIEW ALL
            </button>

          </div>


          <div className="sc-reports-grid">

            {reports.map((report, index) => (
              <article
                className="sc-report-card"
                key={index}
              >

                <div className="sc-report-icon">
                  PDF
                </div>

                <div>

                  <span>
                    {index < 2
                      ? "Corporate Social Responsibility Policy"
                      : "CSR Report"}
                  </span>

                  <h3>
                    {report}
                  </h3>

                  <button>
                    VIEW REPORT
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          GALLERY
      ================================================= */}

      <section className="sc-gallery">

        <div className="sc-gallery-title">
          <h2>
            Gallery
          </h2>
        </div>


        <div className="sc-gallery-decoration">

          {Array.from({ length: 25 }).map(
            (_, index) => (
              <span key={index}></span>
            )
          )}

        </div>


        <div className="sc-gallery-container">

          {/* PREVIOUS */}

          <button
            type="button"
            className="sc-gallery-btn sc-gallery-left"
            onClick={previousGallery}
            aria-label="Previous image"
          >
            ‹
          </button>


          {/* IMAGE */}

          <div className="sc-gallery-image-wrapper">

            <img
              key={galleryImages[activeGallery].src}
              src={galleryImages[activeGallery].src}
              alt={galleryImages[activeGallery].title}
              className="sc-gallery-main-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <div className="sc-gallery-caption">
              {galleryImages[activeGallery].title}
            </div>

          </div>


          {/* NEXT */}

          <button
            type="button"
            className="sc-gallery-btn sc-gallery-right"
            onClick={nextGallery}
            aria-label="Next image"
          >
            ›
          </button>

        </div>


        {/* DOTS */}

        <div className="sc-gallery-pagination">

          {galleryImages.map(
            (image, index) => (
              <button
                type="button"
                key={image.src}
                onClick={() =>
                  setActiveGallery(index)
                }
                className={
                  activeGallery === index
                    ? "sc-gallery-dot active"
                    : "sc-gallery-dot"
                }
                aria-label={
                  `Gallery image ${index + 1}`
                }
              />
            )
          )}

        </div>

      </section>

    </div>

    <div>
      <ToyotaFooter />
    </div>

    </>
  );
}