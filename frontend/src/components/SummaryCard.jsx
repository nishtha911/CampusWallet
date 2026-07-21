function SummaryCard({ title, value }) {
  return (
    <div className="minimal-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default SummaryCard;
