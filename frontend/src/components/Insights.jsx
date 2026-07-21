function Insights({ insights }) {
  return (
    <div className="minimal-card">
      <h2>AI Financial Insights</h2>

      <p>
        <strong>Total Spending:</strong>
        ₹{insights.total_spending}
      </p>

      <p>
        <strong>Largest Transaction:</strong>
        ₹{insights.largest_transaction}
      </p>

      <p>
        <strong>Needs:</strong>
        {insights.need_transactions}
      </p>

      <p>
        <strong>Wants:</strong>
        {insights.want_transactions}
      </p>

      <p>
        <strong>Predicted Next Month:</strong>
        ₹{Math.round(insights.forecast_next_month)}
      </p>

      <hr />

      <h3>Intelligent Finance Insights</h3>
      
      <div>
        {insights.intelligent_insights && typeof insights.intelligent_insights === "object" ? (
          <ul>
            <li style={{ marginBottom: "10px" }}>
              <strong>Spending Recommendation:</strong> {insights.intelligent_insights.recommendation}
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Anomaly Observation:</strong> {insights.intelligent_insights.anomaly}
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Forecast Reasoning:</strong> {insights.intelligent_insights.forecast}
            </li>
          </ul>
        ) : (
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
            {typeof insights.intelligent_insights === "string" ? insights.intelligent_insights : "Loading insights..."}
          </p>
        )}
      </div>

      <hr />

      <h3>Basic Suggestions</h3>

      <ul>

        {insights.want_transactions >
        insights.need_transactions ? (
          <li>
            You are spending more on wants than
            needs.
          </li>
        ) : (
          <li>
            Your spending pattern looks balanced.
          </li>
        )}

        {insights.largest_transaction > 10000 && (
          <li>
            One unusually large transaction was
            detected.
          </li>
        )}

        {insights.forecast_next_month >
          insights.total_spending && (
          <li>
            Spending is predicted to increase next
            month.
          </li>
        )}

      </ul>

    </div>
  );

}

export default Insights;