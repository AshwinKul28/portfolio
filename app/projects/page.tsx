'use client';

import { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import ShellBox from '../../components/ShellBox';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const projects = [
  {
    title: 'DevTools',
    description: 'A collection of developer tools for the web.',
    githubUrl: 'https://github.com/AshwinKul28/devtools',
    stars: 1,
    forks: 0,
    language: 'TypeScript'
  },
  {
    title: 'Portfolio',
    description: 'My personal portfolio website built with Next.js and Tailwind CSS, featuring a modern and interactive terminal interface.',
    githubUrl: 'https://github.com/AshwinKul28/portfolio',
    stars: 1,
    forks: 2,
    language: 'TypeScript'
  },
  {
    title: 'Dice',
    description: 'An in-memory real-time database with SQL-based reactivity, optimized for building and scaling truly real-time applications.',
    githubUrl: 'https://github.com/AshwinKul28/dice',
    stars: 10559,
    forks: 1396,
    language: 'Go'
  },
  {
    title: 'Git Stat',
    description: 'A tool for analyzing and visualizing Git repository statistics and contribution patterns.',
    githubUrl: 'https://github.com/AshwinKul28/git-stat',
    stars: 1,
    forks: 0,
    language: 'Go'
  },
  {
    title: 'Memtier Benchmark',
    description: 'A high-performance benchmarking tool for Redis and Memcached, providing detailed performance metrics.',
    githubUrl: 'https://github.com/AshwinKul28/memtier_benchmark',
    stars: 1,
    forks: 0,
    language: 'C'
  },
];

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  return (
    <div className="flex justify-center relative">
      <div className="flex-1 max-w-2xl space-y-6 px-4 sm:px-6">
        <ShellBox>
          <div className="flex justify-between items-center">
            <p className="text-green-400 text-sm sm:text-base md:text-lg font-mono">$ ls ~/projects/</p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {currentProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-1 sm:p-2 rounded-full ${
                currentPage === 1 
                  ? 'text-neutral-700 cursor-not-allowed' 
                  : 'text-green-400 hover:text-green-300 hover:bg-neutral-800'
              } transition-colors`}
            >
              <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full font-mono text-xs sm:text-sm ${
                    currentPage === page
                      ? 'bg-green-400 text-neutral-950'
                      : 'text-green-400 hover:bg-neutral-800'
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-1 sm:p-2 rounded-full ${
                currentPage === totalPages 
                  ? 'text-neutral-700 cursor-not-allowed' 
                  : 'text-green-400 hover:text-green-300 hover:bg-neutral-800'
              } transition-colors`}
            >
              <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </ShellBox>

        <ShellBox>
          <Link href="/" className="text-green-400 text-sm sm:text-base md:text-lg font-mono">
            $ cd /home
          </Link>
        </ShellBox>
      </div>
    </div>
  );
} 