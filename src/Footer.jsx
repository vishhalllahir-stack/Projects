import './APP.css'
import {
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  ChevronUp,
} from "lucide-react";

const topLinks = ["Contact Us", "Search", "Announcement", "Legal Notice", "Help", "Site Map"];

const topSections = ["Price List", "Ebook", "Find A Dealer", "Test Drive", "Brochure", "Exchange"];

const quickLinks = ["About Us", "Feedback/Queries"];
const moreLinks = ["Health & Safety Policy", "Start Your Impossible"];

const mediaLinks = [
  "Press Release",
  "Articles/Reviews",
  "Spokespersons Images",
  "Customer Stories",
  "Awards",
  "Dream Car Contest"
];

const badges = ["TRUST", "GENUINE PARTS", "FINANCIAL SERVICES", "GLOBAL WEBSITE"];

export default function ToyotaFooter() {
  return (
    <footer
      style={{
        background: "#2b2b2b",
        color: "#e5e5e5",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderTop: "4px solid #eb0a1e"
      }}
    >
      {/* Top utility bar */}
      <div className='topLinks'
        style={{
          maxWidth: "20000px",
          margin: "0 auto",
          padding: "22px 40px 18px",
          display: "flex",
          gap: "36px",
          flexWrap: "wrap",
          fontSize: "13px",
          letterSpacing: "0.5px",
          borderBottom: "1px solid #4a4a4a"
        }}
      >
        {topLinks.map((link) => (
          <a
            key={link}
            href="#"
            style={{ color: "#e5e5e5", textDecoration: "none", textTransform: "uppercase" }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Main columns */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "32px"
        }}
      >
        {/* Left group: 4 columns */}
        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" , cursor:"pointer"}}>
          {/* Top Sections */}
          <div>
            <h4 style={heading}>Top Sections</h4>
            <ul style={list}>
              {topSections.map((item) => (
                <li key={item} style={listItem}>
                  <a href="#" style={linkStyle}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={heading}>Quick Links</h4>
            <ul style={list}>
              {quickLinks.map((item) => (
                <li key={item} style={listItem}>
                  <a href="#" style={linkStyle}>{item}</a>
                </li>
              ))}
            </ul>
            <h4 style={{ ...heading, marginTop: "20px", cursor:"pointer" }}>More</h4>
            <ul style={list}>
              {moreLinks.map((item) => (
                <li key={item} style={listItem}>
                  <a href="#" style={linkStyle}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Media */}
          <div>
            <h4 style={heading}>Media</h4>
            <ul style={list}>
              {mediaLinks.map((item) => (
                <li key={item} style={listItem}>
                  <a href="#" style={linkStyle}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Toyota */}
          <div style={{ position: "relative" }}>
            <h4 style={heading}>Follow Toyota</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "4px", cursor:"pointer"}}>
              {/* Translate widget */}
              <div
                style={{
                  background: "#1f1f1f",
                  border: "1px solid #4a4a4a",
                  borderRadius: "6px",
                  width: "84px",
                  height: "84px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  cursor: "pointer"
                }}
              >
                <div style={{ position: "relative" }}>
                  <span style={{ fontSize: "13px", fontWeight: "bold", letterSpacing: "0.5px" }}>abc</span>
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      fontSize: "10px",
                      color: "#999",
                      cursor:"pointer"
                    }}
                  >
                    X
                  </span>
                </div>
                <ChevronUp size={18} color="#e5e5e5" className="ChevronUp"/>
              </div>

              <a href="#" aria-label="Facebook" style={socialIcon}>
  <FacebookIcon className="FaceBook" size={20} />
</a>

<a href="#" aria-label="YouTube" className='Youtube' style={socialIcon}>
  <YoutubeIcon size={22} />
</a>

<a href="#" aria-label="Instagram" className='Instagram' style={socialIcon}>
  <InstagramIcon size={20} />
</a>

            </div>
          </div>
        </div>

        {/* Right: Logo + copyright + badges */}
        <div style={{ textAlign: "right", minWidth: "260px" }}>
          <div style={{ fontSize: "34px", fontWeight: "bold", letterSpacing: "2px", color: "#fff" }}>
            TOYOTA
          </div>
          <p style={{ fontSize: "12px", color: "#a0a0a0", marginTop: "14px", lineHeight: "1.5" }}>
            © 2000-2026 Toyota Kirloskar Motor. All Rights Reserved.
          </p>

          <div style={{ display: "flex", gap: "8px", marginTop: "20px", justifyContent: "flex-end", flexWrap: "wrap" }}>
            {badges.map((label) => (
              <div
                key={label}
                style={{
                  background: "#fff",
                  borderRadius: "3px",
                  padding: "5px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                  , cursor:"pointer"
                }}
              >
                <span style={{ fontSize: "9px", fontWeight: "bold", color: "#111" }}>TOYOTA</span>
                <span style={{ fontSize: "9px", fontWeight: "bold", color: "#eb0a1e" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const heading = {
  fontSize: "13px",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  color: "#fff",
  margin: "0 0 12px 0"
};

const list = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const listItem = {
  fontSize: "13px"
};

const linkStyle = {
  color: "#c9c9c9",
  textDecoration: "none",
  textTransform: "uppercase",
  letterSpacing: "0.3px"
};

const socialIcon = {
  color: "#e5e5e5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

