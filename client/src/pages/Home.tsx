import { useState, useEffect } from "react";
import { ChevronDown, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
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

      {/* Hero Section - Simplified */}
      <section
        id="hero"
        className="relative overflow-hidden h-screen flex items-center justify-center pt-20"
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

      {/* About Section - Side Layout */}
      <section
        id="about"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#FFF5F8",
        }}
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Image/Icon */}
            <div className="flex justify-center">
              <div className="text-9xl">👨‍💻</div>
            </div>
            
            {/* Right: Text */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {portfolioData.personal.bio}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                저는 사용자의 입장에서 생각하는 것이 중요하다고 믿습니다. 단순히 코드를 작성하는 것이 아니라, 
                사용자 경험을 고려한 솔루션을 만드는 것을 좋아합니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                새로운 기술을 배우고 지속적으로 성장하는 것을 즐기며, 팀과 함께 협력하여 더 좋은 결과물을 만드는 것에 보람을 느낍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - Text List */}
      <section
        id="education"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F0F8FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Education
          </h2>
          <div className="space-y-8">
            {portfolioData.education.map((edu) => (
              <div key={edu.id} className="border-b border-gray-300 pb-6 last:border-b-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.school}</h3>
                <p className="text-lg text-[#FFB3D9] font-semibold mb-2">{edu.major}</p>
                <p className="text-gray-600">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Carousel and Categories Combined */}
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
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg overflow-hidden mb-12">
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
                        {skill.icon.startsWith('http') ? (
                          <img src={skill.icon} alt={skill.name} className="w-16 h-16 object-contain" />
                        ) : (
                          <span className="text-5xl">{skill.icon}</span>
                        )}
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
          
          {/* Skills Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioData.skills.map((skillGroup, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-gray-900 mb-6 text-center text-lg text-[#FFB3D9]">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-3 justify-center">
                  {skillGroup.items.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-4 py-2 bg-[#FFE5F0] text-gray-700 rounded-full text-sm font-medium hover:bg-[#FFB3D9] hover:text-white transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Part 1 */}
      <section
        id="projects"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F5F0FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Projects
          </h2>
          <div className="space-y-8">
            {portfolioData.projects.slice(0, 2).map((project) => (
              <div key={project.id} className="border-b border-gray-300 pb-8 last:border-b-0">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl flex-shrink-0">{project.image}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-20">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#F0E5FF] text-gray-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
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
          backgroundColor: "#F5F0FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Projects
          </h2>
          <div className="space-y-8">
            {portfolioData.projects.slice(2).map((project) => (
              <div key={project.id} className="border-b border-gray-300 pb-8 last:border-b-0">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl flex-shrink-0">{project.image}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-20">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#F0E5FF] text-gray-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Section - Part 1 */}
      <section
        id="activity"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F0F8FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Activity
          </h2>
          <div className="space-y-8">
            {portfolioData.activities.slice(0, 2).map((activity, idx) => (
              <div key={idx} className="border-b border-gray-300 pb-8 last:border-b-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Section - Part 2 */}
      <section
        id="activity-2"
        className="h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: "#F0F8FF",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Activity
          </h2>
          <div className="space-y-8">
            {portfolioData.activities.slice(2).map((activity, idx) => (
              <div key={idx} className="border-b border-gray-300 pb-8 last:border-b-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.period}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Contact
          </h2>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            새로운 프로젝트나 협업 기회에 항상 열려있습니다. 
            <br />
            아래의 연락처를 통해 저에게 연락주세요!
          </p>
          
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="mailto:your-email@example.com"
              className="flex items-center gap-2 px-6 py-3 bg-[#FFB3D9] text-white rounded-lg font-semibold hover:bg-[#FF99C8] transition-colors"
            >
              <Mail size={20} />
              Email
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white rounded-lg font-semibold hover:bg-[#094399] transition-colors"
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
