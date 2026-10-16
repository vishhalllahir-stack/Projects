
import ToyotaFooter from "./Footer";

export default function Toyota_In_India() {
  return (
    <>
    
          <section className="aboutHero">
            <img src="https://static3.toyotabharat.com/images/toyota-in-india/about/about-images/about-us-spotlight-hero-img-1206x350.webp" alt="" />
    
            <div className="heroOverlay"></div>
    
            <div className="heroTitle">
              <h1>TOYOTA</h1>
              <h2>ADVANTAGE</h2>
            </div>
          </section>
    
    ----------------------------------------------------------------------------------------------------------------------------------------------
    
    
    
          <section className="aboutCEO">
          <div className="aboutCEOContainer">
    
            <div className="aboutCEOLeft">
    
              <div className="aboutCEOImageBox">
                <div className="aboutCEORed"></div>
    
                <img
                  src="https://static3.toyotabharat.com/images/toyota-in-india/about/about-images/masakazu-yoshimura-380x400.webp"
                />
              </div>
    
              <h2>Mr. Example Name</h2>
    
              <p className="aboutCEODesignation">
                Managing Director &amp; Chief Executive Officer
              </p>
    
              <p className="aboutCEOCompany">
                Example Automotive India
              </p>
    
              <div className="aboutCEOThumbs">
                <div className="thumb active">
                  <img src="https://static3.toyotabharat.com/images/toyota-in-india/about/about-images/masakazu-yoshimura-380x400.webp" alt="" />
                  <span>Managing Director</span>
                </div>
    
                <div className="thumb">
                  <img src="https://static3.toyotabharat.com/images/toyota-in-india/about/about-images/vikram-s-kirloskar-380x400.webp" alt="" />
                  <span>Founder</span>
                </div>
              </div>
    
            </div>
    
            <div className="aboutCEORight">
    
              <h1>QUALITY YOU CAN TRUST</h1>
    
              <p>
                Our organization follows a philosophy of continuous improvement,
                customer focus, and innovation to deliver reliable products and
                services.
              </p>
    
              <p>
                We strive to maintain high quality standards while adapting to local
                customer expectations and industry requirements.
              </p>
    
              <p>
                Every decision is driven by the goal of improving customer
                satisfaction through dependable engineering, quality, and service.
              </p>
    
              <p>
                Sustainable growth, responsible manufacturing, and respect for
                people remain the foundation of our long-term vision.
              </p>
    
            </div>
    
          </div>
        </section>
    
    ----------------------------------------------------------------------------------------------------------------------------------------------
    
    
    
        <section className="employeesSection">
    
          {/* Row 1 */}
          <div className="employeeRow">
            <div className="employeeContent">
              <h2>OUR MOST VALUABLE ASSET - OUR EMPLOYEES</h2>
    
              <p>
                At Toyota, the philosophy of Mutual Trust and Respect is at the
                core. Our employees are vital and inevitably the most valuable
                asset. We aim to provide a stable employment and world-class
                working conditions balanced with the progress of the company....
              </p>
    
              <a href="/" className="readMore">
                Read more
              </a>
            </div>
    
            <div className="employeeImageBox">
              <div className="bgBox"></div>
    
              <img
                src="https://static3.toyotabharat.com/images/toyota-in-india/about/about-images/employees-hero-img-530x310.webp"
                alt=""
              />
            </div>
          </div>
    
          {/* Row 2 */}
    
          <div className="employeeRow reverse">
    
            <div className="employeeImageBox">
              <div className="bgBox"></div>
    
              <img
                src="https://static3.toyotabharat.com/images/toyota-in-india/about/about-images/empower-employees-hero-img-530x310.webp"
                alt=""
              />
            </div>
    
            <div className="employeeContent">
              <h2>EMPOWERING EMPLOYEES</h2>
    
              <p>
                Employees are the main source of inspiration and strength for a
                company. We, at Toyota, strive to reflect 'Continuous Improvement'
                and 'Respect for People' in all our activities. Employee
                suggestions are taken very seriously and implemented to improve the
                working....
              </p>
    
              <a href="/" className="readMore">
                Read more
              </a>
            </div>
    
          </div>
        </section>
    
    {/* ---------------------------------------------------------------------------------     */}
    
    <div>
        <ToyotaFooter />
    </div>
    
    </>
  );
}
