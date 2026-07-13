// Lightweight case metadata — safe to import from the landing page
// without pulling in the heavy CasePreview modal, its Radix dialog,
// Lucide icons, and SVG scenes.

export type CaseId = "case-01" | "case-02" | "case-03" | "case-04";

export type CaseMeta = {
  id: CaseId;
  code: string;
  title: string;
  tag: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
};

export const CASES: CaseMeta[] = [
  {
    id: "case-01",
    code: "CASE 01",
    title: "Phishing Investigation",
    tag: "Email Forensics",
    severity: "CRITICAL",
    description:
      "A finance team receives a spoofed invoice. Trace the headers, isolate the payload, and identify the threat actor.",
  },
  {
    id: "case-02",
    code: "CASE 02",
    title: "Fake Job Scam",
    tag: "Social Engineering",
    severity: "HIGH",
    description:
      "An applicant's offer letter hides a malicious onboarding portal. Reconstruct the scam chain.",
  },
  {
    id: "case-03",
    code: "CASE 03",
    title: "UPI Fraud Attack",
    tag: "Financial Forensics",
    severity: "CRITICAL",
    description:
      "Unauthorized transactions across multiple wallets. Follow the money — and the metadata.",
  },
  {
    id: "case-04",
    code: "CASE 04",
    title: "Identity Theft Investigation",
    tag: "OSINT",
    severity: "HIGH",
    description:
      "Cloned credentials surface on dark forums. Map the breach origin and contain the spread.",
  },
];
