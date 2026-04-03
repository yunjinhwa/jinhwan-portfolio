// Portfolio data structure for Jinhwan Yoon
export const portfolioData = {
  personal: {
    name: "윤진환",
    title: "아이디어를 직접 구현해, 재미와 실용성을 함께 만드는 개발자",
    email: "jinhwan@example.com",
    github: "https://github.com/jinhwan",
    linkedin: "https://linkedin.com/in/jinhwan",
    bio: "사용자의 입장으로 생각하는 것이 중요하다고 생각합니다. 새로운 기술을 배우고, 이를 실제 프로젝트에 적용하여 의미 있는 결과를 만드는 것을 좋아합니다."
  },
  
  education: [
    {
      id: 1,
      school: "대학교",
      major: "컴퓨터공학과",
      period: "2020.03 - 2024.02",
      description: "웹 개발과 소프트웨어 엔지니어링 전공"
    }
  ],
  
  about: [
    "사용자의 입장으로 생각하는 것이 중요하다고 생각합니다. 새로운 기술을 배우고, 이를 실제 프로젝트에 적용하여 의미 있는 결과를 만드는 것을 좋아합니다.",
    "저는 사용자의 입장에서 생각하는 것이 중요하다고 믿습니다. 단순히 코드를 작성하는 것이 아니라, 사용자 경험을 고려한 솔루션을 만드는 것을 좋아합니다."
  ],
  
  skills: {
    carousel: [
      { name: "React", icon: "⚛️" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "HTML/CSS", icon: "🌐" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "⚙️" },
      { name: "Python", icon: "🐍" },
      { name: "SQL", icon: "🗄️" },
      { name: "Git", icon: "📚" },
      { name: "Docker", icon: "🐳" },
      { name: "VS Code", icon: "💻" },
      { name: "Figma", icon: "🎭" }
    ],
    categories: {
      "Frontend": ["React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
      "Backend": ["Node.js", "Express", "Python", "SQL"],
      "Tools": ["Git", "Docker", "VS Code", "Figma"]
    }
  },
  
  projects: [
    {
      id: 1,
      title: "포트폴리오 웹사이트",
      description: "개인 포트폴리오를 소개하는 반응형 웹사이트",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      link: "#",
      image: "🌐",
      year: 2024
    },
    {
      id: 2,
      title: "프로젝트 관리 앱",
      description: "팀 협업을 위한 프로젝트 관리 애플리케이션",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#",
      image: "📋",
      year: 2024
    },
    {
      id: 3,
      title: "실시간 채팅 앱",
      description: "WebSocket을 활용한 실시간 메시징 플랫폼",
      technologies: ["React", "Socket.io", "Express"],
      link: "#",
      image: "💬",
      year: 2023
    }
  ],
  
  activities: [
    {
      id: 1,
      title: "웹 개발 스터디 그룹 운영",
      description: "월 1회 정기 모임을 통해 웹 개발 기술 공유",
      period: "2023 - 현재",
      type: "활동"
    },
    {
      id: 2,
      title: "해커톤 참가",
      description: "48시간 웹 개발 해커톤에서 우수상 수상",
      period: "2023",
      type: "수상"
    },
    {
      id: 3,
      title: "오픈소스 기여",
      description: "React 관련 오픈소스 프로젝트에 기여",
      period: "2023 - 현재",
      type: "활동"
    }
  ],
  
  contact: {
    message: "새로운 기회와 협업에 항상 열려있습니다. 편하게 연락주세요!",
    email: "jinhwan@example.com",
    github: "https://github.com/jinhwan",
    linkedin: "https://linkedin.com/in/jinhwan"
  }
};
