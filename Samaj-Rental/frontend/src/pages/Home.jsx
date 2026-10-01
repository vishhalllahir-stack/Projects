import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import Icon from "../componet/Icon";

function Home() {
  /* ==========================================
     DARK / LIGHT MODE
  ========================================== */

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("samaj-rental-theme") === "dark";
  });

  /* ==========================================
     APPLY THEME
  ========================================== */

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");

      localStorage.setItem("samaj-rental-theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");

      localStorage.setItem("samaj-rental-theme", "light");
    }
  }, [darkMode]);

  /* ==========================================
     TOGGLE THEME
  ========================================== */

  const toggleTheme = () => {
    setDarkMode((previousMode) => !previousMode);
  };

  /* ==========================================
     RENTAL CATEGORIES
  ========================================== */

  const categories = [
    {
      icon: "utensils",
      title: "જમવાના વાસણ",
      description:
        "થાળી, વાટકા, ગ્લાસ, ચમચી, કપ-રકાબી, જગ અને અન્ય જમવાના વાસણ.",
    },

    {
      icon: "package",
      title: "રસોઈના વાસણ",
      description:
        "તપેલા, કડાઈ, તવો, પ્રેશર કુકર, ફ્રાઈ પેન અને રસોઈ માટેના અન્ય વાસણ.",
    },

    {
      icon: "pencil",
      title: "કાપવા-સમારવાના સાધનો",
      description: "ચાકુ, પીલર, છીણી, કટિંગ બોર્ડ, વેલણ અને અન્ય રસોઈના સાધનો.",
    },

    {
      icon: "calculator",
      title: "રસોઈના ચમચા",
      description:
        "દોયા, કલછી, ઝારી, ચીપિયો, વઘારની ચમચી અને અન્ય રસોઈના ચમચા.",
    },

    {
      icon: "sparkles",
      title: "કિચન ઇલેક્ટ્રોનિક્સ",
      description:
        "મિક્સર-ગ્રાઇન્ડર, હેન્ડ બ્લેન્ડર, ઇલેક્ટ્રિક કેટલ, ટોસ્ટર અને અન્ય સાધનો.",
    },

    {
      icon: "package",
      title: "ડબ્બા અને સ્ટોરેજ",
      description:
        "લોટ, ચોખા, દાળ, મસાલા અને અન્ય સામગ્રી માટેના ડબ્બા અને કન્ટેનર.",
    },

    {
      icon: "trash",
      title: "રસોડાની સફાઈ",
      description:
        "સ્ક્રબર, સ્પોન્જ, કિચન ટુવાલ, ડસ્ટબિન, ઝાડુ, પોચો અને અન્ય સફાઈ સામાન.",
    },

    {
      icon: "furniture",
      title: "ઘર માટે વધારાની જરૂરી વસ્તુઓ",
      description:
        "ડાઇનિંગ ટેબલ, ખુરશીઓ, થર્મોસ, સર્વિંગ ટ્રે અને અન્ય જરૂરી વસ્તુઓ.",
    },
  ];

  /* ==========================================
     HOW IT WORKS
  ========================================== */

  const steps = [
    {
      number: "01",
      icon: "user",
      title: "Register / Login",
      description: "તમારું account બનાવો અથવા existing account થી login કરો.",
    },

    {
      number: "02",
      icon: "search",
      title: "Select Items",
      description: "તમારા ઘર અથવા કાર્યક્રમ માટે જરૂરી rental items પસંદ કરો.",
    },

    {
      number: "03",
      icon: "calendar",
      title: "Book Items",
      description: "Quantity તથા booking અને return dates પસંદ કરો.",
    },

    {
      number: "04",
      icon: "bill",
      title: "Get Your Bill",
      description:
        "Booking confirm થયા પછી તમારા નામે complete rental bill મેળવો.",
    },
  ];

  return (
    <div className="home-page">
      {/* ======================================
          HEADER
      ====================================== */}

      <header className="home-header">
        {/* ==================================
            LOGO
        ================================== */}

        <div className="home-logo-area">
          <div className="home-logo-icon">
            <Icon name="home" size={26} />
          </div>

          <div>
            <div className="home-logo-title">Samaj Rental</div>

            <div className="home-logo-subtitle">Community Rental System</div>
          </div>
        </div>

        {/* ==================================
            NAVIGATION
        ================================== */}

        <nav className="home-nav">
          <a href="#home" className="home-nav-link">
            Home
          </a>

          <a href="#categories" className="home-nav-link">
            Categories
          </a>

          <a href="#how-it-works" className="home-nav-link">
            How It Works
          </a>

          <a href="#about" className="home-nav-link">
            About
          </a>
        </nav>

        {/* ==================================
            HEADER BUTTONS
        ================================== */}

        <div className="home-header-buttons">
          {/* ==================================
              DARK / LIGHT MODE
          ================================== */}

          <button
            type="button"
            className="home-theme-toggle"
            onClick={toggleTheme}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            <span className="home-theme-icon">
              <Icon name={darkMode ? "sun" : "moon"} size={17} />
            </span>

            <span className="home-theme-text">
              {darkMode ? "Light" : "Dark"}
            </span>
          </button>

          {/* ==================================
              LOGIN
          ================================== */}

          <Link to="/login" className="home-login-button">
            Login
          </Link>

          {/* ==================================
              REGISTER
          ================================== */}

          <Link to="/register" className="home-register-button">
            Register
          </Link>
        </div>
      </header>

      {/* ======================================
          HERO
      ====================================== */}

      <section id="home" className="home-hero">
        <div className="home-hero-content">
          {/* ==================================
              HERO BADGE
          ================================== */}

          <div className="home-hero-badge">
            <Icon name="home" size={16} />
            Community Rental Service
          </div>

          {/* ==================================
              HERO TITLE
          ================================== */}

          <h1 className="home-hero-title">
            સમાજની વસ્તુઓ હવે
            <br />
            <span className="home-hero-highlight">સરળતાથી Rent કરો</span>
          </h1>

          {/* ==================================
              HERO DESCRIPTION
          ================================== */}

          <p className="home-hero-description">
            તમારા ઘર અને સમાજના કાર્યક્રમો માટે જરૂરી વાસણો, kitchen items અને
            અન્ય જરૂરી વસ્તુઓ એક જ જગ્યાએ શોધો, quantity પસંદ કરો, તારીખ પસંદ
            કરો અને સરળતાથી booking કરો.
          </p>

          {/* ==================================
              HERO BUTTONS
          ================================== */}

          <div className="home-hero-buttons">
            <Link to="/register" className="home-primary-button">
              <Icon name="send" size={17} />
              Start Renting
            </Link>

            <Link to="/login" className="home-secondary-button">
              <Icon name="key" size={17} />
              Login
            </Link>
          </div>

          {/* ==================================
              HERO STATS
          ================================== */}

          <div className="home-hero-stats">
            <div className="home-stat">
              <strong>
                <Icon name="utensils" size={21} />
              </strong>

              <span>Utensils</span>
            </div>

            <div className="home-stat">
              <strong>
                <Icon name="package" size={21} />
              </strong>

              <span>Kitchen Items</span>
            </div>

            <div className="home-stat">
              <strong>
                <Icon name="sparkles" size={21} />
              </strong>

              <span>Electronics</span>
            </div>

            <div className="home-stat">
              <strong>
                <Icon name="bill" size={21} />
              </strong>

              <span>Digital Bill</span>
            </div>
          </div>
        </div>

        {/* ==================================
            HERO VISUAL
        ================================== */}

        <div className="home-hero-visual">
          <div className="home-hero-card">
            <div className="home-hero-card-icon">
              <Icon name="utensils" size={30} />
            </div>

            <h3>Community Items</h3>

            <p>તમારા ઘર માટે જરૂરી વસ્તુઓ સરળતાથી book કરો.</p>

            <div className="home-hero-mini-cards">
              <div className="home-mini-card">
                <Icon name="utensils" size={22} />

                <span>Utensils</span>
              </div>

              <div className="home-mini-card">
                <Icon name="package" size={22} />

                <span>Kitchen</span>
              </div>

              <div className="home-mini-card">
                <Icon name="sparkles" size={22} />

                <span>Electronics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          FEATURES
      ====================================== */}

      <section className="home-features-section">
        <div className="home-section-heading">
          <span className="home-section-badge">WHY USE IT?</span>

          <h2>Community Rental Made Simple</h2>

          <p>
            સમાજની વસ્તુઓને manage અને rent કરવાની સરળ અને transparent system.
          </p>
        </div>

        <div className="home-features-grid">
          {/* ==================================
              FEATURE 1
          ================================== */}

          <div className="home-feature-card">
            <div className="home-feature-icon">
              <Icon name="search" size={30} />
            </div>

            <h3>Easy Selection</h3>

            <p>
              Available rental items સરળતાથી જુઓ અને તમારી જરૂરિયાત મુજબ પસંદ
              કરો.
            </p>
          </div>

          {/* ==================================
              FEATURE 2
          ================================== */}

          <div className="home-feature-card">
            <div className="home-feature-icon">
              <Icon name="calendar" size={30} />
            </div>

            <h3>Date Based Booking</h3>

            <p>
              Booking અને return date પસંદ કરીને availability પ્રમાણે વસ્તુઓ
              book કરો.
            </p>
          </div>

          {/* ==================================
              FEATURE 3
          ================================== */}

          <div className="home-feature-card">
            <div className="home-feature-icon">
              <Icon name="calculator" size={30} />
            </div>

            <h3>Automatic Calculation</h3>

            <p>
              Quantity, rental days અને price પ્રમાણે total amount automatically
              calculate થાય છે.
            </p>
          </div>

          {/* ==================================
              FEATURE 4
          ================================== */}

          <div className="home-feature-card">
            <div className="home-feature-icon">
              <Icon name="bill" size={30} />
            </div>

            <h3>Digital Bill</h3>

            <p>
              Booking confirm થયા પછી તમારા નામે complete bill generate થાય છે.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================
          CATEGORIES
      ====================================== */}

      <section id="categories" className="home-categories-section">
        <div className="home-section-heading">
          <span className="home-section-badge">RENTAL CATEGORIES</span>

          <h2>અમારી પાસે શું શું મળશે?</h2>

          <p>સમાજ દ્વારા ઉપલબ્ધ વિવિધ પ્રકારની rental વસ્તુઓ.</p>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <div key={category.title} className="home-category-card">
              <div className="home-category-icon">
                <Icon name={category.icon} size={30} />
              </div>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <Link to="/items" className="home-category-link">
                View Items →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================
          HOW IT WORKS
      ====================================== */}

      <section id="how-it-works" className="home-process-section">
        <div className="home-section-heading">
          <span className="home-section-badge">SIMPLE PROCESS</span>

          <h2>How It Works?</h2>

          <p>માત્ર ચાર સરળ steps માં તમારી booking complete કરો.</p>
        </div>

        <div className="home-steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="home-step-card">
              <div className="home-step-top">
                <span className="home-step-number">{step.number}</span>

                <span className="home-step-icon">
                  <Icon name={step.icon} size={25} />
                </span>
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================
          ABOUT
      ====================================== */}

      <section id="about" className="home-about-section">
        <div className="home-about-visual">
          <div className="home-about-main-icon">
            <Icon name="home" size={56} />
          </div>

          <div className="home-about-floating-card">
            <strong>Community First</strong>

            <span>સમાજ માટે સરળ અને transparent system</span>
          </div>
        </div>

        <div className="home-about-content">
          <span className="home-section-badge">ABOUT SYSTEM</span>

          <h2>
            સમાજની વસ્તુઓનું
            <br />
            Digital Management
          </h2>

          <p>
            Samaj Rental System નો મુખ્ય હેતુ સમાજની rental વસ્તુઓને centralized
            system દ્વારા manage કરવાનો છે.
          </p>

          <p>
            કોઈપણ ગામનો સમાજનો વ્યક્તિ account બનાવીને available વસ્તુઓ જોઈ શકે
            છે, quantity અને તારીખ પસંદ કરી શકે છે અને booking કરી શકે છે.
          </p>

          <div className="home-about-points">
            <div>✓ Easy Booking</div>

            <div>✓ Quantity Management</div>

            <div>✓ Date-wise Availability</div>

            <div>✓ Digital Billing</div>
          </div>

          <Link to="/register" className="home-primary-button">
            Create Your Account →
          </Link>
        </div>
      </section>

      {/* ======================================
          CTA
      ====================================== */}

      <section className="home-cta-section">
        <div className="home-cta-content">
          <div className="home-cta-icon">
            <Icon name="sparkles" size={36} />
          </div>

          <h2>તમારા આગામી કાર્યક્રમ માટે તૈયાર છો?</h2>

          <p>આજે જ account બનાવો અને સમાજની ઉપલબ્ધ વસ્તુઓની booking શરૂ કરો.</p>

          <Link to="/register" className="home-cta-button">
            <Icon name="send" size={17} />
            Get Started
          </Link>
        </div>
      </section>

      {/* ======================================
          HOME FOOTER
      ====================================== */}

      <footer className="home-footer">
        <div className="home-footer-top">
          <div>
            <div className="home-footer-logo">
              <Icon name="home" size={19} />
              Samaj Rental
            </div>

            <p className="home-footer-description">
              Community Rental & Booking System
            </p>
          </div>

          <div className="home-footer-links">
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </div>
        </div>

        <div className="home-footer-bottom">
          <span>© {new Date().getFullYear()} Samaj Rental System</span>

          <span>Built for Community</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;




