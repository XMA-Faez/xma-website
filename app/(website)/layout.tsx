import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-slate-50 dark:bg-zinc-950">{children}</main>
      <Footer />
    </>
  );
}
