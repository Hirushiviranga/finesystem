import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FineSearch from './components/FineSearch';
import FineDetails from './components/FineDetails';
import PaymentPortal from './components/PaymentPortal';
import Receipt from './components/Receipt';
import './App.css';

function App() {
  const [step, setStep] = useState('search'); // 'search' | 'details' | 'payment' | 'receipt'
  const [activeFine, setActiveFine] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [payAmount, setPayAmount] = useState(0);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme class on load
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle fine retrieval from search
  const handleFineFound = (fine) => {
    setActiveFine(fine);
    setStep('details');
  };

  // Proceed to payment form
  const handleProceedToPayment = (amount) => {
    setPayAmount(amount);
    setStep('payment');
  };

  // Handle successful mock payment
  const handlePaymentSuccess = (transactionData) => {
    // Update local copy of active fine to be 'paid' and append receipt info
    const updatedFine = {
      ...activeFine,
      status: 'paid',
      ...transactionData
    };
    
    // In a real database we would persist this, we update active state here
    setActiveFine(updatedFine);
    setPaymentInfo(transactionData);
    setStep('receipt');
  };

  // Back to search screen
  const handleReset = () => {
    setStep('search');
    setActiveFine(null);
    setPaymentInfo(null);
    setPayAmount(0);
  };

  // View receipt for an already paid fine
  const handleViewPaidReceipt = () => {
    setPaymentInfo({
      receiptNumber: activeFine.receiptNumber,
      paidAt: activeFine.paidAt,
      paymentMethod: activeFine.paymentMethod,
      email: "" // Already paid previously
    });
    setStep('receipt');
  };

  // Determine current active step node for visual progress indicator
  const getStepClass = (nodeStep) => {
    const stepOrder = ['search', 'details', 'payment', 'receipt'];
    const currentIndex = stepOrder.indexOf(step);
    const nodeIndex = stepOrder.indexOf(nodeStep);

    if (currentIndex > nodeIndex) return 'step-node completed';
    if (currentIndex === nodeIndex) return 'step-node active';
    return 'step-node';
  };

  return (
    <div className="app-container">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="main-content">
        {/* Step Progress Bar */}
        <div className="steps-indicator">
          <div className={getStepClass('search')}>
            <div className="step-circle">1</div>
            <span className="step-label">Retrieve Ticket</span>
          </div>
          <div className={getStepClass('details')}>
            <div className="step-circle">2</div>
            <span className="step-label">Fine Details</span>
          </div>
          <div className={getStepClass('payment')}>
            <div className="step-circle">3</div>
            <span className="step-label">Settle Fine</span>
          </div>
          <div className={getStepClass('receipt')}>
            <div className="step-circle">4</div>
            <span className="step-label">Receipt</span>
          </div>
        </div>

        {/* Dynamic Views */}
        {step === 'search' && (
          <FineSearch onFineFound={handleFineFound} />
        )}

        {step === 'details' && activeFine && (
          <FineDetails
            fine={activeFine}
            onProceed={handleProceedToPayment}
            onBack={handleReset}
            onViewReceipt={handleViewPaidReceipt}
          />
        )}

        {step === 'payment' && activeFine && (
          <PaymentPortal
            amount={payAmount}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => setStep('details')}
          />
        )}

        {step === 'receipt' && activeFine && paymentInfo && (
          <Receipt
            fine={activeFine}
            payment={paymentInfo}
            onClose={handleReset}
          />
        )}

        {/* FAQ Section: Only shown on Home/Search page to populate layout nicely */}
        {step === 'search' && (
          <section className="faq-section animate-fade-in" style={{ marginTop: '20px' }}>
            <h3 className="faq-title">Frequently Asked Questions</h3>
            <div className="faq-grid">
              <div className="faq-item">
                <h4 className="faq-question">How long do I have to settle a traffic fine ticket?</h4>
                <p className="faq-answer">
                  According to Sri Lankan Motor Traffic regulations, you must settle a pending fine within 14 days of issue. Failure to pay within 14 days will attract a statutory late fee surcharge. If unpaid after 28 days, legal court proceedings may be initiated.
                </p>
              </div>
              <div className="faq-item">
                <h4 className="faq-question">What payment methods are supported on this portal?</h4>
                <p className="faq-answer">
                  This portal supports all major credit, debit, and prepaid cards issued by local and international banks, including Visa, Mastercard, and American Express. All payments are processed through secure 256-bit SSL encrypted channels.
                </p>
              </div>
              <div className="faq-item">
                <h4 className="faq-question">Will my police record be updated immediately?</h4>
                <p className="faq-answer">
                  Yes. This is the official digital integration portal. As soon as you receive your "Paid & Cleared" digital receipt on screen, our database is updated in real-time. Any automated license holds or vehicle flags will be lifted immediately.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Sri Lanka Police Department. All Rights Reserved.</p>
        <div style={{ marginTop: '8px' }}>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support & Help Desk</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
