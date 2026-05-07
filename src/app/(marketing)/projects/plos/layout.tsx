import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLOS | Personal Life Operating System",
  description: "PLOS is Reuben's Personal Life Operating System MVP for turning life-admin messages into prioritized actions, recommendations, approvals, documents, and briefings.",
};

export default function PlosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
