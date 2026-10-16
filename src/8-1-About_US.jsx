import './8-1-AboutUS.css';
import ToyotaFooter from './Footer';

export default function ToyotaAdvantage() {
  return (
    <>
      <div className="toyota-advantage-page">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="toyota-top-header">

          <nav className="toyota-top-nav">

            <a
              href="#toyota-india"
              className="active"
            >
              TOYOTA IN INDIA
            </a>

            <a href="#history">
              HISTORY
            </a>

            <a href="#vision">
              VISION
            </a>

            <a href="#media">
              MEDIA
            </a>

            <a href="#awards">
              AWARDS
            </a>

          </nav>

        </header>


        {/* =================================================
            MAIN
        ================================================= */}

        <main className="toyota-advantage-main">


          {/* =================================================
              HERO
          ================================================= */}

          <section className="toyota-advantage-hero">

            {/* HERO */}
              <img
                src="https://www.toyotabharat.com/toyota-in-india/about/index.html"
                alt="Toyota Advantage"
              />

            <div className="toyota-advantage-title">

              <span className="toyota-title-toyota">
                TOYOTA
              </span>

              <span className="toyota-title-advantage">
                ADVANTAGE
              </span>

            </div>

          </section>


          {/* =================================================
              QUALITY SECTION
          ================================================= */}

          <section className="toyota-quality-section">


            {/* =================================================
                LEADER
            ================================================= */}

            <div className="toyota-leader-area">

              <div className="toyota-leader-photo-box">
                <img
                  src="https://www.toyotabharat.com/media/spokespersons/images/masakazu-yoshimura.jpg"
                  alt="Mr. Masakazu Yoshimura"
                />
              </div>


              <h2 className="toyota-leader-name">
                Mr. Masakazu Yoshimura
              </h2>


              <p className="toyota-leader-position">
                Managing Director &amp; Chief Executive Officer
                <br />
                (MD &amp; CEO), Toyota Kirloskar Motor
              </p>


              {/* =================================================
                  LEADER THUMBNAILS
              ================================================= */}

              <div className="toyota-leader-thumbs">

                <div className="toyota-leader-thumb active">

                  <img
                    className="toyota-leader-thumb-image"
                    src="https://static3.toyotabharat.com/images/toyota-in-india/about/masakazu-yoshimura.png"
                    alt="Mr. Masakazu Yoshimura"
                  />

                  <div className="toyota-leader-thumb-name">
                    Mr. Masakazu
                    <br />
                    Yoshimura
                  </div>

                </div>


                <div className="toyota-leader-thumb">

                  <img
                    className="toyota-leader-thumb-image"
                    src="https://static3.toyotabharat.com/images/toyota-in-india/about/vikram-s-kirloskar.png"
                    alt="Late. Vikram S. Kirloskar"
                  />

                  <div className="toyota-leader-thumb-name">
                    Late. Vikram S.
                    <br />
                    Kirloskar
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                QUALITY CONTENT
            ================================================= */}

            <div className="toyota-quality-content">

              <h2 className="toyota-quality-heading">
                QUALITY YOU CAN TRUST
              </h2>


              <p>
                At Toyota, we uphold the philosophy of continuous
                improvement (Kaizen) because we believe that there is
                always scope to do better. It is this very philosophy
                that drives us towards quality, making it a way of life
                at Toyota.
              </p>


              <p>
                The tradition at Toyota has always been to provide
                premium quality cars backed with reliable services to
                our customers. We ensure that the quality meets the
                international standards while keeping in mind the local
                sensitivities.
              </p>


              <p>
                Our firm belief in putting customers first has constantly
                enabled us to respond effectively to your needs, whether
                in terms of quality, service or the driving experience.
              </p>


              <p>
                Toyota's renowned reputation of Quality Durability and
                Reliability (QDR) has led our steady growth in the Indian
                automotive market. We are proud to declare that over 1
                million Indians are part of the ever growing Toyota family.
              </p>


              <p>
                We also strive towards developing a more sustainable
                future and being pioneers in the Hybrid Technology is
                our first step towards this movement. Through initiatives
                focused on education, community development and the
                environment, we aim to create a company that works in
                harmony with nature and society.
              </p>


              <p>
                I would like to thank all our partners who have been
                instrumental in our growth. We look forward to
                strengthening our relationship with you and welcome you
                to be a part of the Toyota family.
              </p>

            </div>

          </section>


          {/* =================================================
              MOST VALUABLE ASSET
          ================================================= */}

          <section className="toyota-employee-section">


            <div className="toyota-employee-content">

              <h2 className="toyota-section-heading">
                OUR MOST VALUABLE ASSET - OUR
                <br />
                EMPLOYEES
              </h2>


              <p className="toyota-section-text">
                At Toyota, the philosophy of Mutual Trust and Respect
                is at the core. Our employees are vital and inevitably
                the most valuable asset. We aim to provide a stable
                employment and world-class working conditions balanced
                with the progress of the company....
              </p>


              <button
                type="button"
                className="toyota-read-more"
              >
                Read more
              </button>

            </div>


            <div className="toyota-section-image-area">

              <img
                className="toyota-section-image"
                src="https://static3.toyotabharat.com/images/toyota-in-india/about/our-most-valuable-asset.jpg"
                alt="Toyota Employees"
              />

            </div>

          </section>


          {/* =================================================
              EMPOWERING EMPLOYEES
          ================================================= */}

          <section className="toyota-empowering-section">


            <div className="toyota-empowering-image-area">

              <img
                className="toyota-empowering-image"
                src="https://static3.toyotabharat.com/images/toyota-in-india/about/empowering-employees.jpg"
                alt="Empowering Employees"
              />

            </div>


            <div className="toyota-empowering-content">

              <h2 className="toyota-section-heading">
                EMPOWERING EMPLOYEES
              </h2>


              <p>
                Employees are the main source of inspiration and strength
                for a company. We, at Toyota, strive to reflect
                'Continuous Improvement' and 'Respect for People' in all
                our activities. Employee suggestions are taken very
                seriously and implemented to improve the working...
              </p>


              <button
                type="button"
                className="toyota-read-more"
              >
                Read more
              </button>

            </div>

          </section>


        </main>

      </div>

      <div>
        <ToyotaFooter />
      </div>
    </>
  );
}