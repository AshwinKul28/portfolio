import { motion } from "framer-motion";

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  publishedAt: string;
  isLoaded: boolean;
}

const YouTubeVideo = ({ videoId, title, publishedAt, isLoaded }: YouTubeVideoProps) => {
  if (!isLoaded) {
    return (
      <div className="bg-neutral-800/50 rounded-lg overflow-hidden border border-neutral-700 aspect-video animate-pulse">
        <div className="w-full h-full bg-neutral-700/50" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-800/50 rounded-lg overflow-hidden border border-neutral-700"
    >
      <a
        href={`https://youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video"
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </a>
      <div className="p-4">
        <h3 className="font-mono text-lg mb-2 text-green-400">{title}</h3>
        <p className="text-neutral-400 text-sm">
          {new Date(publishedAt).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
};

export default YouTubeVideo; 