"use client";

import Image from "next/image";
import Link from "next/link";
import { ageFromBirthday } from "@/lib/site";
import { SkillBars, CircleProgress } from "@/components/client/SkillBars";
import { useChrome } from "@/components/layout/ChromeProvider";

const knowledge = [
  "Next.js & TailwindCSS",
  "Docker, Kubernetes, OpenShift",
  "CI/CD & Git workflows",
  "GraphQL & REST APIs",
  "Grafana, Dynatrace, SonarQube",
  "Flutter (Mobile)",
  "Agile / Scrum",
];

const hardSkills = [
  { label: "React / Next.js", value: 95 },
  { label: "TypeScript / Node.js", value: 92 },
  { label: "PHP / Laravel", value: 80 },
  { label: "Docker / Kubernetes", value: 75 },
  { label: "MongoDB / Redis", value: 82 },
];

export function Sidebar() {
  const { infoOpen, toggleInfo } = useChrome();
  const age = ageFromBirthday();

  return (
    <div className={`art-info-bar${infoOpen ? " art-active" : ""}`}>
      <div className="art-info-bar-frame">
        <div className="art-info-bar-header">
          <a
            className="art-info-bar-btn"
            href="#sidebar"
            onClick={(event) => {
              event.preventDefault();
              toggleInfo();
            }}
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-ellipsis-v" />
          </a>
        </div>

        <div className="art-header">
          <div className="art-avatar">
            <a
              href="/img/profile.jpg"
              className="art-avatar-curtain"
              data-magnific-image
            >
              <Image
                src="/img/profile-thumb.jpg"
                alt="avatar"
                width={90}
                height={90}
                priority
              />
              <i className="fas fa-expand" />
            </a>
            <div className="art-lamp-light">
              <div
                className="art-available-lamp"
                title="I am available for freelance hire"
              />
            </div>
          </div>
          <h5 className="art-name mb-10">
            <Link href="/">Gervis Bermudez</Link>
          </h5>
          <div className="art-sm-text mb-4">
            Full-Stack Engineer | React, Next.js, Node.js and Digital Product
            Development
          </div>
        </div>

        <div className="art-ls-social">
          <a
            href="https://www.linkedin.com/in/gervisbermudez/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a
            href="https://github.com/gervisbermudez"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github" />
          </a>
          <a href="https://twitter.com/gervisbermudez" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter" />
          </a>
          <a
            href="https://www.instagram.com/gervisbermudez"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram" />
          </a>
        </div>

        <div id="scrollbar2" className="art-scroll-frame">
          <div className="art-links-frame p-15-15 text-center">
            <a href="/uploads/Gervis-Bermudez-CV-en.pdf" className="art-link">
              See my full resume
            </a>
          </div>
          <div className="art-table p-15-15">
            <ul>
              <li>
                <h6>Residence:</h6>
                <span>Argentina</span>
              </li>
              <li>
                <h6>City:</h6>
                <span>Buenos Aires</span>
              </li>
              <li>
                <h6>Age:</h6>
                <span>{age}</span>
              </li>
            </ul>
          </div>

          <ul className="art-knowledge-list p-15-0">
            {knowledge.map((item) => (
              <li key={item}>
                <i className="fas fa-check" />
                {item}
              </li>
            ))}
          </ul>

          <div className="art-ls-divider" />

          <SkillBars skills={hardSkills} />

          <div className="art-ls-divider" />

          <div className="art-lang-skills p-30-15">
            <div className="art-lang-skills-item">
              <CircleProgress value={85} />
              <h6>English (B2+)</h6>
            </div>
          </div>

          <div className="art-ls-divider" />
        </div>
      </div>
    </div>
  );
}
