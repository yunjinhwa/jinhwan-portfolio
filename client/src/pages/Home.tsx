import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  ArrowUp,
  ChevronDown,
  ExternalLink,
  Fish,
  Footprints,
  Gamepad2,
  Github,
  Instagram,
  Languages,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const NAV_SECTIONS = [
  "hero",
  "about",
  "skills",
  "projects",
  "activity",
  "contact",
] as const;

const SECTION_LABELS: Record<(typeof NAV_SECTIONS)[number], string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  activity: "Activity",
  contact: "Contact",
};

const SECTION_CLASS =
  "portfolio-section px-5 py-20 sm:px-8 sm:py-24 lg:px-[8vw]";
const SECTION_INNER_CLASS = "mx-auto w-full max-w-[1320px]";
const SECTION_TITLE_CLASS =
  "mb-10 text-4xl font-black tracking-tight text-[#252525] sm:mb-14 sm:text-5xl lg:text-6xl";

type Project = (typeof portfolioData.projects)[number];
type Activity = (typeof portfolioData.activities)[number];
type Skill = (typeof portfolioData.skills)[number]["items"][number];

const PROJECT_ICONS: Record<string, LucideIcon> = {
  badgeCheck: BadgeCheck,
  gamepad: Gamepad2,
  fish: Fish,
  footprints: Footprints,
  languages: Languages,
};

const skills = portfolioData.skills.flatMap(group => group.items);
const projectsByLatest = [...portfolioData.projects].sort(
  (a, b) => b.year - a.year || a.id - b.id
);

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of NAV_SECTIONS) {
        const element = document.getElementById(section);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="portfolio-page bg-white text-[#252525]">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Activity />
      <Contact />
      <BackToTopButton onClick={() => scrollToSection("hero")} />
    </main>
  );
}

function Header({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (section: string) => void;
}) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-white/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-[5vw]">
        <button
          type="button"
          onClick={() => onNavigate("hero")}
          className="shrink-0 text-left text-sm font-black uppercase tracking-tight text-[#252525] sm:text-base"
        >
          Jinhwan&apos;s
          <span className="block text-[#645BE7]">Portfolio</span>
        </button>

        <div className="no-scrollbar -mr-2 flex max-w-full gap-1 overflow-x-auto pl-2 sm:mr-0 sm:gap-3 sm:overflow-visible">
          {NAV_SECTIONS.map(section => (
            <button
              key={section}
              type="button"
              onClick={() => onNavigate(section)}
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-tight transition-colors sm:text-sm ${
                activeSection === section
                  ? "bg-[#252525] text-white"
                  : "text-[#555] hover:bg-[#F1F0FF] hover:text-[#645BE7]"
              }`}
            >
              {SECTION_LABELS[section]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function BackToTopButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="맨 위로 이동"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/70 text-[#252525] shadow-[0_12px_40px_rgba(40,40,40,0.16)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-[#252525] hover:text-white sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
    >
      <ArrowUp size={22} strokeWidth={2.2} />
    </button>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="portfolio-section relative flex min-h-svh items-center overflow-hidden bg-[#F4F4F4] px-5 py-28 sm:px-8 lg:px-[8vw]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-20 h-px bg-[#252525]/10" />
      <div className="pointer-events-none absolute bottom-12 right-[-8vw] text-[22vw] font-black leading-none tracking-[-0.08em] text-white/80">
        JH
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <p className="mb-6 text-sm font-black uppercase tracking-[0.4em] text-[#645BE7]">
          Web Portfolio
        </p>
        <h1 className="max-w-5xl text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] tracking-[-0.08em] text-[#252525]">
          JINHWAN&apos;S
          <br />
          PORTFOLIO
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-8 text-[#555] sm:text-xl sm:leading-9">
          {portfolioData.personal.title}
          <br className="hidden sm:block" />
          사용자 경험과 실제 동작을 함께 고민하며, 아이디어를 끝까지 구현하는
          개발자입니다.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {["Frontend", "Interactive", "Unity", "Problem Solver"].map(item => (
            <span
              key={item}
              className="rounded-full border border-[#252525]/15 bg-white/70 px-4 py-2 text-sm font-bold text-[#333]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <ChevronDown className="absolute bottom-8 left-1/2 h-6 w-6 -translate-x-1/2 animate-bounce text-[#645BE7]" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className={SECTION_CLASS}>
      <div className={SECTION_INNER_CLASS}>
        <h2 className={SECTION_TITLE_CLASS}>ABOUT ME</h2>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative min-h-[320px] overflow-hidden rounded-[32px] border border-[#ECECF5] bg-[#F7F6FF] p-8 sm:min-h-[420px] sm:p-10">
            <div className="absolute inset-x-8 top-8 flex items-center justify-between text-xs font-black uppercase tracking-[0.25em] text-[#645BE7]">
              <span>Developer</span>
              <span>2026</span>
            </div>
            <div className="flex h-full min-h-[260px] flex-col justify-end">
              <p className="text-[clamp(5rem,16vw,11rem)] font-black leading-none tracking-[-0.08em] text-[#252525]">
                YJH
              </p>
              <p className="mt-4 text-2xl font-black text-[#645BE7]">
                {portfolioData.personal.name}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-6 text-xl font-black leading-8 text-[#252525] sm:text-2xl sm:leading-10">
              안녕하세요. 직접 만들고 부딪히며 성장하는 개발자
              {portfolioData.personal.name}입니다.
            </p>
            <div className="space-y-5 text-base leading-8 text-[#555] sm:text-lg">
              <p>{portfolioData.personal.bio}</p>
              <p>
                단순히 화면을 만드는 것보다 사용자가 어떤 흐름으로 서비스를
                이해하고 사용할지 생각하며 개발합니다. 작은 기능도 끝까지 다듬어
                실제로 쓸 수 있는 결과물로 만드는 것을 좋아합니다.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <InfoPanel title="Education">
                {portfolioData.education.map(edu => (
                  <div key={edu.id}>
                    <p className="font-black text-[#252525]">{edu.school}</p>
                    <p className="mt-1 text-sm text-[#666]">
                      {edu.major} · {edu.period}
                    </p>
                  </div>
                ))}
              </InfoPanel>
              <InfoPanel title="Contact">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="inline-flex items-center gap-2 font-black text-[#645BE7]"
                >
                  {portfolioData.personal.email}
                  <ArrowUpRight size={18} />
                </a>
              </InfoPanel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#ECECF5] bg-white p-5 shadow-[0_12px_40px_rgba(40,40,40,0.04)]">
      <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#999]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className={`${SECTION_CLASS} bg-[#FAFAFA]`}>
      <div className={SECTION_INNER_CLASS}>
        <h2 className="mb-6 text-4xl font-black tracking-tight text-[#252525] sm:text-5xl lg:text-6xl">
          SKILLS
        </h2>
        <p className="mb-10 max-w-2xl text-base leading-8 text-[#666] sm:text-lg">
          프로젝트에서 실제로 사용해 본 기술을 중심으로 정리했습니다.
        </p>
      </div>

      <SkillMarquee skills={skills} />

      <div className={`${SECTION_INNER_CLASS} mt-10`}>
        <div className="grid gap-4 lg:grid-cols-3">
          {portfolioData.skills.map(group => (
            <div
              key={group.category}
              className="rounded-[24px] border border-[#ECECF5] bg-white p-5 shadow-[0_12px_40px_rgba(40,40,40,0.04)]"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-xl font-black text-[#252525]">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F7F7FA] px-3 py-2 text-sm font-bold text-[#333] ring-1 ring-[#ECECF5]"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="h-4 w-4 shrink-0 object-contain"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillMarquee({ skills }: { skills: Skill[] }) {
  return (
    <div className="skill-marquee overflow-hidden">
      <div className="skills-carousel flex w-fit gap-5 px-5">
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex w-max min-w-[180px] max-w-[240px] items-center gap-3 rounded-2xl border border-[#ECECF5] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(40,40,40,0.04)] sm:min-w-[200px] sm:max-w-[280px]"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="h-9 w-9 shrink-0 object-contain"
            />
            <span className="min-w-0 truncate whitespace-nowrap text-base font-black text-[#252525]">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className={`${SECTION_CLASS} bg-[#212121] text-white`}
    >
      <div className={SECTION_INNER_CLASS}>
        <h2 className="mb-8 text-4xl font-black tracking-tight text-white sm:mb-12 sm:text-5xl lg:text-6xl">
          PROJECT
        </h2>
        <ProjectList projects={projectsByLatest} />
      </div>
    </section>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="border-b border-white/20">
      {projects.map(project => {
        const ProjectIcon = PROJECT_ICONS[project.icon] ?? ExternalLink;

        return (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-4 border-t border-white/20 py-6 transition-colors hover:text-[#9891F9] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] sm:items-center sm:py-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#9891F9] transition-colors group-hover:border-[#9891F9] group-hover:bg-[#9891F9] group-hover:text-white">
                <ProjectIcon size={24} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white/75"
                >
                  #{tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm font-black text-white/50 sm:justify-end">
              {project.year}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </a>
        );
      })}
    </div>
  );
}

function Activity() {
  return (
    <section id="activity" className={SECTION_CLASS}>
      <div className={SECTION_INNER_CLASS}>
        <h2 className={SECTION_TITLE_CLASS}>ACTIVITY</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {portfolioData.activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <article className="rounded-[28px] border border-[#ECECF5] bg-white p-6 shadow-[0_12px_40px_rgba(40,40,40,0.04)]">
      <p className="mb-6 inline-flex rounded-full bg-[#F1F0FF] px-3 py-1 text-sm font-black text-[#645BE7]">
        {activity.type}
      </p>
      <h3 className="text-2xl font-black text-[#252525]">{activity.title}</h3>
      <p className="mt-4 text-sm font-bold text-[#999]">{activity.period}</p>
      <p className="mt-5 leading-7 text-[#666]">{activity.description}</p>
    </article>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="portfolio-section flex min-h-svh items-center px-5 py-24 sm:px-8 lg:px-[8vw]"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <p className="mb-8 text-2xl font-black leading-tight text-[#252525] sm:text-4xl">
          함께 만들 프로젝트가 있다면,
          <br />
          언제든 편하게 연락해 주세요.
        </p>

        <a
          href={`mailto:${portfolioData.personal.email}`}
          className="block break-all text-[clamp(2.3rem,8vw,6.5rem)] font-black leading-none tracking-[-0.06em] text-[#645BE7] transition-colors hover:text-[#9891F9]"
        >
          {portfolioData.personal.email}
        </a>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ContactLink
            href={`mailto:${portfolioData.personal.email}`}
            icon={Mail}
          >
            Mail
          </ContactLink>
          <ContactLink href={portfolioData.personal.github} icon={Github}>
            GitHub
          </ContactLink>
          <ContactLink href={portfolioData.personal.instagram} icon={Instagram}>
            Instagram
          </ContactLink>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#252525]/10 px-5 py-3 font-black text-[#252525] transition-colors hover:border-[#645BE7] hover:bg-[#645BE7] hover:text-white"
    >
      <Icon size={18} />
      {children}
    </a>
  );
}
