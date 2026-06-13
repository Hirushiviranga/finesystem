export const mockFines = [
  {
    referenceNumber: "REF-9876-01",
    categoryCode: "CAT-A01",
    driverName: "Hirushi Perera",
    licenseNumber: "B1234567",
    vehicleNumber: "WP CAB-4567",
    violation: "Exceeding Speed Limit (100km/h in a 60km/h Zone)",
    violationDate: "2026-06-08",
    violationTime: "14:35",
    location: "Baseline Road, Colombo 05",
    officerName: "Inspector R. M. Bandara",
    officerBadge: "PS-88452",
    baseAmount: 3000,
    lateFee: 0,
    dueDate: "2026-06-22",
    status: "pending",
  },
  {
    referenceNumber: "REF-5432-02",
    categoryCode: "CAT-B04",
    driverName: "Hirushi Perera",
    licenseNumber: "B1234567",
    vehicleNumber: "WP CAB-4567",
    violation: "Reckless Driving & Overtaking from Left Side",
    violationDate: "2026-05-15",
    violationTime: "08:15",
    location: "Galle Road, Colombo 03",
    officerName: "Sergeant A. H. Silva",
    officerBadge: "PS-74931",
    baseAmount: 5000,
    lateFee: 1500,
    dueDate: "2026-05-29",
    status: "pending", // Overdue based on due date
  },
  {
    referenceNumber: "REF-1111-03",
    categoryCode: "CAT-C12",
    driverName: "Hirushi Perera",
    licenseNumber: "B1234567",
    vehicleNumber: "WP CAB-4567",
    violation: "Driving while Using Mobile Communication Device",
    violationDate: "2026-06-01",
    violationTime: "11:10",
    location: "High Level Road, Nugegoda",
    officerName: "Sub-Inspector K. L. Perera",
    officerBadge: "SI-99214",
    baseAmount: 2000,
    lateFee: 0,
    dueDate: "2026-06-15",
    status: "paid",
    paidAt: "2026-06-05 16:42",
    receiptNumber: "REC-8849-01",
    paymentMethod: "Visa ending in 4242",
  }
];

export const getFine = (refNum, catCode) => {
  return mockFines.find(
    (f) =>
      f.referenceNumber.trim().toUpperCase() === refNum.trim().toUpperCase() &&
      f.categoryCode.trim().toUpperCase() === catCode.trim().toUpperCase()
  );
};
