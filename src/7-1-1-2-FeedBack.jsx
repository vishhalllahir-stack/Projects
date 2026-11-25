import { useState } from "react";
import "./7-1-1-2-FeedBack.css";
import TwebFooter from "./7-1-Tweb-Footer";

export default function TwebFeedBack() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const err = {};

    if (!form.name.trim())
      err.name = "Please enter your name.";

    if (!form.email.trim()) {
      err.email = "Please enter your email.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      err.email = "Invalid email address.";
    }

    if (!form.mobile.trim()) {
      err.mobile = "Please enter mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      err.mobile = "Invalid mobile number.";
    }

    if (!form.message.trim())
      err.message = "Please enter your feedback.";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    console.log(form);

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
    <div className="toyotaFeedback">

      <div className="feedbackContainer">

        <div className="feedbackTitleArea">

          <h1>Write Us</h1>

          <p>
            Jot us a note and we'll get back to you as quickly as possible.
          </p>

        </div>

        {submitted && (
          <div className="successBox">
            ✔ Thank you! Your feedback has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="inputGroup">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
            />

            {errors.name && (
              <span className="errorText">{errors.name}</span>
            )}

          </div>

          <div className="inputGroup">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="errorText">{errors.email}</span>
            )}

          </div>

          <div className="inputGroup">

            <label>Mobile Number</label>

            <input
              type="tel"
              maxLength={10}
              name="mobile"
              placeholder="Enter mobile number"
              value={form.mobile}
              onChange={handleChange}
            />

            {errors.mobile && (
              <span className="errorText">{errors.mobile}</span>
            )}

          </div>

          <div className="inputGroup">

            <label>What's on your mind?</label>

            <textarea
              rows="7"
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
            />

            {errors.message && (
              <span className="errorText">{errors.message}</span>
            )}

          </div>

          <button className="submitBtn">
            Submit
          </button>

        </form>

      </div>

    </div>

    <div>
        <TwebFooter />
    </div>
    </>
  );
}