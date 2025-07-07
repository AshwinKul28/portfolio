'use client';
import ShellBox from "@/components/ShellBox";
import Image from 'next/image';
import Link from 'next/link';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: { name: string; color: string }[];
  label: string;
  logo: string;
}

interface OpenSource {
  title: string;
  projects: {
    name: string;
    link: string;
  }[];
  period: string;
  description: string[];
  technologies: { name: string; color: string }[];
}

const experiences: Experience[] = [
    {
        title: "Software Engineer",
        company: "Stripe, India",
        period: "Jul 2025 - Present",
        location: "Bangalore, India",
        description: [
          "Helping increase the global GDP of the internet."
        ],
        technologies: [
        ],
        label: "Work",
        logo: "/images/stripe-logo.svg"
      },    
  {
    title: "Senior Software Engineer",
    company: "IBM, India Software Labs",
    period: "Jul 2020 - Present",
    location: "Bangalore, India",
    description: [
      "Architected and developed large-scale, event-driven systems using Go and microservices architecture",
      "Implemented and maintained CI/CD pipelines using Tekton and Jenkins for cloud automation",
      "Designed and developed REST APIs and microservices for enterprise applications",
      "Worked extensively with Kubernetes, Docker, and cloud-native technologies",
      "Contributed to open-source projects and maintained internal tools"
    ],
    technologies: [
      { name: "Go", color: "text-cyan-400 border-cyan-400" },
      { name: "Kubernetes", color: "text-blue-500 border-blue-500" },
      { name: "Docker", color: "text-blue-300 border-blue-300" },
      { name: "REST APIs", color: "text-green-300 border-green-300" },
      { name: "Microservices", color: "text-fuchsia-400 border-fuchsia-400" },
      { name: "Tekton", color: "text-pink-400 border-pink-400" },
      { name: "Jenkins", color: "text-orange-400 border-orange-400" },
      { name: "PostgreSQL", color: "text-blue-400 border-blue-400" },
      { name: "Redis", color: "text-red-400 border-red-400" },
      { name: "Kafka", color: "text-orange-400 border-orange-400" }
    ],
    label: "Work",
    logo: "/images/ibm-logo.svg"
  },
  {
    title: "Extreme Blue Intern",
    company: "IBM, India Software Labs",
    period: "May 2019 - Jul 2019",
    location: "Bangalore, India",
    description: [
      "Worked on the project by 'building insights' team, where we have developed a ML module to predict and minimize the electricity consumption of the big enterprise",
      "Got Best Project - 1st Runners up position (Public votes) prize in the Extreme Blue internship program"
    ],
    technologies: [
      { name: "Machine Learning", color: "text-purple-400 border-purple-400" },
      { name: "Python", color: "text-blue-400 border-blue-400" },
      { name: "Data Analysis", color: "text-cyan-400 border-cyan-400" },
      { name: "Energy Analytics", color: "text-green-400 border-green-400" },
      { name: "IBM Cloud", color: "text-blue-500 border-blue-500" }
    ],
    label: "Intern",
    logo: "/images/ibm-logo.svg"
  }
];

const openSourceContributions: OpenSource[] = [
  {
    title: "Core Contributor",
    projects: [
      {
        name: "DiceDB",
        link: "https://github.com/DiceDB"
      }
    ],
    period: "2024 - Present",
    description: [
      "Contributing to DiceDB, an open-source, fast, reactive, in-memory database optimized for modern hardware",
      "Working on core features and performance optimizations",
      "Collaborating with the community to improve documentation and code quality"
    ],
    technologies: [
      { name: "Go", color: "text-cyan-400 border-cyan-400" },
      { name: "Database", color: "text-blue-400 border-blue-400" },
      { name: "Reactivity", color: "text-purple-400 border-purple-400" },
      { name: "In-Memory", color: "text-green-400 border-green-400" }
    ]
  },
  {
    title: "Contributor",
    projects: [
      {
        name: "Qiskit Localization",
        link: "https://github.com/Qiskit/documentation"
      },
    ],
    period: "Summer 2022",
    description: [
      "One of the top contributors during the Qiskit Localization Summer Sprint 2022",
      "Received swag from the Qiskit team for contributions",
      "Helped improve Qiskit documentation and localization"
    ],
    technologies: [
      { name: "Documentation", color: "text-blue-400 border-blue-400" },
      { name: "Localization", color: "text-green-400 border-green-400" },
      { name: "Open Source", color: "text-purple-400 border-purple-400" }
    ]
  },
  {
    title: "Hacktoberfest Contributor",
    projects: [
      {
        name: "Vertex",
        link: "https://github.com/vertex-center/vertex"
      },
      {
        name: "Ockam",
        link: "https://github.com/build-trust/ockam"
      }
    ],
    period: "Winter 2023",
    description: [
      "One of the top contributors during the Qiskit Localization Summer Sprint 2022",
      "Received swag from the Qiskit team for contributions",
      "Helped improve Qiskit documentation and localization"
    ],
    technologies: [
      { name: "Go", color: "text-cyan-400 border-cyan-400" },
      { name: "Server", color: "text-green-400 border-green-400" },
      { name: "Open Source", color: "text-purple-400 border-purple-400" }
    ]
  }
];

const sections = [
  { id: 'experience', label: 'career' },
  { id: 'open-source', label: 'opensource' },
];

export default function ExperiencePage() {
  return (
    <div className="flex justify-center relative">
      <div className="flex-1 max-w-2xl space-y-6 px-4 sm:px-6">
        {/* Work Experience Section */}
        <ShellBox id="experience">
          <div className="flex justify-between items-center">
            <p className="text-green-400 text-sm sm:text-base md:text-lg font-mono">$ ls ~/career/</p>
          </div>
          <div className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="text-white">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-mono text-xs sm:text-sm">[{exp.label}]</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold">{exp.title}</h3>
                        <div className="flex items-center gap-2">
                            <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={16}
                                height={16}
                                className="object-contain sm:w-5 sm:h-5"
                            />
                            <span className="inline-block bg-green-900/20 text-green-300 text-xs sm:text-sm px-2 py-0.5 sm:py-1 rounded-md">
                                {exp.company}
                            </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 text-xs sm:text-sm">{exp.period}</p>
                        <p className="text-neutral-400 text-xs sm:text-sm">{exp.location}</p>
                      </div>
                    </div>
                    <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-neutral-300 text-xs sm:text-sm">• {item}</li>
                      ))}
                    </ul>
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`bg-neutral-800/80 border ${tech.color} rounded px-2 sm:px-3 py-0.5 sm:py-1 text-xs`}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ShellBox>

        {/* Open Source Section */}
        <ShellBox id="open-source">
          <div className="flex justify-between items-center">
            <p className="text-green-400 text-sm sm:text-base md:text-lg font-mono">$ opensourcectl get all</p>
          </div>
          <div className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
            {openSourceContributions.map((contribution, index) => (
              <div key={index} className="text-white">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-mono text-xs sm:text-sm">[Open Source]</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold">{contribution.title}</h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                          {contribution.projects.map((project, i) => (
                            <a 
                              key={i}
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-green-900/20 text-green-300 text-xs sm:text-sm px-2 py-0.5 sm:py-1 rounded-md hover:bg-green-900/30 transition-colors"
                            >
                              {project.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 text-xs sm:text-sm">{contribution.period}</p>
                      </div>
                    </div>
                    <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                      {contribution.description.map((item, i) => (
                        <li key={i} className="text-neutral-300 text-xs sm:text-sm">• {item}</li>
                      ))}
                    </ul>
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                      {contribution.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`bg-neutral-800/80 border ${tech.color} rounded px-2 sm:px-3 py-0.5 sm:py-1 text-xs`}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ShellBox>

        <ShellBox>
          {/* Home Link */}
          <Link href="/" className="text-green-400 text-sm sm:text-base md:text-lg font-mono">
              $ cd /home
            </Link>
        </ShellBox>
      </div>

      {/* Vertical Section Indicator - fixed to right center */}
      <div className="hidden lg:flex flex-col items-end gap-4 fixed right-0 top-1/2 -translate-y-1/2 z-50 pr-2">
        {sections.map((section) => (
          <div key={section.id} className="flex items-center gap-2 group">
            <a 
              href={`#${section.id}`}
              className="text-green-400/40 group-hover:text-green-400 font-mono text-base transition-colors"
            >
              {section.label}
            </a>
            <div className="w-0.5 h-8 bg-green-400/40 group-hover:bg-green-400 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 