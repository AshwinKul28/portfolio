"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShellBox from "../../components/ShellBox";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import YouTubeVideo from "../../components/YouTubeVideo";

interface Video {
  id: string;
  title: string;
  publishedAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

interface YouTubeResponse {
  items: Array<{
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      title: string;
      publishedAt: string;
    };
  }>;
}

interface MediumResponse {
  status: string;
  items: Array<{
    guid: string;
    title: string;
    description: string;
    pubDate: string;
    link: string;
  }>;
}

// Your YouTube channel ID - you can find this in your channel URL
const CHANNEL_ID = "UC4dTM594UUCw8rsMIMkdj7Q"; // Replace with your actual channel ID from YouTube
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const MEDIUM_USERNAME = "ashwin.kulkarni128";

const DigitalShelf = () => {
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videosPerPage = 4;
  const blogsPerPage = 4;
  const [loadedVideoIds, setLoadedVideoIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchVideos = async () => {
      if (!API_KEY) {
        setError(`YouTube API key is not configured. Please check your .env.local file. Current value: ${API_KEY}`);
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching videos with API key:', API_KEY.substring(0, 5) + '...');
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`YouTube API error: ${errorData.error?.message || response.statusText}`);
        }
        
        const data = await response.json() as YouTubeResponse;
        
        if (!data.items || !Array.isArray(data.items)) {
          throw new Error('Invalid response format from YouTube API');
        }

        const formattedVideos = data.items
          .filter((item) => item.id?.kind === "youtube#video" && item.id?.videoId)
          .map((item) => ({
            id: item.id.videoId,
            title: item.snippet?.title || 'Untitled Video',
            publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
          }));
        
        setVideos(formattedVideos);
        setError(null);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`);
        const data = await response.json() as MediumResponse;
        
        if (data.status === 'ok' && data.items) {
          const formattedPosts = data.items.map((item) => ({
            id: item.guid,
            title: item.title,
            excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            date: item.pubDate,
            url: item.link
          }));
          setBlogPosts(formattedPosts);
        } else {
          throw new Error('Failed to fetch blog posts');
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchVideos();
    fetchBlogPosts();
  }, []);

  // Effect to handle lazy loading of video data
  useEffect(() => {
    const currentVideos = paginatedVideos;
    const unloadedVideos = currentVideos.filter(video => !loadedVideoIds.has(video.id));
    
    if (unloadedVideos.length > 0) {
      unloadedVideos.forEach(video => {
        setLoadedVideoIds(prev => new Set([...prev, video.id]));
      });
    }
  }, [currentVideoPage, videos]);

  const totalVideoPages = Math.ceil(videos.length / videosPerPage);
  const totalBlogPages = Math.ceil(blogPosts.length / blogsPerPage);

  const paginatedVideos = videos.slice(
    (currentVideoPage - 1) * videosPerPage,
    currentVideoPage * videosPerPage
  );

  const paginatedBlogs = blogPosts.slice(
    (currentBlogPage - 1) * blogsPerPage,
    currentBlogPage * blogsPerPage
  );

  const sections = [
    { id: 'blogs', label: 'blogs' },
    { id: 'videos', label: 'videos' },
  ];

  return (
    <div className="flex justify-center relative min-h-screen overflow-x-hidden">
      <div className="flex-1 max-w-2xl space-y-6 px-4 sm:px-6 py-20">
                {/* Blog Section */}
                <ShellBox id="blogs">
          <div className="flex justify-between items-center">
            <p className="text-green-400 text-sm sm:text-base md:text-lg font-mono">cd ~/shelf/blogs</p>
          </div>
          <div className="mt-8">
            {blogLoading ? (
              <div className="text-green-400 text-center py-8">Loading blog posts...</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-green-400 text-center py-8">No blog posts found</div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {paginatedBlogs.map((post) => (
                    <motion.article
                      key={post.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-neutral-800/50 rounded-lg p-4 sm:p-6 border border-neutral-700"
                    >
                      <h3 className="font-mono text-xl mb-3 text-green-400">{post.title}</h3>
                      <p className="text-neutral-400 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-500">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors font-mono"
                        >
                          Read →
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Blog Pagination */}
                <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8">
                  <button
                    onClick={() => setCurrentBlogPage(p => Math.max(1, p - 1))}
                    disabled={currentBlogPage === 1}
                    className={`p-1 sm:p-2 rounded-full ${
                      currentBlogPage === 1 
                        ? 'text-neutral-700 cursor-not-allowed' 
                        : 'text-green-400 hover:text-green-300 hover:bg-neutral-800'
                    } transition-colors`}
                  >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  
                  <div className="flex gap-1 sm:gap-2">
                    {Array.from({ length: totalBlogPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentBlogPage(page)}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full font-mono text-xs sm:text-sm ${
                          currentBlogPage === page
                            ? 'bg-green-400 text-neutral-950'
                            : 'text-green-400 hover:bg-neutral-800'
                        } transition-colors`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentBlogPage(p => Math.min(totalBlogPages, p + 1))}
                    disabled={currentBlogPage === totalBlogPages}
                    className={`p-1 sm:p-2 rounded-full ${
                      currentBlogPage === totalBlogPages 
                        ? 'text-neutral-700 cursor-not-allowed' 
                        : 'text-green-400 hover:text-green-300 hover:bg-neutral-800'
                    } transition-colors`}
                  >
                    <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </ShellBox>
        
        {/* YouTube Section */}
        <ShellBox id="videos">
          <div className="flex justify-between items-center">
            <p className="text-green-400 text-sm sm:text-base md:text-lg font-mono">cd ~/shelf/videos</p>
          </div>
          <div className="mt-8">
            {loading ? (
              <div className="text-green-400 text-center py-8">Loading videos...</div>
            ) : error ? (
                <div className="text-red-400 text-center py-8">
                    🐢 Hmm... that took a wrong turn
                    <p className="text-sm mt-2 text-neutral-400">
                      Let&apos;s try that again. Maybe the internet turtles are tired 🐢💤
                    </p>
                </div>
            ) : videos.length === 0 ? (
              <div className="text-green-400 text-center py-8">No videos found</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {paginatedVideos.map((video) => (
                    <YouTubeVideo
                      key={video.id}
                      videoId={video.id}
                      title={video.title}
                      publishedAt={video.publishedAt}
                      isLoaded={loadedVideoIds.has(video.id)}
                    />
                  ))}
                </div>
                
                {/* Video Pagination */}
                <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6">
                  <button
                    onClick={() => setCurrentVideoPage(p => Math.max(1, p - 1))}
                    disabled={currentVideoPage === 1}
                    className={`p-1 sm:p-2 rounded-full ${
                      currentVideoPage === 1 
                        ? 'text-neutral-700 cursor-not-allowed' 
                        : 'text-green-400 hover:text-green-300 hover:bg-neutral-800'
                    } transition-colors`}
                  >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  
                  <div className="flex gap-1 sm:gap-2">
                    {Array.from({ length: totalVideoPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentVideoPage(page)}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full font-mono text-xs sm:text-sm ${
                          currentVideoPage === page
                            ? 'bg-green-400 text-neutral-950'
                            : 'text-green-400 hover:bg-neutral-800'
                        } transition-colors`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentVideoPage(p => Math.min(totalVideoPages, p + 1))}
                    disabled={currentVideoPage === totalVideoPages}
                    className={`p-1 sm:p-2 rounded-full ${
                      currentVideoPage === totalVideoPages 
                        ? 'text-neutral-700 cursor-not-allowed' 
                        : 'text-green-400 hover:text-green-300 hover:bg-neutral-800'
                    } transition-colors`}
                  >
                    <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </ShellBox>

        <ShellBox>
          <Link href="/" className="text-green-400 text-sm sm:text-base md:text-lg font-mono">
            $ cd /home
          </Link>
        </ShellBox>

        {/* Vertical Section Indicator - fixed to right center */}
        <div className="hidden lg:flex flex-col items-end gap-4 fixed right-0 top-1/2 -translate-y-1/2 z-10 pr-2">
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
    </div>
  );
};

export default DigitalShelf; 