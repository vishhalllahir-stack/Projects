import { useEffect, useState } from "react";
import axios from "axios";
import Itemcard from "../componet/Itemcard";
import "./Items.css"
function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/items"
      );

      setItems(response.data);
    } catch (err) {
      console.error(err);
      setError("Rental items load કરવામાં error આવ્યો.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="rental-items-page">

      {/* Header */}
      <section className="rental-items-header">
        <div>
          <span className="rental-items-small-title">
            SAMAJ RENTAL
          </span>

          <h1>Rental Items</h1>

          <p>
            સમાજની જરૂરી વસ્તુઓ હવે સરળતાથી ભાડે લો.
          </p>
        </div>

        <div className="rental-items-count">
          <strong>{items.length}</strong>
          <span>Available Items</span>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rental-items-error">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rental-items-loading">
          <div className="rental-loading-spinner"></div>
          <p>Items loading...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="rental-items-empty">
          <h2>કોઈ rental item મળ્યો નથી</h2>
          <p>હાલમાં કોઈ વસ્તુ ઉપલબ્ધ નથી.</p>
        </div>
      ) : (
        <section className="rental-items-grid">
          {items.map((item) => (
            <Itemcard
              key={item._id}
              item={item}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Items;