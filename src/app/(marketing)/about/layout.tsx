import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Reuben | Our Story",
  description: "Learn how Reuben connects Reux, Business Simulator, and PLOS into one data-aware product ecosystem.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
