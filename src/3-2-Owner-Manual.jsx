import { useState } from "react";
import "./3-2-1-Owner-Manual.css";
import { BookOpen } from "lucide-react";

const toyotaModels = {
  "Innova Hycross": [2023, 2024, 2025, 2026],
  "Innova Crysta": [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
  "Fortuner": [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
  "Legender": [2021, 2022, 2023, 2024, 2025, 2026],
  "Urban Cruiser Hyryder": [2022, 2023, 2024, 2025, 2026],
  "Hilux": [2022, 2023, 2024, 2025, 2026],
  "Camry": [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
  "Vellfire": [2020, 2021, 2022, 2023, 2024, 2025, 2026],
  "Glanza": [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
  "Taisor": [2024, 2025, 2026],
  "Rumion": [2023, 2024, 2025, 2026],
  "Urban Cruiser": [2020, 2021, 2022],
  "Yaris": [2018, 2019, 2020, 2021],
  "Etios": [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
  "Etios Liva": [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
  "Corolla Altis": [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
  "Corolla": [2003, 2004, 2005, 2006, 2007, 2008],
  "Qualis": [2000, 2001, 2002, 2003, 2004],
  "Innova": [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
  "Land Cruiser": [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
  "Land Cruiser Prado": [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
  "Prius": [2010, 2011, 2012, 2013, 2014, 2015, 2016],
  "Starlet": [1998, 1999, 2000],
  "MR2": [1995, 1996, 1997, 1998, 1999],
  "Celica": [1998, 1999, 2000, 2001, 2002],
  "Supra": [2021, 2022, 2023, 2024, 2025, 2026]
};

export default function OwnerManual() {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const years = model ? toyotaModels[model] : [];

  const handleSearch = () => {
    if (!model || !year) {
      alert("Please select Model and Year");
      return;
    }

    alert(`Model : ${model}\nYear : ${year}`);
  };

  return (
    <div className="om-wrapper">

      <h1 className="om-title">
        <BookOpen size={38} className="om-title-icon" />
        Owner's Manual
      </h1>

      <p className="om-description">
        Find your vehicle's manual and guide by selecting the model and year
        below. Access important information such as features, maintenance
        schedules and safety instructions.
      </p>

      <div className="om-search-box">

        <div className="om-field">

          <label className="om-label">
            Select a Model
          </label>

          <select
            className="om-select"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              setYear("");
            }}
          >
            <option value="">Select Model*</option>

            {Object.keys(toyotaModels).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

          </select>

        </div>

        <div className="om-field">

          <label className="om-label">
            Select a Year
          </label>

          <select
            className="om-select"
            value={year}
            disabled={!model}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year*</option>

            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

          </select>

        </div>

        <button
          className="om-search-btn"
          onClick={handleSearch}
        >
          SEARCH
        </button>

      </div>

    </div>
  );
}