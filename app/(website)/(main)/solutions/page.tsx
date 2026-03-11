import type { Metadata } from "next";
import SolutionsPageClient from "./_components/SolutionsPageClient";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "XMA offers structured growth solutions designed to help companies generate leads, convert customers, and scale revenue.",
};

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
