
import  { useEffect, useRef, useState } from "react";
import "./8-4-EcozoneVeertual.css";
import ToyotaFooter from "./Footer";

const zones = [
  {
    id: "home",
    name: "Ecozone",
    number: "00",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/ecozone.jpg",
  },
  {
    id: "toyota-plaza",
    name: "Toyota Plaza",
    number: "01",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/toyota-plaza.jpg",
  },
  {
    id: "forest",
    name: "Forest Theme Park",
    number: "02",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/forest-theme-park.jpg",
  },
  {
    id: "value",
    name: "Value Theme Park",
    number: "03",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/value-theme-park.jpg",
  },
  {
    id: "underground",
    name: "Underground Ecology",
    number: "04",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/underground-ecology.jpg",
  },
  {
    id: "silent",
    name: "Silent Garden",
    number: "05",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/silent-garden.jpg",
  },
  {
    id: "wetland",
    name: "Wetland Pavilion",
    number: "06",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/wetland-pavilion.jpg",
  },
  {
    id: "pollination",
    name: "Pollination Meadow",
    number: "07",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/pollination-meadow.jpg",
  },
  {
    id: "orchards",
    name: "Orchards & Medicinal Garden",
    number: "08",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/orchards-medicinal-garden.jpg",
  },
  {
    id: "education",
    name: "Education Building",
    number: "09",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/education-building.jpg",
  },
  {
    id: "rainwater",
    name: "Rainwater Harvesting Ponds",
    number: "10",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/rainwater-harvesting.jpg",
  },
  {
    id: "solar",
    name: "Solar Theme Park",
    number: "11",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/solar-theme-park.jpg",
  },
  {
    id: "energy",
    name: "Energy Theme Park",
    number: "12",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/energy-theme-park.jpg",
  },
  {
    id: "organic",
    name: "Organic Farming & Nursery",
    number: "13",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/organic-farming.jpg",
  },
  {
    id: "timeline",
    name: "Timeline Walk",
    number: "14",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/timeline-walk.jpg",
  },
  {
    id: "climate",
    name: "Climate Change",
    number: "15",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/climate-change.jpg",
  },
  {
    id: "biodiversity",
    name: "Biodiversity Theme Park",
    number: "16",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/biodiversity-theme-park.jpg",
  },
  {
    id: "sacred",
    name: "Sacred Groves",
    number: "17",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/sacred-groves.jpg",
  },
];

const leadership = [
  {
    name: "Mr. Masakazu Yoshimura",
    role: "Managing Director & Chief Executive Officer (MD & CEO)",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/masakazu-yoshimura.jpg",
  },
  {
    name: "Late. Vikram S. Kirloskar",
    role: "Vice Chairman, Toyota Kirloskar Motor",
    image:
      "https://static3.toyotabharat.com/images/toyota-in-india/environment/vikram-kirloskar.jpg",
  },
];

function EcozoneVirtualTour() {
  const [activeZone, setActiveZone] = useState(zones[0]);
  const [tourMode, setTourMode] = useState("discover");
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadershipOpen, setLeadershipOpen] = useState(false);
  const [activeLeader, setActiveLeader] = useState(null);
  const [introVisible, setIntroVisible] = useState(true);

  const panoramaRef = useRef(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handlePointerDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    const x =
      e.clientX ||
      e.touches?.[0]?.clientX ||
      0;

    const difference = x - startX.current;

    currentX.current += difference * 0.55;

    startX.current = x;

    if (panoramaRef.current) {
      panoramaRef.current.style.transform =
        `translateX(${currentX.current}px) scale(1.12)`;
    }
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const selectZone = (zone) => {
    setActiveZone(zone);
    setMenuOpen(false);
    setIntroVisible(false);

    currentX.current = 0;

    if (panoramaRef.current) {
      panoramaRef.current.style.transform =
        "translateX(0px) scale(1.12)";
    }
  };

  const nextZone = () => {
    const currentIndex = zones.findIndex(
      (zone) => zone.id === activeZone.id
    );

    const nextIndex =
      (currentIndex + 1) % zones.length;

    selectZone(zones[nextIndex]);
  };

  const previousZone = () => {
    const currentIndex = zones.findIndex(
      (zone) => zone.id === activeZone.id
    );

    const previousIndex =
      (currentIndex - 1 + zones.length) %
      zones.length;

    selectZone(zones[previousIndex]);
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowRight") {
        nextZone();
      }

      if (event.key === "ArrowLeft") {
        previousZone();
      }

      if (event.key === "Escape") {
        setLeadershipOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (

    <>
    <main className="eco-tour-page">

      {/* ======================================================
          TOP HEADER
      ====================================================== */}

      <header className="eco-tour-header">

        <div className="eco-tour-brand">
          <span className="eco-tour-toyota">
            TOYOTA
          </span>

          <span className="eco-tour-divider">
            |
          </span>

          <span>
            ECOZONE
          </span>
        </div>

        <button
          className="eco-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

      </header>

      {/* ======================================================
          SELECT ZONES
      ====================================================== */}

      <aside
        className={`eco-zone-panel ${
          menuOpen ? "eco-zone-panel-open" : ""
        }`}
      >

        <div className="eco-zone-panel-header">

          <span>
            SELECT ZONES
          </span>

          <button
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

        </div>

        <div className="eco-zone-list">

          {zones.map((zone) => (

            <button
              key={zone.id}
              className={`eco-zone-item ${
                activeZone.id === zone.id
                  ? "active"
                  : ""
              }`}
              onClick={() => selectZone(zone)}
            >

              <span className="eco-zone-number">
                {zone.number}
              </span>

              <span className="eco-zone-name">
                {zone.name}
              </span>

            </button>

          ))}

        </div>

      </aside>

      {/* ======================================================
          MAIN TOUR
      ====================================================== */}

      <section className="eco-tour-main">

        {/* PANORAMA */}

        <div
          className="eco-panorama"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >

          <div
            ref={panoramaRef}
            className="eco-panorama-image"
            style={{
              backgroundImage: `
                url("${activeZone.image}")
              `,
            }}
          />

          <div className="eco-panorama-fallback">

            <div className="eco-fallback-circle">
              🌿
            </div>

            <span>
              TOYOTA ECOZONE
            </span>

            <strong>
              {activeZone.name}
            </strong>

          </div>

          <div className="eco-panorama-gradient" />

          {/* PANORAMA TITLE */}

          <div className="eco-panorama-title">

            <span>
              TOYOTA ECOZONE
            </span>

            <h1>
              {activeZone.name}
            </h1>

          </div>

          {/* ROTATE */}

          <div className="eco-rotate">

            <div className="eco-rotate-icon">
              ↔
            </div>

            <span>
              DRAG TO ROTATE
            </span>

          </div>

          {/* ARROWS */}

          <button
            className="eco-arrow eco-arrow-left"
            onClick={previousZone}
          >
            ‹
          </button>

          <button
            className="eco-arrow eco-arrow-right"
            onClick={nextZone}
          >
            ›
          </button>

        </div>

        {/* ==================================================
            TOUR MODE
        ================================================== */}

        <div className="eco-tour-controls">

          <div className="eco-tour-modes">

            <button
              className={
                tourMode === "guided"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTourMode("guided")
              }
            >
              <span className="eco-mode-icon">
                ▶
              </span>

              <span>
                GUIDED TOUR
              </span>
            </button>

            <button
              className={
                tourMode === "discover"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTourMode("discover")
              }
            >
              <span className="eco-mode-icon">
                ◎
              </span>

              <span>
                DISCOVER IT YOURSELF
              </span>
            </button>

          </div>

          <div className="eco-zone-counter">
            <strong>
              {activeZone.number}
            </strong>

            <span>
              /
            </span>

            <span>
              17
            </span>
          </div>

        </div>

      </section>

      {/* ======================================================
          INTRO OVERLAY
      ====================================================== */}

      {introVisible && (
        <div className="eco-intro-overlay">

          <div className="eco-intro-content">

            <div className="eco-intro-logo">
              <span>TOYOTA</span>
            </div>

            <span className="eco-intro-small">
              WELCOME TO
            </span>

            <h1>
              ECOZONE
              <br />
              VIRTUAL TOUR
            </h1>

            <p>
              Explore the world of Toyota Ecozone
              through an immersive virtual experience.
            </p>

            <div className="eco-intro-actions">

              <button
                className="eco-start-button"
                onClick={() =>
                  setIntroVisible(false)
                }
              >
                START TOUR
                <span>
                  →
                </span>
              </button>

              <button
                className="eco-skip-button"
                onClick={() =>
                  setIntroVisible(false)
                }
              >
                SKIP INTRO
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================
          LEADERSHIP BYTES
      ====================================================== */}

      <section className="eco-leadership">

        <div className="eco-leadership-heading">

          <span>
            LEADERSHIP BYTES
          </span>

          <h2>
            Management
            <br />
            Commitment
          </h2>

          <p>
            Discover the thoughts and vision of Toyota
            leadership towards sustainability, mobility
            and society.
          </p>

        </div>

        <div className="eco-leader-grid">

          {leadership.map((leader, index) => (

            <article
              className="eco-leader-card"
              key={leader.name}
              onClick={() => {
                setActiveLeader(leader);
                setLeadershipOpen(true);
              }}
            >

              <div className="eco-leader-image">

                <img
                  src={leader.image}
                  alt={leader.name}
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

                <div className="eco-leader-fallback">
                  <span>
                    {index === 0
                      ? "MY"
                      : "VK"}
                  </span>
                </div>

              </div>

              <div className="eco-leader-info">

                <span>
                  MANAGEMENT
                </span>

                <h3>
                  {leader.name}
                </h3>

                <p>
                  {leader.role}
                </p>

                <button>
                  READ MESSAGE
                  <span>
                    →
                  </span>
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* ======================================================
          LEADERSHIP MODAL
      ====================================================== */}

      {leadershipOpen &&
        activeLeader && (
          <div
            className="eco-leader-modal"
            onClick={() =>
              setLeadershipOpen(false)
            }
          >

            <div
              className="eco-leader-modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="eco-modal-close"
                onClick={() =>
                  setLeadershipOpen(false)
                }
              >
                ×
              </button>

              <div className="eco-modal-image">

                <img
                  src={activeLeader.image}
                  alt={activeLeader.name}
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

              </div>

              <div className="eco-modal-text">

                <span>
                  LEADERSHIP BYTES
                </span>

                <h2>
                  {activeLeader.name}
                </h2>

                <h4>
                  {activeLeader.role}
                </h4>

                <p>
                  At Toyota, we uphold the philosophy
                  of continuous improvement because we
                  believe there is always scope to do
                  better.
                </p>

                <p>
                  We strive towards developing a more
                  sustainable future and creating a
                  company that works in harmony with
                  nature and society.
                </p>

                <p>
                  Through initiatives focused on
                  education, community development and
                  the environment, Toyota continues to
                  contribute towards a sustainable
                  society.
                </p>

              </div>

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

export default EcozoneVirtualTour;
