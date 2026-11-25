export default function PagePlaceholder({ title, description }) {
  return (
    <div className="page-content">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
