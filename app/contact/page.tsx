import { ContentFrame } from "@/components/layout/ContentFrame";
import { Footer } from "@/components/layout/Footer";
import { ContactHub } from "@/components/contact/ContactHub";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact – Gervis Bermudez | Portfolio",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <ContentFrame>
      <ContactHub />
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
