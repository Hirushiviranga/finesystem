import React from 'react';

export default function Receipt({ fine, payment, onClose }) {
  // Check if fine was overdue
  const wasOverdue = fine.lateFee > 0 || (fine.status === 'pending' && new Date(fine.dueDate) < new Date('2026-06-12'));
  const totalPaid = fine.baseAmount + (wasOverdue ? fine.lateFee || 1500 : 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate a simple text-based receipt download as a fallback/additional feature
    const receiptText = `
==================================================
              SRI LANKA POLICE
        OFFICIAL FINE SETTLEMENT RECEIPT
==================================================
Receipt Number:   ${payment.receiptNumber || fine.receiptNumber}
Payment Date:     ${payment.paidAt || fine.paidAt}
Payment Method:   ${payment.paymentMethod || fine.paymentMethod}
Status:           PAID / CLEARED
--------------------------------------------------
FINE DETAILS:
Reference Number:  ${fine.referenceNumber}
Category Code:     ${fine.categoryCode}
Driver Name:       ${fine.driverName}
License Number:    ${fine.licenseNumber}
Vehicle Number:    ${fine.vehicleNumber}
Violation:         ${fine.violation}
Location:          ${fine.location}
--------------------------------------------------
CHARGES BREAKDOWN:
Base Fine:         LKR ${fine.baseAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Late Penalty Surcharge: LKR ${(wasOverdue ? (fine.lateFee || 1500) : 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
TOTAL PAID:        LKR ${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
==================================================
This is a digitally generated document. The Sri Lanka 
Police traffic database has been updated, and the 
pending fine is officially cleared.
==================================================
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${payment.receiptNumber || fine.receiptNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in" style={{ width: '100%' }}>
      {/* Success Banner */}
      {payment.email && (
        <div className="success-banner">
          <div className="success-icon-circle">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <h4>Fine Settled Successfully</h4>
          <p>
            An official digital receipt has been sent to <strong>{payment.email}</strong>. The Sri Lanka Police database has been updated, and the holds on your license have been removed.
          </p>
        </div>
      )}

      {/* The Receipt Document Card */}
      <div className="receipt-wrapper printable-area">
        {/* Header with police styling */}
        <div className="receipt-header">
          {/* Logo Crest in SVG */}
          <svg className="receipt-crest" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50,5 L 85,20 C 85,60 50,95 50,95 C 50,95 15,60 15,20 Z" fill="#ffffff" opacity="0.1" />
            <circle cx="50" cy="45" r="22" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
            <path d="M 38,40 H 62 M 50,32 V 65 M 38,40 L 44,52 H 32 Z M 62,40 L 68,52 H 56 Z" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 45,65 H 55" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <h2>SRI LANKA POLICE</h2>
          <p>TRAFFIC DEPT FINE RECEIPT</p>
          <div className="receipt-stamp">Paid & Cleared</div>
        </div>

        {/* Receipt Details Body */}
        <div className="receipt-body">
          <div className="receipt-meta">
            <div className="receipt-meta-item">
              <span className="receipt-meta-label">Receipt Number</span>
              <span className="receipt-meta-value">{payment.receiptNumber || fine.receiptNumber}</span>
            </div>
            <div className="receipt-meta-item">
              <span className="receipt-meta-label">Payment Date / Time</span>
              <span className="receipt-meta-value">{payment.paidAt || fine.paidAt}</span>
            </div>
          </div>

          <table className="receipt-table">
            <thead>
              <tr>
                <th>Violation & Reference</th>
                <th className="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{fine.violation}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Ref: {fine.referenceNumber} | Cat: {fine.categoryCode}
                  </div>
                </td>
                <td className="amount">
                  LKR {fine.baseAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
              {wasOverdue && (
                <tr>
                  <td>
                    <div style={{ fontWeight: '600', color: '#0f172a' }}>Statutory Late Penalty</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                      Added surcharge for overdue settlement
                    </div>
                  </td>
                  <td className="amount">
                    LKR {(fine.lateFee || 1500).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Breakdown Rows */}
          <div className="receipt-row">
            <span>Payment Method</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>
              {payment.paymentMethod || fine.paymentMethod || 'Credit/Debit Card'}
            </span>
          </div>
          <div className="receipt-row">
            <span>License Number</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>{fine.licenseNumber}</span>
          </div>
          <div className="receipt-row">
            <span>Vehicle Number</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>{fine.vehicleNumber}</span>
          </div>
          <div className="receipt-row">
            <span>Location of Incident</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>{fine.location}</span>
          </div>

          <div className="receipt-row total">
            <span>Total Cleared</span>
            <span>LKR {totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>

          {/* Signatures & Seal */}
          <div className="receipt-signature-block">
            <div>
              <div className="signature-label">Issuing Officer</div>
              <div style={{ fontFamily: 'monospace', fontSize: '13px', margin: '4px 0', fontWeight: 'bold' }}>
                {fine.officerName}
              </div>
              <div className="signature-label" style={{ fontSize: '9px' }}>Badge: {fine.officerBadge}</div>
            </div>
            <div className="signature-stamp-mock">
              <span className="signature-seal">SL POLICE</span>
              <div className="signature-label" style={{ marginTop: '4px', fontSize: '9px' }}>Automated Clearance Seal</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="receipt-footer">
          Thank you for settling your fine. Drive safely and respect road rules.<br/>
          Sri Lanka Police Traffic Headquarters, Colombo.
        </div>
      </div>

      {/* Outer actions buttons */}
      <div className="receipt-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Settle Another Fine
        </button>
        <button type="button" className="btn-secondary" onClick={handleDownload}>
          Download Text Receipt
        </button>
        <button type="button" className="btn-accent" onClick={handlePrint}>
          Print / Save PDF Receipt
        </button>
      </div>
    </div>
  );
}
