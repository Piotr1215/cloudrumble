import React, { useState } from "react";

export default function YouTubeReel({ videos = [] }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-card group cursor-pointer"
            onClick={() => openVideo(video)}
          >
            {/* Terminal header */}
            <div className="terminal-card-header">
              <div className="traffic-lights">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="path">~/videos/{video.videoId}</span>
            </div>

            <div className="flex flex-col h-full">
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs rounded font-mono">
                    {video.duration}
                  </span>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="terminal-file text-lg mb-2 line-clamp-2 group-hover:text-cyan-500 transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm terminal-comment mb-3 line-clamp-2 flex-grow">
                    # {video.description}
                  </p>
                )}
                {video.date && (
                  <p className="text-xs terminal-comment mt-auto">
                    {video.date}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
              onClick={closeModal}
            >
              x
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}