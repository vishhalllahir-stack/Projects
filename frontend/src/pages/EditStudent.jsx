import { useParams } from "react-router-dom";
import "../index.css";

export default function EditStudent() {
  const { id } = useParams();

  return (
    <section className="page-shell">
      <h1>Edit Student</h1>
      <p>Editing student with ID: {id}</p>
    </section>
  );
}
