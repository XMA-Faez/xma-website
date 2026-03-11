import type { Metadata } from "next";
import ApplicationFormClient from "./_components/ApplicationFormClient";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Submit your application to work with XMA. We review each application to ensure alignment and partnership fit.",
};

export default function ApplyPage() {
  return <ApplicationFormClient />;
}
