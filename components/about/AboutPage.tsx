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
        End-to-end application developed with Next.js and Tailwind CSS. Includes
        API integration and a documented case study on personal blog.
      </p>
    ),
  },
  {
    title: "Hotel Booking System",
    subtitle: "Vue.js & Vite",
    date: "Project",
    body: (
      <p>
        Solution for stay management built with Vue.js and Vite, optimizing
        business logic and loading speed.
      </p>
    ),
  },
  {
    title: "Custom CMS",
    subtitle: "CodeIgniter & Materialize",
    date: "Project",
    body: (
      <p>
        End-to-end development from Figma design to functional code using
        CodeIgniter and Materialize, allowing for personalized content management.
      </p>
    ),
  },
  {
    title: "Technical Articles (AI)",
    subtitle: "Publications",
    date: "Article",
    body: (
      <p>
        Author of publications on optimizing the development lifecycle through the
        use of AI tools like GitHub Copilot and Gemini.
      </p>
    ),
  },
];

const experience: TimelineItem[] = [
  {
    title: "Santander Tecnología",
    subtitle: "Software Engineer",
    date: "sep 2023 - may 2026",
    body: (
      <>
        <p>
          Developed large-scale features for corporate fund management using React
          and TypeScript (Microfrontends).
        </p>
        <p>
          Ensured observability and infrastructure using OpenShift, Kubernetes,
          Grafana, and Dynatrace.
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
          Contributed to the development and maintenance of the official Tuenti
          app using React, React Native, and TypeScript.
        </p>
        <p>
          Created APIs in Node.js and integrated CI/CD pipelines in
          OpenShift/Kubernetes environments.
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
          Designed and developed the main dashboard for DirecTV&apos;s critical
          fleet management system, using React and Angular.
        </p>
        <p>
          Modernized legacy CSS design and optimized application performance and
          loading speed by 30%.
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
          Developed critical applications and frontend functionalities for
          accounts like Experta Seguros under agile methodologies.
        </p>
        <p>
          Optimized UI/UX for client systems, achieving a 20% improvement in loading
          speed and performance.
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
          Developed internal full-stack applications using PHP, Laravel, and React
          for international accounts like Natura.
        </p>
        <p>
          Managed database migration and frontend improvements, optimizing
          platform efficiency by 25%.
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
          Developed modern interfaces, interactive components with React, and
          responsive layouts.
        </p>
        <p>
          Optimized the agency&apos;s proprietary CMS and built web ecosystems for
          regional marketing campaigns.
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
              I&apos;m a Full Stack Developer with over 10 years of experience building
              scalable, modern web applications.
            </p>
            <p>
              My goal is to combine frontend and backend development with product
              vision to create solid, maintainable solutions, while incorporating
              AI-assisted tools to optimize development processes and productivity.
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
            <h3>Full-Stack Engineer</h3>
            <p>
              I have experience working on financial platforms, CMSs, enterprise
              systems, and high-performance applications.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li>
                    <strong>Birthday:</strong>6 Apr 1993
                  </li>
                  <li>
                    <strong>Website:</strong>
                    {getSiteUrl()}/
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
          I specialize in React, Next.js, Node.js, and Laravel, combining frontend
          and backend development with product vision. I am obsessed with
          building robust, high-performance applications that are useful for
          users, utilizing enterprise environments like Kubernetes, Docker, and
          CI/CD pipelines to help companies achieve their goals.
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
