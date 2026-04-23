import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  activity: "Experience",
  contact: "Contact",
};

const SECTION_CLASS =
  "portfolio-section px-5 py-20 sm:px-8 sm:py-24 lg:px-[8vw]";
const SECTION_INNER_CLASS = "mx-auto w-full max-w-[1320px]";
const SECTION_TITLE_CLASS =
  "mb-10 text-4xl font-black tracking-tight text-[#252525] sm:mb-14 sm:text-5xl lg:text-6xl";
const CURRENT_YEAR = new Date().getFullYear();
const HERO_HIGHLIGHTS = ["React", "TypeScript", "Unity", "Firebase"];
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.24 };

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

function getRevealProps(shouldReduceMotion: boolean | null, delay = 0, y = 28) {
  if (shouldReduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  };
}

function getScaleRevealProps(shouldReduceMotion: boolean | null, delay = 0) {
  if (shouldReduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 24, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: VIEWPORT,
    transition: { duration: 0.75, delay, ease: EASE_OUT },
  };
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const snapRestoreTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      if (snapRestoreTimeoutRef.current !== null) {
        window.clearTimeout(snapRestoreTimeoutRef.current);
      }
      document.documentElement.classList.remove("is-programmatic-scrolling");
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const headerHeight =
      document
        .querySelector<HTMLElement>("[data-portfolio-header]")
        ?.getBoundingClientRect().height ?? 0;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetTop =
      sectionId === "hero" ? 0 : Math.max(sectionTop - headerHeight, 0);

    document.documentElement.classList.add("is-programmatic-scrolling");
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    if (snapRestoreTimeoutRef.current !== null) {
      window.clearTimeout(snapRestoreTimeoutRef.current);
    }

    snapRestoreTimeoutRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove("is-programmatic-scrolling");
      snapRestoreTimeoutRef.current = null;
    }, 900);
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.nav
      data-portfolio-header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/70 bg-white/92"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-[5vw]">
        <button
          type="button"
          onClick={() => onNavigate("hero")}
          className="shrink-0 text-left text-sm font-black uppercase tracking-tight text-[#252525] transition-transform duration-300 hover:-translate-y-0.5 sm:text-base"
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
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-tight transition-all duration-300 sm:text-sm ${
                activeSection === section
                  ? "bg-[#252525] text-white shadow-[0_10px_30px_rgba(37,37,37,0.18)]"
                  : "text-[#555] hover:-translate-y-0.5 hover:bg-[#F1F0FF] hover:text-[#645BE7]"
              }`}
            >
              {SECTION_LABELS[section]}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function BackToTopButton({ onClick }: { onClick: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="맨 위로 이동"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
      whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.05 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/92 text-[#252525] shadow-[0_12px_40px_rgba(40,40,40,0.16)] transition-colors hover:bg-[#252525] hover:text-white sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
    >
      <ArrowUp size={22} strokeWidth={2.2} />
    </motion.button>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="portfolio-section hero-grid relative flex min-h-svh items-center overflow-hidden bg-[#F4F4F4] px-5 py-28 sm:px-8 lg:px-[8vw]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-6rem] top-20 h-64 w-64 rounded-full bg-[#645BE7]/10 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-5rem] right-[8%] h-72 w-72 rounded-full bg-[#FFCFD8]/35 blur-3xl sm:h-96 sm:w-96"
      />
      <div className="pointer-events-none absolute inset-x-0 top-20 h-px bg-[#252525]/10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-[-8vw] text-[22vw] font-black leading-none tracking-[-0.08em] text-white/80"
      >
        JH
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-6 text-sm font-black uppercase tracking-[0.4em] text-[#645BE7]"
        >
          Frontend & Interactive Portfolio
        </motion.p>
        <motion.h1
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }
          }
          animate={
            shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.95, delay: 0.08, ease: EASE_OUT }}
          className="max-w-5xl text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] tracking-[-0.08em] text-[#252525]"
        >
          JINHWAN&apos;S
          <br />
          PORTFOLIO
        </motion.h1>
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
          className="mt-8 max-w-3xl text-base leading-8 text-[#555] sm:text-xl sm:leading-9"
        >
          {portfolioData.personal.title}
          <br className="hidden sm:block" />웹 프론트엔드와 인터랙티브
          클라이언트 구현을 중심으로, 사용 경험이 드러나는 결과물을 만드는
          개발자입니다.
        </motion.p>
        <div className="mt-10 flex flex-wrap gap-3">
          {HERO_HIGHLIGHTS.map((item, index) => (
            <motion.span
              key={item}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.32 + index * 0.08,
                ease: EASE_OUT,
              }}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.03 }
              }
              className="rounded-full border border-[#252525]/15 bg-white/92 px-4 py-2 text-sm font-bold text-[#333] shadow-[0_10px_30px_rgba(40,40,40,0.06)]"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="arrow-float h-6 w-6 text-[#645BE7]" />
      </motion.div>
    </section>
  );
}

function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className={SECTION_CLASS}>
      <div className={SECTION_INNER_CLASS}>
        <motion.div {...getRevealProps(shouldReduceMotion)}>
          <h2 className={SECTION_TITLE_CLASS}>ABOUT ME</h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            {...getScaleRevealProps(shouldReduceMotion)}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -10,
                    rotate: -1.5,
                    boxShadow: "0 28px 70px rgba(100, 91, 231, 0.14)",
                  }
            }
            className="relative min-h-[320px] overflow-hidden rounded-[32px] border border-[#ECECF5] bg-[#F7F6FF] p-8 shadow-[0_18px_60px_rgba(100,91,231,0.08)] sm:min-h-[420px] sm:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/60 blur-3xl"
            />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between text-xs font-black uppercase tracking-[0.25em] text-[#645BE7]">
              <span>Frontend</span>
              <span>{CURRENT_YEAR}</span>
            </div>
            <div className="flex h-full min-h-[260px] flex-col justify-end">
              <p className="text-[clamp(5rem,16vw,11rem)] font-black leading-none tracking-[-0.08em] text-[#252525]">
                YJH
              </p>
              <p className="mt-4 text-2xl font-black text-[#645BE7]">
                {portfolioData.personal.name}
              </p>
            </div>
          </motion.div>

          <motion.div {...getRevealProps(shouldReduceMotion, 0.12)}>
            <p className="mb-6 text-xl font-black leading-8 text-[#252525] sm:text-2xl sm:leading-10">
              안녕하세요. 웹 프론트엔드와 인터랙티브 구현에 강점이 있는 개발자{" "}
              {portfolioData.personal.name}입니다.
            </p>
            <div className="space-y-5 text-base leading-8 text-[#555] sm:text-lg">
              <p>{portfolioData.personal.bio}</p>
              <p>
                React와 TypeScript 기반의 웹 화면 구현뿐 아니라 Unity 프로젝트와
                AI API 연동도 경험했습니다. 한 화면 안에서 사용성이 어떻게
                전달되는지까지 고려하며 구현하는 것을 중요하게 생각합니다.
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
                  className="inline-flex items-center gap-2 font-black text-[#645BE7] transition-transform duration-300 hover:translate-x-1"
                >
                  {portfolioData.personal.email}
                  <ArrowUpRight size={18} />
                </a>
              </InfoPanel>
            </div>
          </motion.div>
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...getScaleRevealProps(shouldReduceMotion, 0.08)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              boxShadow: "0 20px 50px rgba(40, 40, 40, 0.08)",
            }
      }
      className="rounded-2xl border border-[#ECECF5] bg-white p-5 shadow-[0_12px_40px_rgba(40,40,40,0.04)]"
    >
      <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#999]">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className={`${SECTION_CLASS} bg-[#FAFAFA]`}>
      <div className={SECTION_INNER_CLASS}>
        <motion.h2
          {...getRevealProps(shouldReduceMotion)}
          className="mb-6 text-4xl font-black tracking-tight text-[#252525] sm:text-5xl lg:text-6xl"
        >
          SKILLS
        </motion.h2>
        <motion.p
          {...getRevealProps(shouldReduceMotion, 0.08)}
          className="mb-10 max-w-2xl text-base leading-8 text-[#666] sm:text-lg"
        >
          프론트엔드 구현, 인터랙션 설계, API 연동 과정에서 직접 사용한 기술을
          중심으로 정리했습니다.
        </motion.p>
      </div>

      <motion.div {...getRevealProps(shouldReduceMotion, 0.12, 18)}>
        <SkillMarquee skills={skills} />
      </motion.div>

      <div className={`${SECTION_INNER_CLASS} mt-10`}>
        <div className="grid gap-4 lg:grid-cols-3">
          {portfolioData.skills.map((group, index) => (
            <motion.div
              key={group.category}
              {...getScaleRevealProps(shouldReduceMotion, index * 0.08)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      boxShadow: "0 24px 55px rgba(40, 40, 40, 0.08)",
                    }
              }
              className="rounded-[24px] border border-[#ECECF5] bg-white p-5 shadow-[0_12px_40px_rgba(40,40,40,0.04)]"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-xl font-black text-[#252525]">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <motion.span
                    key={skill.name}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-[#F7F7FA] px-3 py-2 text-sm font-bold text-[#333] ring-1 ring-[#ECECF5]"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="h-4 w-4 shrink-0 object-contain"
                    />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillMarquee({ skills }: { skills: Skill[] }) {
  return (
    <div className="mx-auto grid w-full max-w-[1320px] gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-[8vw]">
      {skills.map(skill => (
        <div
          key={skill.name}
          className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#ECECF5] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(40,40,40,0.04)]"
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
  );
}

function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="portfolio-section bg-[#212121] px-5 pt-20 pb-12 text-white sm:px-8 sm:pt-24 sm:pb-14 lg:px-[8vw]"
    >
      <div className={SECTION_INNER_CLASS}>
        <motion.h2
          {...getRevealProps(shouldReduceMotion)}
          className="mb-8 text-4xl font-black tracking-tight text-white sm:mb-12 sm:text-5xl lg:text-6xl"
        >
          PROJECT
        </motion.h2>
        <motion.p
          {...getRevealProps(shouldReduceMotion, 0.08)}
          className="mb-10 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
        >
          웹 프론트엔드와 인터랙티브 클라이언트 구현 역량을 보여줄 수 있는
          프로젝트를 정리했습니다.
        </motion.p>
        <ProjectList projects={projectsByLatest} />
      </div>
    </section>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border-b border-white/20">
      {projects.map((project, index) => {
        const ProjectIcon = PROJECT_ICONS[project.icon] ?? ExternalLink;

        return (
          <motion.a
            key={project.id}
            {...getRevealProps(shouldReduceMotion, index * 0.08, 34)}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            className="project-link group grid gap-4 border-t border-white/20 py-6 transition-colors hover:text-[#9891F9] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] sm:items-center sm:py-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#9891F9] transition-colors duration-300 group-hover:border-[#9891F9] group-hover:bg-[#9891F9] group-hover:text-white">
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
                <motion.span
                  key={tech}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }
                  }
                  className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white/75"
                >
                  #{tech}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm font-black text-white/50 sm:justify-end">
              {project.year}
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

function Activity() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="activity" className={SECTION_CLASS}>
      <div className={SECTION_INNER_CLASS}>
        <motion.div {...getRevealProps(shouldReduceMotion)}>
          <h2 className={SECTION_TITLE_CLASS}>EXPERIENCE</h2>
        </motion.div>
        <motion.p
          {...getRevealProps(shouldReduceMotion, 0.08)}
          className="mb-10 max-w-2xl text-base leading-8 text-[#666] sm:text-lg"
        >
          협업, 리더십, 책임감을 보여줄 수 있는 경험을 정리했습니다.
        </motion.p>
        <div className="grid gap-5 md:grid-cols-3">
          {portfolioData.activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({
  activity,
  index,
}: {
  activity: Activity;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      {...getScaleRevealProps(shouldReduceMotion, index * 0.08)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,
              boxShadow: "0 24px 55px rgba(40, 40, 40, 0.08)",
            }
      }
      className="rounded-[28px] border border-[#ECECF5] bg-white p-6 shadow-[0_12px_40px_rgba(40,40,40,0.04)]"
    >
      <p className="mb-6 inline-flex rounded-full bg-[#F1F0FF] px-3 py-1 text-sm font-black text-[#645BE7]">
        {activity.type}
      </p>
      <h3 className="text-2xl font-black text-[#252525]">{activity.title}</h3>
      <p className="mt-4 text-sm font-bold text-[#999]">{activity.period}</p>
      <p className="mt-5 leading-7 text-[#666]">{activity.description}</p>
    </motion.article>
  );
}

function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="portfolio-section relative flex min-h-svh items-center overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f7f6ff_52%,#fff3f6_100%)] px-5 py-24 sm:px-8 lg:px-[8vw]"
    >
      <div
        aria-hidden="true"
        className="floating-orb pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#645BE7]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="floating-orb pointer-events-none absolute bottom-4 right-0 h-72 w-72 rounded-full bg-[#FFCFD8]/55 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1320px]">
        <motion.p
          {...getRevealProps(shouldReduceMotion)}
          className="mb-8 text-2xl font-black leading-tight text-[#252525] sm:text-4xl"
        >
          채용 및 인터뷰 관련 문의는,
          <br />
          아래 메일로 연락 부탁드립니다.
        </motion.p>

        <motion.a
          {...getRevealProps(shouldReduceMotion, 0.12, 18)}
          href={`mailto:${portfolioData.personal.email}`}
          whileHover={shouldReduceMotion ? undefined : { x: 8 }}
          className="block break-all text-[clamp(2.3rem,8vw,6.5rem)] font-black leading-none tracking-[-0.06em] text-[#645BE7] transition-colors duration-300 hover:text-[#9891F9]"
        >
          {portfolioData.personal.email}
        </motion.a>
        <motion.p
          {...getRevealProps(shouldReduceMotion, 0.18, 14)}
          className="mt-6 max-w-2xl text-base leading-8 text-[#666] sm:text-lg"
        >
          포트폴리오와 프로젝트에 대한 추가 설명이 필요하시면 성실하게
          답변드리겠습니다.
        </motion.p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ContactLink
            href={`mailto:${portfolioData.personal.email}`}
            icon={Mail}
            delay={0.2}
          >
            Mail
          </ContactLink>
          <ContactLink
            href={portfolioData.personal.github}
            icon={Github}
            delay={0.28}
          >
            GitHub
          </ContactLink>
          <ContactLink
            href={portfolioData.personal.instagram}
            icon={Instagram}
            delay={0.36}
          >
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
  delay = 0,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      {...getScaleRevealProps(shouldReduceMotion, delay)}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#252525]/10 bg-white/92 px-5 py-3 font-black text-[#252525] shadow-[0_10px_30px_rgba(40,40,40,0.05)] transition-colors duration-300 hover:border-[#645BE7] hover:bg-[#645BE7] hover:text-white"
    >
      <Icon size={18} />
      {children}
    </motion.a>
  );
}
