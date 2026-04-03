import { useState, useEffect } from "react";
import { ChevronDown, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/lib/portfolio-data";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "contact", "about", "education", "skills", "skills-categories", "projects", "projects-2", "activity"];
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
    <div className="bg-gradient-to-b from-[#FFFBF0] via-[#FFFBF0] to-[#F5F0FF]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">YJH</div>
          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
            {["hero", "contact", "about", "education", "skills", "projects", "activity"].map(
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

      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden h-screen flex items-center justify-center"
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
            <button
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB3D9] text-white rounded-lg hover:bg-[#FF9CC4] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              자세히 보기
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-gray-600" />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 229, 236, 0.2) 0%, rgba(212, 232, 255, 0.2) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Contact</h2>
          <p className="text-lg text-gray-700 mb-12">
            새로운 기회와 협업에 항상 열려있습니다. 편하게 연락주세요!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB3D9] text-white rounded-lg hover:bg-[#FF9CC4] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Mail size={20} />
              Email
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 229, 236, 0.3) 0%, rgba(232, 213, 242, 0.3) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            About Me
          </h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {portfolioData.personal.bio}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              저는 사용자의 입장에서 생각하는 것이 중요하다고 믿습니다. 단순히 코드를 작성하는 것이 아니라, 
              사용자 경험을 고려한 솔루션을 만드는 것을 좋아합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Education
          </h2>
          <div className="space-y-6">
            {portfolioData.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#FFB3D9]"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.school}</h3>
                <p className="text-lg text-[#FFB3D9] font-semibold mb-2">{edu.major}</p>
                <p className="text-gray-600 mb-3">{edu.period}</p>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section 1 - Continuous Carousel */}
      <section
        id="skills"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663224932168/Ap8iWxtFKkKptEPsmR3DAr/skills-bg-g9mJpLYKwD85aDSeLGQDAg.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Skills
          </h2>

          {/* Continuous Carousel */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg overflow-hidden">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div className="skills-carousel flex gap-8 w-fit">
                  {/* Duplicate skills for seamless loop */}
                  {[...portfolioData.skills, ...portfolioData.skills].map((skillGroup, groupIdx) =>
                    skillGroup.items.map((skill, idx) => (
                      <div
                        key={`${groupIdx}-${idx}`}
                        className="flex flex-col items-center gap-3 p-4 flex-shrink-0"
                      >
                        <span className="text-5xl">{skill.icon}</span>
                        <span className="text-gray-700 font-medium text-center whitespace-nowrap">
                          {skill.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section 2 - Categories */}
      <section
        id="skills-categories"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(212, 232, 255, 0.2) 0%, rgba(213, 240, 232, 0.2) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            기술 스택
          </h2>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolioData.skills.map((skillGroup, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-center">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skillGroup.items.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1 bg-[#FFE5EC] text-gray-700 text-sm rounded-full"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Part 1 */}
      <section
        id="projects"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663224932168/Ap8iWxtFKkKptEPsmR3DAr/projects-bg-VsMcdkjhsAfJg633v6HC49.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.projects.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <div className="h-40 bg-gradient-to-br from-[#FFB3D9] to-[#FFD4E5] flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#FFE5EC] text-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="w-full px-4 py-2 bg-[#FFB3D9] text-white rounded-lg hover:bg-[#FF9CC4] transition-all duration-300 flex items-center justify-center gap-2">
                    자세히 보기
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Part 2 */}
      <section
        id="projects-2"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 229, 236, 0.2) 0%, rgba(212, 232, 255, 0.2) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.projects.slice(2).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <div className="h-40 bg-gradient-to-br from-[#B3D9FF] to-[#D4E5FF] flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#D4E5FF] text-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="w-full px-4 py-2 bg-[#B3D9FF] text-white rounded-lg hover:bg-[#99CCFF] transition-all duration-300 flex items-center justify-center gap-2">
                    자세히 보기
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <section
        id="activity"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(212, 232, 255, 0.3) 0%, rgba(213, 240, 232, 0.3) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Activity
          </h2>
          <div className="space-y-6">
            {portfolioData.activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-[#B3D9FF]"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                  <span className="px-3 py-1 bg-[#D4E8FF] text-gray-700 text-sm rounded-full">
                    {activity.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{activity.period}</p>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t-4 border-[#FFB3D9] bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Jinhwan Yoon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
