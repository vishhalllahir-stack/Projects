import "./8-8-ToyotaFinance.css";
import ToyotaFooter from "./Footer";

import { useState } from "react";

const financePlans = [
  {
    title: "CLASSIC FINANCE",
    image:
      "https://static3.toyotabharat.com/images/finance/classic-finance.jpg",
    points: [
      "Planned EMI outflow",
      "Fixed installments",
      "Funding up to 7 years",
    ],
  },
  {
    title: "SMART FINANCE",
    image:
      "https://static3.toyotabharat.com/images/finance/smart-finance.jpg",
    points: [
      "Up to 20% lower EMI as compared to CLASSIC FINANCE",
      "Flexible end of term options",
      "Option to extend tenure by 3 years",
    ],
  },
  {
    title: "EASY FINANCE",
    image:
      "https://static3.toyotabharat.com/images/finance/easy-finance.jpg",
    points: [
      "Low initial payments to manage cash flows",
      "Up to 20% increase in EMI every year",
    ],
  },
  {
    title: "FLEXI FINANCE",
    image:
      "https://static3.toyotabharat.com/images/finance/flexi-finance.jpg",
    points: [
      "Low monthly payments",
      "Convenience of bulk payments every year",
    ],
  },
];

const financeBenefits = [
  "On-Road Funding",
  "Car Loan Solution Customized As Per Your Need",
  "Pre-Approved Loan For Insurance, Accessories, Extended Warranty & Maintenance",
  "Pre-Approved Loan Offers For Existing Customers",
  "Financing Of Pre-Owned Cars",
  "Tatkal - Quick Loan Approval Within 30 Mins",
  "Customized Financing For Self-Employed",
  "Car Loan For Commercial Usage",
];

const documentRows = [
  [
    "Signed Application Form",
    1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    "DOB Proof (Passport / UID / Driving License / Pan Card)",
    1, 1, 0, 0, 0, 0, 0, 0,
  ],
  [
    "Identity Proof (Voter ID / UID / Passport / Pan Card)",
    1, 1, 0, 0, 0, 0, 0, 0,
  ],
  [
    "PAN Card",
    1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    "Address Proof",
    1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    "Own House (Electricity Bill & Property Tax Receipt)",
    1, 1, 0, 0, 0, 0, 0, 0,
  ],
  [
    "Signature Verification Proof",
    1, 1, 0, 0, 0, 0, 0, 0,
  ],
  [
    "Bank Statement (3 Months)",
    1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    "ITR including SARAL Copy & Computation of Income (Current & Previous Year)",
    0, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    "Audited Financials (Current & Previous Year)",
    0, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    "Salary Slip / Form 16",
    1, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    "MOA & AOA along with Incorporation Certificate",
    0, 0, 0, 0, 1, 0, 0, 0,
  ],
  [
    "Partnership Deed",
    0, 0, 0, 1, 0, 0, 1, 1,
  ],
  [
    "GST Registration Certificate in name of Firm",
    0, 0, 1, 1, 1, 0, 1, 1,
  ],
  [
    "Firm-Registration Certificate",
    0, 0, 1, 1, 0, 0, 0, 1,
  ],
  [
    "Trust / Society Deed",
    0, 0, 0, 0, 0, 0, 1, 0,
  ],
  [
    "Legal existence of an entity / juridical person",
    0, 0, 0, 0, 0, 1, 1, 1,
  ],
  [
    "Certificate / license issued under Shop and Establishment Act",
    0, 0, 1, 1, 0, 0, 0, 0,
  ],
  [
    "Deed of declaration of HUF / List of coparceners",
    0, 0, 0, 0, 0, 1, 0, 0,
  ],
  [
    "Resolution of the managing body",
    0, 0, 0, 0, 0, 0, 0, 1,
  ],
  [
    "Power of attorney granted to transact on its behalf",
    0, 0, 0, 0, 0, 1, 1, 1,
  ],
  [
    "Officially valid documents of attorney holder",
    0, 0, 0, 0, 0, 1, 1, 1,
  ],
];

function Finance() {
  const [activePlan, setActivePlan] = useState(null);

  const handleApply = (plan) => {
    setActivePlan(plan);
  };

  return (
    <>
    <div className="toyota-finance-page">

      {/* =========================
          TOP FINANCE NAV
      ========================== */}

      <div className="finance-topbar">
        <div className="finance-topbar-inner">

          <div className="finance-brand">
            <div className="finance-brand-mark">
              TOYOTA
            </div>

            <div className="finance-brand-text">
              FINANCIAL SERVICES
            </div>
          </div>

          <nav className="finance-mini-nav">
            <a href="#products">Products</a>
            <a href="#emi">EMI Calculator</a>
            <a href="#budget">Check Your Budget</a>
            <a href="#about">About Us</a>
            <a href="#apply">Apply For Loan</a>
          </nav>

        </div>
      </div>


      {/* =========================
          INTRODUCTION
      ========================== */}

      <section className="finance-intro" id="about">

        <div className="finance-container">

          <div className="finance-intro-content">

            <span className="finance-red-label">
              TOYOTA FINANCIAL SERVICES
            </span>

            <h1>
              Finance that fits
              <br />
              <strong>your needs.</strong>
            </h1>

            <p>
              At Toyota Financial Services, we understand
              that your requirement is unique. We have
              designed a range of products from which you
              choose the one that suits your requirements
              best and drive home your dream Toyota car.
            </p>

            <p>
              Unique finance schemes from Toyota Financial
              Services are based on our core philosophy of
              "customer for life". Transparency, fairness
              and simplicity are our building principles,
              ensuring customer delight and loyalty right
              through the ownership lifecycle.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          BENEFITS
      ========================== */}

      <section className="finance-benefits">

        <div className="finance-container">

          <div className="finance-section-heading">

            <span>
              WHY TOYOTA FINANCE
            </span>

            <h2>
              Financing made simple
            </h2>

          </div>


          <div className="benefit-grid">

            {financeBenefits.map((benefit, index) => (

              <div
                className="benefit-item"
                key={benefit}
              >

                <div className="benefit-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3>{benefit}</h3>
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          FINANCE PRODUCTS
      ========================== */}

      <section
        className="finance-products"
        id="products"
      >

        <div className="finance-container">

          <div className="finance-section-heading">

            <span>
              CHOOSE YOUR FINANCE
            </span>

            <h2>
              Finance options
            </h2>

          </div>


          <div className="finance-product-grid">

            {financePlans.map((plan) => (

              <article
                className="finance-product-card"
                key={plan.title}
              >

                <div className="finance-product-image">

                  <img
                    src={plan.image}
                    alt={plan.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80";
                    }}
                  />

                </div>


                <div className="finance-product-content">

                  <h3>
                    {plan.title}
                  </h3>

                  <ul>

                    {plan.points.map((point) => (

                      <li key={point}>
                        <span>✓</span>
                        {point}
                      </li>

                    ))}

                  </ul>


                  <button
                    className="finance-apply-button"
                    onClick={() => handleApply(plan.title)}
                  >
                    APPLY NOW
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          APPLICATION MODAL
      ========================== */}

      {activePlan && (

        <div
          className="finance-modal-overlay"
          onClick={() => setActivePlan(null)}
        >

          <div
            className="finance-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="finance-modal-close"
              onClick={() => setActivePlan(null)}
            >
              ×
            </button>

            <span>
              TOYOTA FINANCIAL SERVICES
            </span>

            <h2>
              {activePlan}
            </h2>

            <p>
              Continue to the Toyota Financial Services
              loan application to proceed with your
              selected finance option.
            </p>

            <button
              className="finance-modal-apply"
              onClick={() => {
                window.location.href =
                  "https://www.toyotabharat.com/finance/apply-loan/";
              }}
            >
              CONTINUE
            </button>

          </div>

        </div>

      )}


      {/* =========================
          DOCUMENT CHECKLIST
      ========================== */}

      <section className="finance-documents">

        <div className="finance-container">

          <div className="finance-section-heading">

            <span>
              REQUIRED DOCUMENTS
            </span>

            <h2>
              Checklist of Applicant /
              <br />
              Co-applicant / Guarantor
            </h2>

          </div>


          <div className="table-wrapper">

            <table className="finance-document-table">

              <thead>

                <tr>

                  <th>
                    Documents
                  </th>

                  <th>
                    Salaried
                  </th>

                  <th>
                    Self Employed
                  </th>

                  <th>
                    Proprietorship
                  </th>

                  <th>
                    Partnership
                  </th>

                  <th>
                    Pvt Ltd. / Ltd.
                  </th>

                  <th>
                    HUF
                  </th>

                  <th>
                    Trust / Society
                  </th>

                  <th>
                    Association
                  </th>

                </tr>

              </thead>


              <tbody>

                {documentRows.map((row, rowIndex) => (

                  <tr key={rowIndex}>

                    <td>
                      {row[0]}
                    </td>

                    {row.slice(1).map((value, index) => (

                      <td key={index}>

                        {value ? (
                          <span className="table-check">
                            ✓
                          </span>
                        ) : (
                          <span className="table-empty">
                            —
                          </span>
                        )}

                      </td>

                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>


      {/* =========================
          ADDRESS PROOF
      ========================== */}

      <section className="address-proof">

        <div className="finance-container">

          <div className="finance-section-heading">

            <span>
              DOCUMENT CHECKLIST
            </span>

            <h2>
              Document checklist
              <br />
              for address proof
            </h2>

          </div>


          <div className="address-content">

            <h3>
              For Individual Customer
            </h3>

            <h4>
              Residence Address Proof (Current)
            </h4>

            <ul>

              <li>Passport</li>
              <li>Voter ID Card</li>
              <li>Unique Identification (Aadhaar Card)</li>
              <li>Driving License</li>
              <li>NREGA Card</li>
              <li>
                Letter issued by National Population
                Register containing details of Name
                & Address
              </li>

            </ul>


            <div className="address-note">

              <strong>Note:</strong>

              <p>
                Any one of the above mentioned documents
                is mandatory as proof of current address.
                In case the above mentioned documents are
                not updated with current address, the
                following documents shall be deemed to be
                Officially Valid Documents for the limited
                purpose of proof of address.
              </p>

            </div>


            <h3>
              Deemed Officially Valid Document
            </h3>

            <ul>

              <li>
                Utility bill of any service provider
                which is not more than two months old.
              </li>

              <li>
                Property or Municipal tax receipt.
              </li>

              <li>
                Pension or family Pension Payment Orders
                issued to retired employees.
              </li>

              <li>
                Letter of allotment of accommodation
                from eligible employers or institutions.
              </li>

            </ul>


            <div className="address-warning">

              <strong>Important Note</strong>

              <p>
                Documents should be latest and not more
                than 2 months old.
              </p>

            </div>


            <div className="non-individual">

              <h3>
                Address Proof for Non-Individual Customer
              </h3>

              <p>
                Latest telephone bill, Bank Statement
                from a scheduled bank, Electricity Bill,
                Shops and Establishments Certificate.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          LOAN PROCESS
      ========================== */}

      <section className="loan-process">

        <div className="finance-container">

          <div className="finance-section-heading">

            <span>
              SIMPLE & TRANSPARENT
            </span>

            <h2>
              Loan Application Process
            </h2>

          </div>


          <div className="loan-process-image">

            <img
              src="https://static3.toyotabharat.com/images/finance/loan-application-process.jpg"
              alt="Loan Application Process"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85";
              }}
            />

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}

      <section
        className="finance-cta"
        id="apply"
      >

        <div>

          <span>
            READY TO DRIVE HOME YOUR DREAM TOYOTA?
          </span>

          <h2>
            Apply for Toyota Finance
          </h2>

          <p>
            Choose a finance plan that works for you.
          </p>

          <button
            onClick={() => {
              window.location.href =
                "https://www.toyotabharat.com/finance/apply-loan/";
            }}
          >
            APPLY FOR LOAN
          </button>

        </div>

      </section>

    </div>

      <ToyotaFooter />
    </>
  );
}

export default Finance;