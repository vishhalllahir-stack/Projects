import ToyotaFooter from "./Footer";

export default function Vision() {
  const sections = [
    {
      title: "Creating Mobility for All",
      image:
        // "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
        "https://static3.toyotabharat.com/images/toyota-in-india/about/toyota-logo-120x100.webp",
      text: `Toyota India will contribute to enrich the quality of life in India and help solve the societal problems by establishing high standards of Safety, Technology, Quality & Corporate Social Responsibility.`,
      reverse: false,
    },
    {
      title: "Committed to India",
      image:
        // "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
        "https://static3.toyotabharat.com/images/toyota-in-india/about/india-map-120x100.webp",
      text: `With a spirit to constantly Learn, Teach, Improve and Innovate, all our stake holders and families will collobrate to help make India a better place.`,
      reverse: true,
    },
    {
      title: "Towards a Sustainable Future",
      image:
        // "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
        "https://static3.toyotabharat.com/images/toyota-in-india/about/ecofriendly-120x100.webp",
      text: `We will strive for excellence in sustainability ensuring we are eco friendly in our products, services and customer experiences.`,
      reverse: false,
    },
  ];

  return (
    <>
      <header className="vision-hero">
        <div className="vision-overlay"></div>
      </header>

      <section className="vision-intro">
        <h2>Our Vision</h2>
        <p>
          We strive to create a future where mobility is safe, sustainable,
          and accessible. Our focus is on delivering value to customers,
          society, and future generations through innovation and quality.
        </p>
      </section>

      {sections.map((item, index) => (
        <section
          key={index}
          className={`vision-section ${
            item.reverse ? "vision-reverse" : ""
          }`}
        >
          <div className="vision-image">
            <img src={item.image} alt={item.title} />
          </div>

          <div className="vision-content">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <button>Learn More</button>
          </div>
        </section>
      ))}

      <div>
        <ToyotaFooter />
      </div>
    </>
  );
}