function Insights({ insights }) {
  return (
    <div className="minimal-card">
      <h3 style={{ fontSize: "16px", fontWeight: 900, marginBottom: "16px" }}>
        Financial Summary
      </h3>

      <div className="insights-stats">
        <div className="insights-stat-item">
          <span>Total Spending</span>
          <span>₹{insights.total_spending}</span>
        </div>
        <div className="insights-stat-item">
          <span>Largest Transaction</span>
          <span>₹{insights.largest_transaction}</span>
        </div>
        <div className="insights-stat-item">
          <span>Needs</span>
          <span>{insights.need_transactions}</span>
        </div>
        <div className="insights-stat-item">
          <span>Wants</span>
          <span>{insights.want_transactions}</span>
        </div>
        <div className="insights-stat-item">
          <span>Predicted Next Month</span>
          <span>₹{Math.round(insights.forecast_next_month)}</span>
        </div>
      </div>

      {insights.intelligent_insights && typeof insights.intelligent_insights === "object" && (
        <>
          <hr className="insights-divider" />
          <h3 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.7px", color: "#555" }}>
            AI Analysis
          </h3>
          <div className="insights-ai-block">
            {insights.intelligent_insights.recommendation && (
              <div className="insights-ai-item">
                <strong>Recommendation</strong>
                <p>{insights.intelligent_insights.recommendation}</p>
              </div>
            )}
            {insights.intelligent_insights.anomaly && (
              <div className="insights-ai-item">
                <strong>Anomaly</strong>
                <p>{insights.intelligent_insights.anomaly}</p>
              </div>
            )}
            {insights.intelligent_insights.forecast && (
              <div className="insights-ai-item">
                <strong>Forecast</strong>
                <p>{insights.intelligent_insights.forecast}</p>
              </div>
            )}
          </div>
        </>
      )}

      {typeof insights.intelligent_insights === "string" && (
        <>
          <hr className="insights-divider" />
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", fontSize: "13px", color: "#333" }}>
            {insights.intelligent_insights}
          </p>
        </>
      )}

      <hr className="insights-divider" />
      <ul className="insights-suggestions">
        {insights.want_transactions > insights.need_transactions ? (
          <li>You are spending more on wants than needs.</li>
        ) : (
          <li>Your spending pattern looks balanced.</li>
        )}
        {insights.largest_transaction > 10000 && (
          <li>One unusually large transaction was detected.</li>
        )}
        {insights.forecast_next_month > insights.total_spending && (
          <li>Spending is predicted to increase next month.</li>
        )}
      </ul>
    </div>
  );
}

export default Insights;