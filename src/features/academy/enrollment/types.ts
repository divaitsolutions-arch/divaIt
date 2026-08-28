export type ProgramGroup = "career" | "package" | "individual";
export type EnrollmentIntent = "enrollment" | "waitlist";

export interface ProgramOption {
  title: string;
  duration?: string;
  level?: string;
  popular?: boolean;
  price: number;
  availability: EnrollmentIntent;
  group: ProgramGroup;
}

export interface FormState {
  program: string;
  mode: "physical" | "online" | "";
  name: string;
  phone: string;
  email: string;
  district: string;
  hearAbout: string;
  paymentMethod: string;
}
