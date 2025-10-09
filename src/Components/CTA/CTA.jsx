import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-banner">
      <h2 className="cta-heading">Ready to Invest?</h2>
      <p className="cta-subheading">
        Contact our premium advisory team for personalized consultation and exclusive access to upcoming projects.
      </p>
      <div className="cta-buttons">
        <button className="cta-button primary">Schedule Consultation</button>
        <button className="cta-button secondary">Email Inquiry</button>
      </div>
    </section>
  );
};

export default CTA;