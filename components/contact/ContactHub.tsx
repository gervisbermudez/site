import { site } from "@/lib/site";

const cards = [
  {
    id: "whatsapp",
    href: site.whatsapp,
    icon: "fab fa-whatsapp",
    platform: "WhatsApp",
    copy: "Direct chat — reply within 2 hours or less",
    label: "Contact via WhatsApp",
    external: true,
  },
  {
    id: "calendly",
    href: site.calendly,
    icon: "fas fa-calendar-alt",
    platform: "Schedule a Call",
    copy: "Book a 15-minute technical chat",
    label: "Schedule a call via Calendly",
    external: true,
  },
  {
    id: "linkedin",
    href: site.linkedin,
    icon: "fab fa-linkedin",
    platform: "LinkedIn",
    copy: "Connect professionally & explore my career history",
    label: "Visit LinkedIn profile",
    external: true,
  },
  {
    id: "github",
    href: `https://github.com/${site.github}`,
    icon: "fab fa-github",
    platform: "GitHub",
    copy: "See my code in action",
    label: "Visit GitHub profile",
    external: true,
  },
  {
    id: "email",
    href: `mailto:${site.email}`,
    icon: "fas fa-envelope",
    platform: "Email",
    copy: site.email,
    label: "Send an email",
    external: false,
  },
  {
    id: "phone",
    href: site.phoneHref,
    icon: "fas fa-phone",
    platform: "Phone",
    copy: site.phone,
    label: "Call by phone",
    external: false,
  },
];

export function ContactHub() {
  return (
    <>
      <div className="container-fluid">
        <div className="row p-30-0">
          <div className="col-lg-12">
            <div className="art-section-title">
              <div className="art-title-frame">
                <h1>Let&apos;s Talk About Your Next Project</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="art-a art-card">
              <div className="contact-hub-intro">
                <p className="contact-hub-lead">
                  I&apos;m available for freelance projects, technical consulting, and
                  collaborations. Choose the channel that works best for you —
                  I&apos;ll get back to you quickly.
                </p>
              </div>
              <div className="contact-hub-grid">
                {cards.map((card) => (
                  <a
                    id={`contact-${card.id}`}
                    key={card.id}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className={`contact-hub-card contact-hub-card--${card.id}`}
                    aria-label={card.label}
                  >
                    <div className="contact-hub-card__icon-wrap">
                      <i className={card.icon} aria-hidden="true" />
                    </div>
                    <div className="contact-hub-card__body">
                      <span className="contact-hub-card__platform">{card.platform}</span>
                      <span className="contact-hub-card__copy">{card.copy}</span>
                    </div>
                    <div className="contact-hub-card__arrow">
                      <i className="fas fa-arrow-right" aria-hidden="true" />
                    </div>
                  </a>
                ))}
              </div>
              <div className="contact-hub-footer">
                <span className="contact-hub-availability">
                  <span className="contact-hub-dot" aria-hidden="true" />
                  Available for new projects &mdash; Buenos Aires, Argentina
                  &nbsp;&bull;&nbsp;
                  <a href={`mailto:${site.email}`} className="contact-hub-email">
                    {site.email}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
