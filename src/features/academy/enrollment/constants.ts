

export const DISTRICTS = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Chitwan",
  "Biratnagar",
  "Butwal",
  "Dharan",
  "Birgunj",
  "Hetauda",
  "Nepalgunj",
  "Itahari",
  "Janakpur",
  "Dhangadhi",
  "Other",
];

export const HEAR_ABOUT_OPTIONS = [
  "Facebook",
  "Instagram",
  "YouTube",
  "Google Search",
  "TikTok",
  "Friend / Family",
  "Other",
];

export const PAYMENT_METHODS = [
  { id: "esewa", label: "eSewa", subtitle: "Scan & pay now", icon: "Wallet" },
  { id: "pay-later", label: "Pay at Institute", subtitle: "Cash, no payment now", icon: "Banknote" },
] as const;

export const ESEWA_QR_IMAGE_SRC = "/academy/esewa-qr.png";

export const STEPS = [
  { id: 1, label: "Program & Mode" },
  { id: 2, label: "Your Details" },
  { id: 3, label: "Confirm & Submit" },
] as const;
