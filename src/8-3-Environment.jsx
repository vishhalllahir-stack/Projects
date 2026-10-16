import './8-3-Environment.css';
import { useState } from 'react';
import ToyotaFooter from './Footer';

const environmentChallenges = [
  {
    title: "New Vehicle Zero CO₂",
    text: "Reducing CO₂ emissions from new vehicles through next-generation technologies.",
    link: "/toyota-in-india/environment/vehicle-zero-co2.html",
  },
  {
    title: "Lifecycle Zero CO₂",
    text: "Reducing environmental impact throughout the vehicle lifecycle and value chain.",
    link: "/toyota-in-india/environment/lifecycle.html",
  },
  {
    title: "Plant Zero CO₂",
    text: "Working toward carbon-neutral manufacturing operations.",
    link: "/toyota-in-india/environment/plant-zero-co2.html",
  },
  {
    title: "Water Management",
    text: "Reducing, recycling and reusing water throughout Toyota operations.",
    link: "/toyota-in-india/environment/water-management.html",
  },
  {
    title: "Waste Management",
    text: "Building a recycling-based society and reducing waste sent to landfill.",
    link: "/toyota-in-india/environment/waste-management.html",
  },
  {
    title: "Harmony with Nature",
    text: "Conserving biodiversity and creating environmental awareness.",
    link: "/toyota-in-india/environment/harmony-with-nature.html",
  },
];

const committeeMembers = [
  {
    name: "Masakazu Yoshimura",
    role: "Chairman MD & CEO",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/environment-committee-01.jpg",
  },
  {
    name: "B PADMANABHA",
    role: "EVP & Environment Director",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/environment-committee-02.jpg",
  },
];

const awards = [
  {
    title: "Sustainability Report",
    year: "Inline with GRI standards",
  },
  {
    title: "CII Sustainability Awards",
    year: "2012 to 2015",
  },
  {
    title: "CII Environment Domain Excellence Awards",
    year: "2018",
  },
  {
    title: "CII CAP 2.0",
    year: "2018 - 19",
  },
  {
    title: "Toyota Global ECO Kaizen Award",
    year: "2021",
  },
  {
    title: "CII (SR) Award",
    year: "2021",
  },
];

const reports = [
  "Annual Report 2025",
  "Annual Report 2024",
  "Annual Report 2023",
  "Annual Report 2022",
  "Annual Report 2021",
  "Annual Report 2020",
  "Annual Report 2019",
  "Annual Report 2018",
  "Annual Report 2017",
  "Annual Report 2016",
  "Annual Report 2015",
  "Annual Report 2014",
  "Annual Report 2013",
  "Annual Report 2012",
  "Annual Report 2011",
  "Annual Report 2010",
  "Annual Report 2009",
  "Annual Report 2008",
  "Annual Report 2007",
  "Annual Report 2006",
  "Annual Report 2005",
];

function Environment() {
  const [introOpen, setIntroOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [activeMember, setActiveMember] = useState(null);

  return (
    <>
    <main className="toyota-environment-page">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="environment-hero">

        <div className="environment-hero-overlay" />

        <div className="environment-hero-content">
          <p>For a sustainable future, we must have</p>

          <h1>
            RESPECT FOR
            <br />
            THE PLANET
          </h1>

          <button
            className="hero-explore-btn"
            onClick={() =>
              document
                .getElementById("environment-content")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            EXPLORE
            <span>↓</span>
          </button>
        </div>
      </section>

      {/* =========================================================
          TOP ENVIRONMENT NAVIGATION
      ========================================================= */}
      <section className="environment-navigation">
        <div className="environment-navigation-inner">

          <a href="/" className="environment-nav-home">
            Home
          </a>

          <div className="environment-nav-group">
            <button className="environment-nav-title">
              6 ENVIRONMENTAL CHALLENGES
              <span>⌄</span>
            </button>

            <div className="environment-dropdown">
              {environmentChallenges.map((item) => (
                <a href={item.link} key={item.title}>
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          <a
            href="/toyota-in-india/environment/ecozone.html"
            className="environment-nav-link"
          >
            Ecozone
          </a>

          <a
            href="/toyota-in-india/environment/committee.html"
            className="environment-nav-link"
          >
            Committee
          </a>
        </div>
      </section>

      <div id="environment-content">

        {/* =========================================================
            INTRODUCTION
        ========================================================= */}
        <section className="environment-introduction section-white">

          <div className="environment-intro-container">

            <div className="intro-text">

              <p className="section-kicker">
                ENVIRONMENT
              </p>

              <h2>
                Environment Conservation
                <br />
                is inherent in the Toyota culture.
              </h2>

              <p>
                Our vision, philosophy and guidelines are true reflections
                of our commitment for a sustainable future. Toyota Kirloskar
                Motor has focused on achieving harmony between its
                manufacturing activities and the environment based on the
                concept of a plant that optimally utilizes natural resources
                while operating in harmony with the natural environment.
              </p>

              {introOpen && (
                <p className="additional-intro">
                  TKM follows the approach of Learn, Perform and Drive to
                  develop the Eco-Mind of employees. In addition to creating
                  awareness, we also involve our employees physically in
                  afforestation drives, environment month promotion and other
                  Eco CSR activities with an intent to bring a sense of
                  ownership towards the environment.
                </p>
              )}

              <button
                className="text-read-button"
                onClick={() => setIntroOpen(!introOpen)}
              >
                {introOpen ? "READ LESS" : "READ MORE"}
                <span>{introOpen ? "↑" : "→"}</span>
              </button>
            </div>

            <div className="intro-image-wrap">
              <img
                src="https://static3.toyotabharat.com/images/toyota-in-india/environment/environment-banner.jpg"
                alt="Toyota environmental sustainability"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="image-fallback environment-fallback">
                <span>TOYOTA</span>
                <strong>RESPECT FOR THE PLANET</strong>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            EARTH CHARTER
        ========================================================= */}
        <section className="earth-charter-section">

          <div className="earth-charter-image">
            <img
              src="https://static3.toyotabharat.com/images/toyota-in-india/environment/environment-earth-charter.jpg"
              alt="Toyota Earth Charter"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <div className="image-fallback">
              <div className="fallback-tree">🌳</div>
            </div>
          </div>

          <div className="earth-charter-content">

            <span className="small-label">
              TOYOTA EARTH CHARTER
            </span>

            <h2>
              Building a sustainable
              <br />
              future together.
            </h2>

            <p>
              Toyota's stance on the protection of global environment dates
              back to the establishment of Toyota Earth Charter, issued in
              1992 and revised in 2000.
            </p>

            <p>
              This was followed by the formulation of the first Environment
              Action Plan in 1993. Ever since, every five years an action
              plan is rolled out to ensure implementation of environmentally
              responsible actions amongst Toyota affiliates.
            </p>

            <div className="charter-line" />
          </div>
        </section>

        {/* =========================================================
            GLOBAL VISION
        ========================================================= */}
        <section className="global-vision-section">

          <div className="section-heading-center">
            <span>OUR PHILOSOPHY</span>

            <h2>
              Toyota Global Vision
            </h2>
          </div>

          <div className="global-vision-container">

            <div className="global-vision-image">
              <img
                src="https://static3.toyotabharat.com/images/toyota-in-india/environment/toyota-global-vision.jpg"
                alt="Toyota Global Vision"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="vision-fallback">
                <div className="vision-tree">🌳</div>

                <span>TOYOTA GLOBAL VISION</span>
              </div>
            </div>

            <div className="global-vision-text">

              <p>
                The image of a tree has been used to symbolize the Toyota
                Vision from 'roots to fruits'. The tree is a symbol of
                natural strength. It is useful and long-lasting, something
                that continues to grow and flourish year after year.
              </p>

              <p>
                The Toyota principles are represented as the roots because
                everything we do as a company must grow from the foundation
                of our beliefs. These roots support the trunk of the tree,
                which signifies the strength and stability of our operations.
              </p>

              <p>
                From the trunk, the branches lead to the 12 tenets that make
                up the Toyota vision - the 'fruits' of the tree.
              </p>

              <p>
                Finally, the tree is set in a human environment, to remind us
                of who we work for - our customers.
              </p>

            </div>
          </div>
        </section>

        {/* =========================================================
            CHALLENGE 2050
        ========================================================= */}
        <section className="challenge-2050">

          <div className="challenge-2050-content">

            <span>TOYOTA ENVIRONMENT CHALLENGE</span>

            <h2>
              TOYOTA
              <br />
              ENVIRONMENT
              <br />
              CHALLENGE
              <br />
              <strong>2050</strong>
            </h2>

            <p>
              Six environmental challenges guide Toyota's journey toward
              carbon neutrality and a society in harmony with nature.
            </p>

            <a
              href="/toyota-in-india/environment/vehicle-zero-co2.html"
              className="challenge-button"
            >
              EXPLORE CHALLENGES
              <span>→</span>
            </a>

          </div>

          <div className="challenge-2050-image">
            <div className="challenge-circle">
              <div className="challenge-house">
                🏭
              </div>

              <div className="challenge-tree tree-one">🌳</div>
              <div className="challenge-tree tree-two">🌲</div>
              <div className="challenge-tree tree-three">🌳</div>
              <div className="challenge-tree tree-four">🌲</div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SIX CHALLENGES
        ========================================================= */}
        <section className="six-challenges">

          <div className="section-heading-center">
            <span>OUR COMMITMENT</span>

            <h2>
              Six Environmental Challenges
            </h2>
          </div>

          <div className="challenge-grid">

            {environmentChallenges.map((challenge, index) => (
              <a
                href={challenge.link}
                className="challenge-card"
                key={challenge.title}
              >
                <div className="challenge-number">
                  0{index + 1}
                </div>

                <div className="challenge-card-icon">
                  {["🚗", "♻", "🏭", "💧", "♻", "🌳"][index]}
                </div>

                <h3>
                  {challenge.title}
                </h3>

                <p>
                  {challenge.text}
                </p>

                <span className="card-arrow">
                  →
                </span>
              </a>
            ))}

          </div>
        </section>

        {/* =========================================================
            ENVIRONMENT COMMITTEE
        ========================================================= */}
        <section className="committee-section">

          <div className="section-heading-center">
            <span>LEADERSHIP</span>

            <h2>
              Environment Committee
            </h2>
          </div>

          <div className="committee-container">

            {committeeMembers.map((member, index) => (
              <div
                className="committee-card"
                key={member.name}
              >

                <div className="committee-image">

                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="committee-fallback">
                    <span>
                      {member.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>

                <div className="committee-info">

                  <h3>
                    {member.name}
                  </h3>

                  <p>
                    {member.role}
                  </p>

                  <button
                    onClick={() => setActiveMember(index)}
                  >
                    READ MESSAGE
                    <span>→</span>
                  </button>

                </div>

              </div>
            ))}

          </div>
        </section>

        {/* =========================================================
            MANAGEMENT COMMITMENT
        ========================================================= */}
        <section className="management-section">

          <div className="management-image">

            <div className="management-visual">
              <div className="management-leaf leaf-1" />
              <div className="management-leaf leaf-2" />
              <div className="management-leaf leaf-3" />
              <div className="management-leaf leaf-4" />

              <div className="management-center">
                RESPECT
                <br />
                FOR THE
                <br />
                PLANET
              </div>
            </div>

          </div>

          <div className="management-content">

            <span>OUR APPROACH</span>

            <h2>
              Management Commitment
              <br />
              & Vision Towards
              <br />
              Sustainability
            </h2>

            <p>
              At TKM, we understand that social and environmental
              sustainability is equally important as economic sustainability.
            </p>

            <p>
              The future generation is looking towards organizations to
              address the critical environmental issues that the planet is
              facing today. It is time for everyone to adopt environmental
              consideration in business decisions.
            </p>

          </div>
        </section>

        {/* =========================================================
            ENVIRONMENT POLICY
        ========================================================= */}
        <section className="policy-section">

          <div className="policy-container">

            <div className="policy-content">

              <span>POLICY</span>

              <h2>
                Environment Policy
              </h2>

              <p>
                As a responsible organization, we at Toyota Kirloskar Motor
                Pvt. Ltd. firmly believe in the philosophy of
                <strong> “Respect for the planet”.</strong>
              </p>

              <p>
                Also understanding the environmental threats posing the
                industry and mankind, the Toyota Environmental Challenges
                2050 forms the base of the mid to long term commitment
                towards Environmental Protection.
              </p>

              {policyOpen && (
                <p>
                  Hence, we reaffirm our commitment to contribute to society
                  by ensuring Environment protection throughout the life
                  cycle of our Products, Operations and Services.
                </p>
              )}

              <button
                className="text-read-button"
                onClick={() => setPolicyOpen(!policyOpen)}
              >
                {policyOpen ? "READ LESS" : "READ MORE"}
                <span>
                  {policyOpen ? "↑" : "→"}
                </span>
              </button>

              <a
                href="/documents/toyota-in-india/environment/environment-policy.pdf"
                className="pdf-button"
                target="_blank"
                rel="noreferrer"
              >
                DOWNLOAD ENVIRONMENT POLICY
                <span>↓</span>
              </a>

            </div>

            <div className="policy-badge">
              <div>
                <span>TOYOTA</span>
                <strong>
                  ENVIRONMENT
                  <br />
                  POLICY
                </strong>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            AWARDS
        ========================================================= */}
        <section className="awards-section">

          <div className="section-heading-center">
            <span>RECOGNITION</span>

            <h2>
              Awards & Recognition
            </h2>
          </div>

          <div className="awards-grid">

            {awards.map((award, index) => (
              <div className="award-card" key={index}>

                <div className="award-image">
                  <div className="award-trophy">
                    🏆
                  </div>
                </div>

                <div className="award-info">
                  <h3>
                    {award.title}
                  </h3>

                  <p>
                    {award.year}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* =========================================================
            REPORTS
        ========================================================= */}
        <section className="reports-section">

          <div className="section-heading-center">
            <span>DOCUMENTS</span>

            <h2>
              Reports
            </h2>
          </div>

          <div className="reports-grid">

            {reports.map((report, index) => (
              <div className="report-card" key={report}>

                <div className="report-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="report-content">

                  <h3>
                    {report}
                  </h3>

                  <button>
                    DOWNLOAD
                    <span>↓</span>
                  </button>

                </div>

              </div>
            ))}

          </div>
        </section>

        {/* =========================================================
            GREEN TOGETHER CTA
        ========================================================= */}
        <section className="green-together">

          <div className="green-together-overlay" />

          <div className="green-together-content">

            <span>
              TOGETHER FOR A BETTER FUTURE
            </span>

            <h2>
              GREEN
              <br />
              TOGETHER
            </h2>

            <p>
              Join hands with Toyota on our journey towards a society
              in harmony with nature.
            </p>

            <a
              href="/toyota-in-india/environment/ecozone.html"
              className="green-button"
            >
              EXPLORE ECOZONE
              <span>→</span>
            </a>

          </div>

        </section>

      </div>

      {/* =========================================================
          MESSAGE MODAL
      ========================================================= */}
      {activeMember !== null && (
        <div
          className="environment-modal"
          onClick={() => setActiveMember(null)}
        >
          <div
            className="environment-modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setActiveMember(null)}
            >
              ×
            </button>

            <span>ENVIRONMENT COMMITTEE</span>

            <h2>
              {committeeMembers[activeMember].name}
            </h2>

            <h4>
              {committeeMembers[activeMember].role}
            </h4>

            <p>
              Toyota has always considered environment as a prioritized
              stakeholder. We continue working with all our stakeholders
              towards realizing our environmental goals and creating a
              sustainable society.
            </p>

            <p>
              As we move towards sustainability, we believe it is essential
              to embrace inclusivity across our operations and foster
              sustainable values among our stakeholders.
            </p>

          </div>
        </div>
      )}

    </main>


    <div>
      <ToyotaFooter />
    </div>
    </>
  );
}

export default Environment;
