// Portfolio data structure for Jinhwan Yoon
export const portfolioData = {
  personal: {
    name: "윤진환",
    title: "사용자 경험과 인터랙션 구현에 강한 프론트엔드 개발자",
    email: "www139455@naver.com",
    github: "https://github.com/jinhwan",
    instagram: "https://www.instagram.com/angler_jinhwan/",
    bio: "웹 프론트엔드를 중심으로 사용자 흐름과 화면 상호작용을 설계하고 구현하는 과정에 강점이 있습니다. 새로운 기술도 프로젝트에 맞게 빠르게 익혀 적용하며, 완성도 있는 결과물로 연결하는 것을 중요하게 생각합니다.",
  },

  education: [
    {
      id: 1,
      school: "신라대학교",
      major: "컴퓨터공학과",
      period: "2023.03 - 2027.02",
      description: "웹 개발과 소프트웨어 엔지니어링 전공",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Tailwind CSS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "HTML5",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS3",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
      ],
    },
    {
      category: "Backend",
      items: [
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
        {
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
      ],
    },
    {
      category: "Tools",
      items: [
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "Notion",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
        },
        {
          name: "VS Code",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        },
        {
          name: "Figma",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        },
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "CertHub",
      description:
        "자격증 관련 정보를 검색하고 관리하는 웹 플랫폼. 사용자가 원하는 자격증을 쉽게 찾고 정보를 얻을 수 있습니다.",
      technologies: ["JavaScript", "CSS", "Firebase"],
      link: "https://github.com/Team-CertHub/Project_CertHub",
      icon: "badgeCheck",
      year: 2025,
    },
    {
      id: 2,
      title: "Project_TW",
      description:
        "Unity 기반 스테이지 게임. 팀 프로젝트로 게임 개발 경험을 쌓았으며, 오브젝트 스크립트 담당.",
      technologies: ["Unity", "C#", "ShaderLab", "Firebase"],
      link: "https://github.com/hakurua-ichi/Project_TW",
      icon: "gamepad",
      year: 2025,
    },
    {
      id: 3,
      title: "Fishing Calendar",
      description:
        "낚시 캘린더 애플리케이션. 낚시 일정 관리와 정보 제공 기능을 포함합니다.",
      technologies: ["JavaScript", "HTML", "CSS"],
      link: "https://github.com/yunjinhwa/fishing_calendar",
      icon: "fish",
      year: 2026,
    },
    {
      id: 4,
      title: "Run Snap Expedition",
      description:
        "Unity 기반 모바일 게임. 스와이프 인식 기능을 포함한 게임 개발 프로젝트입니다.",
      technologies: ["Unity", "C#", "ShaderLab", "HLSL"],
      link: "https://github.com/yunjinhwa/Run_Snap_Expedition",
      icon: "footprints",
      year: 2025,
    },
    {
      id: 5,
      title: "translatorS",
      description:
        "웹 기반 번역 애플리케이션. 여러 언어 간 번역을 지원하는 간편한 도구입니다.",
      technologies: ["JavaScript", "HTML", "CSS"],
      link: "https://github.com/yunjinhwa/translatorS",
      icon: "languages",
      year: 2024,
    },
  ],

  activities: [
    {
      id: 1,
      title: "컴퓨터공학과 부학회장",
      description:
        "학과 행사와 운영 업무를 함께 조율하며, 구성원과 학생회 사이의 소통을 맡아 협업과 책임감을 쌓고 있습니다.",
      period: "2026 - 현재",
      type: "리더십",
    },
    {
      id: 2,
      title: "In&Out 동아리",
      description: "다양한 프로젝트 진행 및 참가 / 공모전 참가",
      period: "2025 - 현재",
      type: "활동",
    },
    {
      id: 3,
      title: "취,창업 스터디",
      description: "취업과 창업 관련 정보 공유 및 준비 활동",
      period: "2026 - 현재",
      type: "활동",
    },
  ],
};
