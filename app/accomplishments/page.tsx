'use client';

import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ShellBox from "@/components/ShellBox";
import Link from 'next/link';

interface Accomplishment {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  badge?: string;
}

// Category to color mapping
const categoryColors: { [key: string]: string } = {
  'certification': 'text-blue-400 border-blue-400',
  'award': 'text-yellow-400 border-yellow-400',
  'outreach': 'text-indigo-400 border-indigo-400',
  'hackathon': 'text-pink-500 border-pink-500',
  'recognition': 'text-yellow-300 border-yellow-300',
  'open source': 'text-orange-300 border-orange-300',
  'patent': 'text-red-400 border-red-400',
  'default': 'text-green-400 border-green-400',
};

const accomplishments: Accomplishment[] = [
    {
        id: 1,
        title: "Certified Kubernetes Application Developer (CKAD)",
        description: "Achieved success in the CKAD exam securing my certification in the first attempt hosted by CNCF 🚀. Mastering Kubernetes has proven invaluable, especially as I've seamlessly applied these concepts in my daily work.",
        date: "2024",
        category: "certification",
        badge: "https://www.credly.com/badges/40905612-70bb-43f9-a4a9-388a88687997/public_url"
    },
    {
        id: 2,
        title: "OTA Award - Email Delivery Feature",
        description: "Received the OTA Award for the Email Delivery feature we shipped earlier this year. Deep dive into tech with legacy Postfix, SMTP, Apache SpamAssassin, custom queues, and Golang—all running on Red Hat UBI images!",
        date: "2024",
        category: "award",
    },
    {
        id: 3,
        title: "Cloud Industry Visit - New Horizon College of Engineering",
        description: "IBM welcomed NHCE students and faculty for a cloud-focused industry visit. Privileged to share cloud expertise with 40+ participants. Thanks to co-speakers and organizers for the amazing experience.",
        date: "2024",
        category: "outreach",
    },
    {
        id: 4,
        title: "Cloud Careers: Growth and Opportunities in 2024",
        description: "Hosted a webinar to highlight the booming opportunities in cloud computing. Covered topics like market growth, in-demand roles, skillsets, and career strategies.",
        date: "2024",
        category: "outreach",
    },
    {
        id: 5,
        title: "IBM Cloud Ideafest Hackathon - Finalist",
        description: "Top 15 out of 100+ teams at IBM Cloud Ideafest Hackathon. Built a productivity summarizer powered by LLMs and prompt engineering. Great appreciation and amazing event at Taj Vivanta, Bangalore!",
        date: "2024",
        category: "hackathon",
    },
    {
        id: 6,
        title: "IBM Tech 2024 - Dubai",
        description: "Incredible experience at IBM Tech 2024 in Dubai. Engaged with global peers on Cloud, Quantum, and AI. Grateful to hear leaders like Dario Gil and Rob Thomas live.",
        date: "2024",
        category: "outreach",
    },
    {
        id: 7,
        title: "Gratitude 2023 - IBM Recognition for University Outreach",
        description: "Recognized at IBM's Gratitude 2023 event for university guest lecturing. Received memento from Sandip Patel. Honored to contribute to student growth and learning.",
        date: "2023",
        category: "recognition",
    },
    {
        id: 8,
        title: "Hacktoberfest 2023 - 10th Edition",
        description: "Wrapped up Hacktoberfest contributing to open source in GoLang and Rust. 5 successful PRs, digital rewards, tree planted, and immense learning.",
        date: "2023",
        category: "open source",
    },
    {
        id: 9,
        title: "Cloud Workshop - M.S. Ramaiah Institute of Technology",
        description: "Engaged in hands-on activities and discussions about cloud computing with final-year CSE and ISA students. Positive feedback and great interaction with the Dean.",
        date: "2023",
        category: "outreach",
    },
    {
        id: 10,
        title: "IBM Certified Associate Developer - Quantum Computation",
        description: "Strong foundation in quantum computing and Qiskit SDK. Created and executed quantum programs on IBM Quantum systems.",
        date: "2023",
        category: "certification",
        badge: "https://www.credly.com/badges/cd6f1e51-eb03-4c39-bca9-5ed5b0a6a570/public_url"
    },
    {
        id: 11,
        title: "Qiskit Advocate",
        description: "Deep involvement with Qiskit. Extensive understanding of circuits, simulators, and quantum algorithms. Active community contributions.",
        date: "2023",
        category: "certification",
        badge: "https://www.credly.com/badges/7d4d67bd-4885-4c3f-b746-3705801d343f/public_url"
    },
    {
        id: 12,
        title: "Qiskit Global Summer School 2023",
        description: "Hands-on labs with Qiskit. Bridged theory and real-world implementation using physics, math, and Python.",
        date: "2023",
        category: "certification",
        badge: "https://www.credly.com/badges/44a7d57d-1f3d-458e-8947-1533a940111f/public_url"
    },
    {
        id: 13,
        title: "IBM Quantum Conversations",
        description: "Articulated quantum computing applications and IBM Quantum's offerings. Learned effective communication for industry-focused messaging.",
        date: "2023",
        category: "certification",
        badge: "https://www.credly.com/badges/aa358ab7-1609-4d4a-a62f-ff3dad6a2637/public_url"
    },
    {
        id: 14,
        title: "IBM India Cloud QSafe Squad",
        description: "Member of a special interest group discussing and demonstrating POCs around cloud q-safe terminologies.",
        date: "2023",
        category: "outreach",
    },
    {
        id: 15,
        title: "Qiskit Advocate Mentorship Program",
        description: "Mentee in Fall 2022 cohort. Worked with a mentor on a 3-month part-time quantum computing project.",
        date: "2022",
        category: "outreach",
        badge: "https://www.credly.com/badges/5dda18e1-23a3-4ac8-a3f7-bfdc3a97f0f9/public_url"
    },
    {
        id: 16,
        title: "Qiskit Localization",
        description: "Top contributor in Qiskit Localization Summer Sprint 2022. Recognized with swag for meaningful contributions.",
        date: "2022",
        category: "open source",
    },
    {
        id: 17,
        title: "Patent Published - Virtual Reality Based Push Notifications",
        description: "My patent from IBM on VR-based push notifications is now live on Google Patents.",
        badge: "https://patents.google.com/patent/US20240087240A1",
        date: "2024",
        category: "patent",
    },
    {
        id: 18,
        title: "IBM Quantum Challenge - Fall 2020",
        description: "Constructed quantum gates and circuits. Showcased strong foundational knowledge of quantum algorithms.",
        date: "2020",
        category: "outreach",
        badge: "https://www.credly.com/badges/13c44834-e0a7-4734-b0fc-8fa53aa5f278/public_url"
    },
    {
      id: 19,
      title: "Guest Lecturer - IIIT Pune",
      description: "Conducted a 3 hours practical session on Quantum Gates and Circuits for the facaulty development program",
      date: "2025",
      category: "outreach"
    }
    ];

const ITEMS_PER_PAGE = 6; // 3 rows × 2 columns

// Get unique categories
const categories = ['*', ...new Set(accomplishments.map(acc => acc.category))];

export default function Accomplishments() {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('*');
  
  // Filter and sort accomplishments based on selected category
  const filteredAccomplishments = (selectedCategory === '*' 
    ? accomplishments 
    : accomplishments.filter(acc => acc.category === selectedCategory)
  ).sort((a, b) => {
    // Sort by year in descending order (newest first)
    return parseInt(b.date) - parseInt(a.date);
  });
  
  const totalPages = Math.ceil(filteredAccomplishments.length / ITEMS_PER_PAGE);
  
  const currentAccomplishments = filteredAccomplishments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <div className="flex justify-center relative">
      <div className="flex-1 max-w-2xl space-y-4 sm:space-y-6 px-3 sm:px-6">
        <ShellBox>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
                <p className="text-green-400 text-xs sm:text-sm md:text-base font-mono">
                $ ls -t ~/accomplishments/
                </p>
                <span className="relative group inline-flex items-center">
                {/* Tooltip ABOVE */}
                <span
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-neutral-900 text-green-400 rounded py-1 px-2 shadow-lg opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity z-50 border border-green-400/30 text-center"
                    style={{ fontSize: '0.70rem' }}
                >
                    Click to filter by category
                </span>

                {/* Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-transparent pr-5 py-0 text-green-400 text-xs sm:text-sm font-mono focus:outline-none cursor-pointer h-5 sm:h-6 min-w-[1.5rem]"
                    style={{
                    minWidth: '1.0rem',
                    width: 'auto',
                    lineHeight: '1.25rem',
                    }}
                >
                    {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                        className={`bg-neutral-800/80 border  text-cyan-400 rounded px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-xs sm:text-sm`}
                        
                    >
                        {category}
                    </option>
                    ))}
                </select>
                </span>
            </div>
            </div>
          
          {/* Grid Layout */}
          <div className="mt-3 sm:mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {currentAccomplishments.map((accomplishment) => (
              <div 
                key={accomplishment.id}
                className="bg-neutral-900/50 p-4 sm:p-5 rounded-lg border border-neutral-800 hover:border-green-400/50 transition-colors flex flex-col justify-between min-h-[180px]"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-green-400 font-mono font-bold text-base sm:text-lg">{accomplishment.title}</h3>
                  <span className="text-xs text-green-400 font-mono font-semibold">{accomplishment.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 mb-4">{accomplishment.description}</p>
                <div className="flex items-end justify-between mt-auto">
                  <span className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-neutral-800/80 border font-mono text-xs sm:text-sm rounded-md ${categoryColors[accomplishment.category.toLowerCase()] || categoryColors.default}`}>
                    {accomplishment.category}
                  </span>
                  {accomplishment.badge && (
                    <a
                      href={accomplishment.badge}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-green-400 hover:text-green-300 transition-colors font-mono"
                    >
                      [badge]
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
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
          )}
        </ShellBox>


        {/* Home Link */}
        <ShellBox>
        <Link href="/" className="text-green-400 text-sm sm:text-base md:text-lg font-mono">
                $ cd /home
            </Link>
        </ShellBox>
      </div>
    </div>
  );
} 