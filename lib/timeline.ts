import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { marked } from "marked";
import { toImageSrc, toPublicUrl } from "@/lib/paths";

export type TimelinePhoto = {
  file: string;
  caption: string;
  src: string;
  href: string;
};

export type TimelineChapter = {
  id: string;
  emoji: string;
  title: string;
  period: string;
  role: string;
  stack: string[];
  storyHtml: string;
  photos: TimelinePhoto[];
};

export type PersonalTimeline = {
  title: string;
  lead: string;
  chapters: TimelineChapter[];
};

const DATA_FILE = path.join(process.cwd(), "_data/personal_timeline.yml");

type TimelineYaml = {
  title: string;
  lead: string;
  chapters: Array<{
    id: string;
    emoji: string;
    title: string;
    period: string;
    role: string;
    stack?: string[];
    story: string;
    photos?: Array<{ file: string; caption?: string }>;
  }>;
};

export function getPersonalTimeline(): PersonalTimeline {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  const data = yaml.load(raw) as TimelineYaml;
  const chapters = data.chapters.map((chapter) => ({
    id: chapter.id,
    emoji: chapter.emoji,
    title: chapter.title,
    period: chapter.period,
    role: chapter.role,
    stack: chapter.stack ?? [],
    storyHtml: marked.parse(chapter.story ?? "", { async: false }) as string,
    photos: (chapter.photos ?? []).map((photo) => {
      const publicPath = `public/personal-timeline/${photo.file}`;
      return {
        file: photo.file,
        caption: photo.caption ?? "",
        src: toImageSrc(publicPath),
        href: toPublicUrl(publicPath),
      };
    }),
  }));

  return {
    title: data.title,
    lead: data.lead,
    chapters: [...chapters].reverse(),
  };
}
