

import { useState } from "react";
import { RefreshCw, Gauge } from "lucide-react";
import "./3-4-0-SafatyRecall.css";
import ToyotaFooter from "./Footer";

function randomCaptcha(len = 5) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function SafatyRecall() {
  const [vin, setVin] = useState("");
  const [vinError, setVinError] = useState("");
  const [captcha, setCaptcha] = useState(() => randomCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // null | { found: boolean, vin: string }

  const newCaptcha = () => {
    setCaptcha(randomCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const handleVinChange = (e) => {
    const cleaned = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "");
    setVin(cleaned);
    setVinError("");
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
    setCaptchaError("");
  };

  const handleSubmit = () => {
    let valid = true;

    if (vin.trim().length < 5) {
      setVinError("Please enter a valid VIN / Frame Number (at least 5 characters).");
      valid = false;
    }

    const entered = captchaInput.trim().toUpperCase();
    if (entered.length === 0) {
      setCaptchaError("Please enter the captcha shown above.");
      valid = false;
    } else if (entered !== captcha) {
      setCaptchaError("Captcha does not match. Please try again.");
      newCaptcha();
      valid = false;
    }

    if (!valid) {
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const lastChar = vin.slice(-1);
      const lastDigit = parseInt(lastChar, 10);
      const found = !isNaN(lastDigit) ? lastDigit % 2 === 1 : vin.length % 2 === 1;
      setResult({ found, vin });
      setLoading(false);
      newCaptcha();
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="recall-page">
      {/* Header */}
      <header className="recall-header">
        <div className="recall-header__logo-row">
          <Gauge className="recall-header__icon" strokeWidth={2.2} />
          <h1 className="recall-header__title">
            Recall, Special Service
            <br />
            &amp; Other Campaigns
          </h1>
        </div>
        <p className="recall-header__subtitle">
          Get the information of current running 'Recall, Special Service &amp; Other Campaigns'
        </p>
      </header>

      {/* Main card */}
      <main className="recall-main">
        <div className="recall-card">
          <p className="recall-intro">
            If you would like to find out if your vehicle is affected by a Recall or Special
            Service campaign, please enter your Vehicle Identification Number:
          </p>

          <div className="recall-field-label">
            <span className="recall-field-label__bar" />
            <span className="recall-field-label__text">
              Vehicle Identification Number (VIN) / Frame Number
            </span>
          </div>

          <input
            type="text"
            value={vin}
            onChange={handleVinChange}
            onKeyDown={handleKeyDown}
            maxLength={17}
            placeholder="ENTER VIN / FRAME NUMBER"
            className={`recall-input recall-input--vin ${vinError ? "recall-input--error" : ""}`}
          />
          <div className="recall-error-msg">{vinError}</div>

          <div className="recall-captcha-row">
            <div className="recall-captcha-box">
              <span
                onClick={newCaptcha}
                title="Click to refresh"
                className="recall-captcha-visual"
              >
                {captcha}
              </span>
              <RefreshCw
                onClick={newCaptcha}
                title="Refresh captcha"
                className="recall-refresh-icon"
              />
            </div>

            <input
              type="text"
              value={captchaInput}
              onChange={handleCaptchaChange}
              onKeyDown={handleKeyDown}
              maxLength={6}
              placeholder="ENTER CAPTCHA"
              className={`recall-input recall-input--captcha ${
                captchaError ? "recall-input--error" : ""
              }`}
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="recall-submit-btn"
            >
              {loading && <span className="recall-spinner" />}
              {loading ? "SEARCHING..." : "SUBMIT"}
            </button>
          </div>
          <div className="recall-error-msg">{captchaError}</div>

          <hr className="recall-divider" />

          {result && (
            <div className="recall-result">
              {result.found ? (
                <div className="recall-result--found">
                  <strong>Open Campaign Found</strong>
                  VIN <strong>{result.vin}</strong> has 1 open Recall/Special Service campaign on
                  record. Please contact your nearest authorized dealer to schedule a free
                  inspection and repair.
                  <br />
                  <br />
                  <em>
                    Campaign ref: DEMO-{result.vin.slice(-4)} — this is sample data for
                    demonstration purposes.
                  </em>
                </div>
              ) : (
                <div className="recall-result--ok">
                  <strong>No Open Campaigns</strong>
                  VIN <strong>{result.vin}</strong> currently has no open Recall, Special Service,
                  or Other Campaigns on record.
                  <br />
                  <br />
                  <em>This is sample data for demonstration purposes.</em>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <div>
        <ToyotaFooter />    
      </div>
    </div>
  );
}

