export type Kind = "parent" | "society" | "coach";

export type Enquiry = {
  kind: Kind;
  name: string;
  email: string;
  phone: string;
  society: string;
  area: string;
  child_age: string;
  flats: string;
  experience: string;
  message: string;
};

export const KIND_LABEL: Record<Kind, string> = {
  parent: "Parent",
  society: "Society committee",
  coach: "Coach / lifeguard",
};

/** The fields each kind of enquiry shows, in order, for emails. */
export const DETAIL_ROWS: [keyof Enquiry, string][] = [
  ["kind", "Type"],
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["society", "Society"],
  ["area", "Area"],
  ["child_age", "Child's age"],
  ["flats", "Flats in society"],
  ["experience", "Experience"],
  ["message", "Message"],
];
