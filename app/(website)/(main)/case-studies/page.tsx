import type { Metadata } from "next";
import CaseStudiesClient from "./_components/CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how XMA has helped businesses build growth systems that generate leads, acquire customers, and scale revenue.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
