import { useState, useEffect } from "react";
import { ChevronDown, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "skills", "skills-categories", "projects", "projects-2", "activity", "activity-2", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">YJH</div>
          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
            {["hero", "about", "education", "skills", "projects", "activity", "contact"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeSection === section || activeSection === `${section}-2` || activeSection === `${section}-categories`
                      ? "bg-[#FFB3D9] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {section === "contact" ? "Contact" : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Name and Title */}
      <section
        id="hero"
        className="relative overflow-hidden h-screen flex items-center justify-center pt-0"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663224932168/Ap8iWxtFKkKptEPsmR3DAr/hero-background-LRmDBhYcviWuMgANi2coCk.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/30 animate-pulse"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-lg">
              {portfolioData.personal.name}
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8 leading-relaxed font-light drop-shadow">
              {portfolioData.personal.title}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-gray-600" />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#FFF5F8",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">About Me</h2>
          <div className="space-y-6">
            {portfolioData.about.map((item, idx) => (
              <p key={idx} className="text-lg text-gray-700 leading-relaxed">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F0F8FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Education</h2>
          <div className="space-y-8">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="border-l-4 border-[#FFB3D9] pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.school}</h3>
                <p className="text-lg text-gray-700 mb-2">{edu.major}</p>
                <p className="text-gray-600">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Carousel */}
      <section
        id="skills"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663224932168/Ap8iWxtFKkKptEPsmR3DAr/skills-bg-LRmDBhYcviWuMgANi2coCk.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Skills</h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {portfolioData.skills.carousel.map((skill, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="text-5xl">{skill.icon}</div>
                <p className="text-gray-700 font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Categories Section */}
      <section
        id="skills-categories"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F5F0FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">기술 스택</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(portfolioData.skills.categories).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#FFE5F0] text-gray-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section 1 */}
      <section
        id="projects"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F5F0FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Projects</h2>
          <div className="space-y-8">
            {portfolioData.projects.slice(0, 2).map((project, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">{project.image}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, tidx) => (
                        <span key={tidx} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section 2 */}
      <section
        id="projects-2"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F5F0FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="space-y-8">
            {portfolioData.projects.slice(2).map((project, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">{project.image}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, tidx) => (
                        <span key={tidx} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Section 1 */}
      <section
        id="activity"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F0F8FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Activity</h2>
          <div className="space-y-8">
            {portfolioData.activities.slice(0, 2).map((activity, idx) => (
              <div key={idx} className="border-l-4 border-[#FFB3D9] pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-700 mb-2">{activity.type}</p>
                <p className="text-gray-600 mb-2">{activity.period}</p>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Section 2 */}
      <section
        id="activity-2"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F0F8FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="space-y-8">
            {portfolioData.activities.slice(2).map((activity, idx) => (
              <div key={idx} className="border-l-4 border-[#FFB3D9] pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-700 mb-2">{activity.type}</p>
                <p className="text-gray-600 mb-2">{activity.period}</p>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#FFF5F8",
        }}
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Contact</h2>
          <p className="text-xl text-gray-700 mb-12">{portfolioData.contact.message}</p>
          <div className="flex justify-center gap-6">
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#FFB3D9] text-white rounded-lg hover:bg-[#FF99C8] transition-colors"
            >
              <Mail size={20} />
              Email
            </a>
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
