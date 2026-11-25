
import { useState } from "react";
import ToyotaFooter from "./Footer";



export default function History() {
     const [historyMore, setHistoryMore] = useState(false);
  const [qualityMore, setQualityMore] = useState(false);

    return(
        <>
        <div className="history">

      {/* Hero */}

      <section className="historyHero">
        <div className="historyOverlay">
        </div>
      </section>

      {/* Weaving History */}

      <section className="historyContainer">

        <h2>WEAVING HISTORY</h2>

        <p>
          Towards the end of the nineteenth century, Sakichi Toyoda invented
          Japan's first power loom, revolutionising the country's textile
          industry.
        </p>

        <p>
          January 1918 saw him create the Toyoda Spinning and Weaving Company,
          and with the help of his son Kiichiro Toyoda, Sakichi fulfilled his
          lifelong dream of building an automatic loom in 1924.
        </p>

        {historyMore && (
          <>
            <p>
              The establishment of Toyoda Automatic Loom Works followed in
              1926.
            </p>

            <p>
              Kiichiro was also an innovator. Visits to Europe and the United
              States inspired him to enter the automobile industry.
            </p>

            <p>
              With the money earned from selling the patent rights of the
              automatic loom, Toyota Motor Corporation was established in 1937.
            </p>

            <p>
              Toyota Production System and Just-In-Time manufacturing became
              global benchmarks for efficiency and quality.
            </p>

            <p>
              Toyota’s reputation for Quality, Durability and Reliability has
              made it one of the most trusted automobile manufacturers in the
              world.
            </p>
          </>
        )}

        <button
          className="historyBtn"
          onClick={() => setHistoryMore(!historyMore)}
        >
          {historyMore ? "Read Less" : "Read More"}
        </button>

      </section>

      {/* Quality */}

      <section className="historyGray">

        <div className="historyContainer">
            <img src="https://static3.toyotabharat.com/images/toyota-in-india/history/quality-hero-img-310x282.webp" alt="" />
          <h2>QUALITY YOU CAN TRUST</h2>

          <p>
            Rising from post-war Japan, Toyota became one of the world's largest
            automobile manufacturers.
          </p>

          <p>
            Beginning with exports to the United States and Europe, Toyota
            steadily built a global reputation for reliability, innovation and
            customer satisfaction.
          </p>

          {qualityMore && (
            <>
              <p>
                Today Toyota operates across the world through manufacturing
                plants, distributors and thousands of dealerships.
              </p>

              <p>
                Continuous Improvement (Kaizen) and Respect for People remain
                the foundation of Toyota's success.
              </p>

              <p>
                Millions of customers continue to trust Toyota because of its
                commitment to quality, durability and reliability.
              </p>
            </>
          )}

          <button
            className="historyBtn"
            onClick={() => setQualityMore(!qualityMore)}
          >
            {qualityMore ? "Read Less" : "Read More"}
          </button>

        </div>

      </section>

      {/* Cards */}

      <section className="historyCards">

        <div className="historyCard">

          <img
            // src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900"
            src="https://static3.toyotabharat.com/images/toyota-in-india/history/automatic-loom-314x290.webp"
            alt=""
          />

          <h3>Toyota Automatic Loom</h3>

        </div>

        <div className="historyCard">

          <img
            // src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900
            src="https://static3.toyotabharat.com/images/toyota-in-india/history/sakichi-314x290.webp"
            alt=""
          />

          <h3>Toyota's Founder Mr. Sakichi</h3>

        </div>

        <div className="historyCard">

          <img
            // src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900"
            src="https://static3.toyotabharat.com/images/toyota-in-india/history/corolla-1950-314x290.webp"
            alt=""
          />

          <h3>1950 Toyota Corolla</h3>

        </div>

      </section>

    </div>

        <div>
            <ToyotaFooter />
        </div>
        </>
    )
}