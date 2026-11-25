import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ageFromBirthday, getSiteUrl, site } from "@/lib/site";

type TimelineItem = {
  title: string;
  subtitle: string;
  date: string;
  body: ReactNode;
};

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <div className="art-timeline art-gallery">
      <div className="art-section-title">
        <div className="art-title-frame">
          <h4 className="art-title-h">
            <span> {title} </span>
          </h4>
        </div>
      </div>
      {items.map((item) => (
        <div className="art-timeline-item" key={`${item.title}-${item.date}`}>
          <div className="art-timeline-mark-light" />
          <div className="art-timeline-mark" />
          <div className="art-a art-timeline-content">
            <div className="art-card-header">
              <div className="art-left-side">
                <h5>
                  <span> {item.title} </span>
                </h5>
                <div className="art-el-suptitle mb-15">
                  <span> {item.subtitle} </span>
                </div>
              </div>
              <div className="art-right-side">
                <span className="art-date">
                  <span> {item.date} </span>
                </span>
              </div>
            </div>
            <div className="art-el-description">
              <div>{item.body}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const education: TimelineItem[] = [
  {
    title: "Coderhouse",
    subtitle: "AI Engineering",
    date: "2026 — in progress",
    body: (
      <p>
        Building production-minded AI systems: async LLM clients, LangChain, RAG,
        and multi-agent workflows. Coursework is on{" "}
        <a
          href="https://github.com/gervisbermudez/IA-Engeneering"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    ),
  },
  {
    title: "Commit Academy",
    subtitle: "AWS & Cloud Computing",
    date: "2026 — in progress",
    body: (
      <p>
        Designing, deploying, and operating AWS architectures with Terraform,
        Kubernetes, CI/CD, and FinOps. Program:{" "}
        <a
          href="https://www.commitacademy.io/curso-cloud"
          target="_blank"
          rel="noopener noreferrer"
        >
          AWS y Cloud Computing
        </a>
        .
      </p>
    ),
  },
  {
    title: "UNEFA",
    subtitle: "Systems Engineer",
    date: "2009 - 2014",
    body: (
      <p>
        Professional Internships at the National Institute of Channels,
        <br />
        where I developed a maritime traffic monitoring system.
      </p>
    ),
  },
];

const projects: TimelineItem[] = [
  {
    title: "SpaceX Launch Tracker",
    subtitle: "Next.js & Tailwind CSS",
    date: "Project",
    body: (
      <p>
        End-to-end Next.js + Tailwind app around the SpaceX API, with a write-up
        of the tradeoffs on the blog.
      </p>
    ),
  },
  {
    title: "Hotel Booking System",
    subtitle: "Vue.js & Vite",
    date: "Project",
    body: (
      <p>
        Vue.js + Vite booking flow focused on the business rules — availability,
        conflicts, and speed — not just the UI.
      </p>
    ),
  },
  {
    title: "Custom CMS",
    subtitle: "CodeIgniter & Materialize",
    date: "Project",
    body: (
      <p>
        Figma to CodeIgniter + Materialize: a CMS I actually used to manage
        content, not a tutorial clone.
      </p>
    ),
  },
  {
    title: "Technical Articles (AI)",
    subtitle: "Publications",
    date: "Article",
    body: (
      <p>
        Notes on using Copilot, Gemini, and similar tools to speed up the loop
        without outsourcing the thinking.
      </p>
    ),
  },
];

const experience: TimelineItem[] = [
  {
    title: "Dinardi Project",
    subtitle: "Software Engineer",
    date: "jun 2026 - present",
    body: (
      <>
        <p>
          I built the Technical Service module in CRM Tharsa end to end — tickets
          through role-based repair closure — on Next.js 15, React,
          Node.js/Express/TypeScript, and Chakra UI.
        </p>
        <p>
          I designed the inventory architecture and Finnegans ERP integrations
          (Sequelize/MySQL) so stock, branch replenishment, and labor stay in sync
          without disrupting sales or customers.
        </p>
        <p>
          I shipped real-time updates with Socket.IO, logistics integrations (DHL,
          Sindel/Southpost), and a Docker demo environment on AWS EC2.
        </p>
      </>
    ),
  },
  {
    title: "Santander Tecnología",
    subtitle: "Software Engineer",
    date: "sep 2023 - may 2026",
    body: (
      <>
        <p>
          I designed and shipped high-performance Node.js services and APIs in the
          Investment Tribe, keeping latency low under concurrent financial traffic.
        </p>
        <p>
          I led backend work on digital signature and corporate fund redemption —
          TDD, strict validation, and query optimization included, not bolted on.
        </p>
        <p>
          I ran containerization and CI/CD on Docker, OpenShift, and Kubernetes,
          with Grafana and Dynatrace on the backend so we could hold 99.9%
          availability.
        </p>
      </>
    ),
  },
  {
    title: "Tsoft",
    subtitle: "Frontend Web Developer",
    date: "oct 2021 - sep 2023",
    body: (
      <>
        <p>
          I built and maintained the official Tuenti app (Telefónica) with React,
          React Native, and TypeScript.
        </p>
        <p>
          I wrote Node.js APIs and wired CI/CD on OpenShift/Kubernetes, with
          automated tests as the quality bar.
        </p>
      </>
    ),
  },
  {
    title: "Netglobal Solutions S.A.",
    subtitle: "Software Engineer / Frontend",
    date: "jul 2020 - oct 2021",
    body: (
      <>
        <p>
          I designed DirecTV&apos;s fleet-management dashboard from Figma to UI, in
          React, Angular, and TypeScript.
        </p>
        <p>
          I componentized the frontend, replaced the legacy CSS, and cut load time
          by about 30%.
        </p>
      </>
    ),
  },
  {
    title: "Quares IT Solutions",
    subtitle: "Frontend Developer",
    date: "sep 2019 - jul 2020",
    body: (
      <>
        <p>
          I shipped frontend for accounts like Experta Seguros — including
          WordPress/Elementor work — in a tight loop with product.
        </p>
        <p>
          I tightened UI/UX on client systems and picked up a 20% improvement in
          load speed.
        </p>
      </>
    ),
  },
  {
    title: "Xyclon",
    subtitle: "Full Stack Web Developer",
    date: "aug 2018 - sep 2019",
    body: (
      <>
        <p>
          I built internal full-stack apps in PHP, Laravel, and React for
          international accounts such as Natura.
        </p>
        <p>
          I handled database migration and frontend/backend cleanup, reducing
          technical debt and improving platform efficiency by about 25%.
        </p>
      </>
    ),
  },
  {
    title: "WebFindYou LLC",
    subtitle: "Team Leader | Frontend",
    date: "jun 2015 - apr 2018",
    body: (
      <>
        <p>
          I led frontend work: React components, responsive layouts, and the
          agency&apos;s proprietary CMS.
        </p>
        <p>
          I built campaign ecosystems — landing pages, forms, email — with
          performance and SEO as constraints, not afterthoughts.
        </p>
      </>
    ),
  },
];

export function AboutPage() {
  const age = ageFromBirthday();
  return (
    <>
      <div className="container-fluid">
        <div className="row p-30-0">
          <div className="col-lg-12">
            <h2>About</h2>
            <p>
              I&apos;m a senior full-stack engineer with over 10 years designing and
              shipping web applications — high-availability Node.js services, APIs,
              and the React/Next.js interfaces that sit on top.
            </p>
            <p>
              I care about systems that stay maintainable: clean APIs, solid data
              models, and the Docker/Kubernetes/CI/CD layer that keeps them honest.
              AI-assisted workflows are part of how I ship, not a novelty.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="art-links-frame p-15-15 text-center">
          <a
            href="/uploads/Gervis-Bermudez-CV-en.pdf"
            className="art-link"
            target="_blank"
            rel="noreferrer"
          >
            Download my cv <i className="fas fa-download" />
          </a>
          <div className="journey-about-cta">
            <Link href="/journey/" className="art-link art-color-link art-w-chevron">
              Want the photos behind this CV? 📸
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5">
            <Image
              src="/personal-timeline/santander-tecnologia-20230929_113141.jpg"
              alt="Gervis Bermudez at Santander Tecnología"
              width={900}
              height={1200}
              className="about-photo"
            />
          </div>
          <div className="col-lg-7">
            <h3>Senior Full-Stack Engineer</h3>
            <p>
              I&apos;ve shipped financial platforms, CRMs, fleet dashboards, and
              high-traffic marketing sites. The through-line is the same: understand
              the business constraint, then build something that holds up on a
              Tuesday.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li>
                    <strong>Birthday:</strong>6 Apr 1993
                  </li>
                  <li>
                    <strong>Website:</strong> {getSiteUrl()}/
                  </li>
                  <li>
                    <strong>Phone:</strong>+54 11 57614613
                  </li>
                  <li>
                    <strong>City:</strong>Buenos Aires, ARG
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li>
                    <strong>Age:</strong>
                    {age}
                  </li>
                  <li>
                    <strong>Degree:</strong>Engineer
                  </li>
                  <li>
                    <strong>Email:</strong>
                    {site.email}
                  </li>
                  <li>
                    <strong>Freelance:</strong>Available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p>
          I specialize in Node.js, React, and Next.js, with Laravel when the stack
          calls for it. Most of my recent work lives in enterprise environments —
          Kubernetes, OpenShift, Docker, Grafana, Dynatrace, CI/CD — where tests
          and observability ship with the feature, not as a later ticket.
        </p>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <Timeline title="Education" items={education} />
            <Timeline title="Projects & Publications" items={projects} />
          </div>
          <div className="col-lg-6">
            <Timeline title="Professional Experience" items={experience} />
          </div>
        </div>
      </div>
    </>
  );
}
