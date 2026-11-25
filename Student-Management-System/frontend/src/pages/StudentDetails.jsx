import { useParams } from "react-router-dom";
import "../index.css";

export default function StudentDetails() {
  const { id } = useParams();

  return (
    <section className="page-shell">
      <h1>Student Details</h1>
      <p>Viewing student with ID: {id}</p>
    </section>
  );
}
