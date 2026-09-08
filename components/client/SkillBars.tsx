"use client";

export function SkillBars({
  skills,
}: {
  skills: Array<{ label: string; value: number }>;
}) {
  return (
    <div className="art-hard-skills p-30-15">
      {skills.map((skill) => (
        <div className="art-hard-skills-item" key={skill.label}>
          <div className="art-skill-heading">
            <h6>{skill.label}</h6>
          </div>
          <div className="art-line-progress">
            <div
              className="art-skills-progress"
              data-type="progress"
              data-value={skill.value}
            >
              <svg viewBox="0 0 100 1.72" preserveAspectRatio="none">
                <path d="M 0.86,0.86 L 99.14,0.86" />
                <path
                  d="M 0.86,0.86 L 99.14,0.86"
                  pathLength={100}
                  strokeDasharray={`${skill.value} 100`}
                />
              </svg>
              <div className="progressbar-text">{skill.value} %</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CircleProgress({ value }: { value: number }) {
  const radius = 47.5;
  const length = 2 * Math.PI * radius;
  const dash = (value / 100) * length;
  const circlePath = `M 50,50 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${
    radius * 2
  } a ${radius},${radius} 0 1 1 0,-${radius * 2}`;

  return (
    <div className="art-cirkle-progress art-skills-progress">
      <svg viewBox="0 0 100 100">
        <path d={circlePath} />
        <path
          d={circlePath}
          strokeDasharray={`${dash} ${length}`}
        />
      </svg>
      <div
        className="progressbar-text"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          padding: 0,
          margin: 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
