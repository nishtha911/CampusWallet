function Insights({ insights }) {

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        margin: "30px 0",
      }}
    >
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

      <h3>Suggestions</h3>

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