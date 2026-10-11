import './Support.css';

function Support() {
  return (
    <main className="support-page">
      <h1>Support</h1>

      <section className="support-section" aria-labelledby="policy-heading">
        <h2 id="policy-heading">Refund and Return Policy</h2>
        <p>No refunds after 48 hours.</p>
      </section>

      <section className="support-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <details className="support-faq">
          <summary>Can I get a refund after 48 hours?</summary>
          <p>No. Refunds are not available after 48 hours.</p>
        </details>
      </section>
    </main>
  );
}

export default Support;
