const interests = [
  {
    key: "ai",
    icon: "fas fa-robot",
    kicker: "Current focus",
    title: "AI Engineering",
    body: "I'm taking Coderhouse's AI Engineering program — async LLM clients, LangChain, RAG, and agents — and I already keep Copilot and Gemini in the daily loop.",
    tags: ["Coderhouse", "LangChain", "RAG"],
    href: "https://github.com/gervisbermudez/IA-Engeneering",
    linkLabel: "Coursework on GitHub",
  },
  {
    key: "cloud",
    icon: "fas fa-cloud",
    kicker: "In progress",
    title: "Cloud & DevOps",
    body: "I'm studying AWS and Cloud Computing at Commit Academy — EC2, Terraform, Kubernetes, and production architecture on a real AWS account.",
    tags: ["AWS", "Terraform", "Kubernetes"],
    href: "https://www.commitacademy.io/curso-cloud",
    linkLabel: "Commit Academy course",
  },
  {
    key: "web",
    icon: "fas fa-code",
    title: "Web & Mobile",
    body: "Full-stack with React, Next.js, Node, and Laravel — and Flutter / React Native so the same idea holds up on a phone.",
    tags: ["React", "Next.js", "Flutter"],
  },
  {
    key: "design",
    icon: "fas fa-pencil-alt",
    title: "Design & Prototyping",
    body: "I research how people use a product, then sketch and throw away versions until the interface feels obvious instead of clever.",
    tags: ["UI/UX", "Figma", "Prototypes"],
  },
  {
    key: "product",
    icon: "fas fa-chart-line",
    title: "Product & Data",
    body: "I sit with the customer problem and the numbers behind it — what to ship, what to skip, and which signals say it worked.",
    tags: ["Strategy", "Metrics", "Tradeoffs"],
  },
];

export function Interests() {
  return (
    <div className="container-fluid home-interests">
      <div className="row">
        <div className="col-lg-12">
          <div className="art-section-title">
            <div className="art-title-frame">
              <h4 className="art-title-h">
                <span> Interests </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="home-interests__grid">
        {interests.map((item) => (
          <div
            className={`art-a art-service-icon-box home-interest-card home-interest-card--${item.key}`}
            key={item.key}
          >
            <div className="home-interest-card__icon" aria-hidden="true">
              <i className={item.icon} />
            </div>
            <div className="art-service-ib-content home-interest-card__body">
              {item.kicker ? (
                <span className="home-interest-card__kicker">{item.kicker}</span>
              ) : null}
              <h5>
                <span> {item.title} </span>
              </h5>
              <p>{item.body}</p>
              <div className="home-interest-card__tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {item.href ? (
                <a
                  className="art-link art-color-link home-interest-card__link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.linkLabel}
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
