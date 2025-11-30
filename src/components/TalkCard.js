import React, { useState } from 'react';

// Function to extract YouTube video ID from various YouTube URL formats
const getYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;

  if (url.includes('youtu.be')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return id || null;
  }

  const matches = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return matches && matches[1] ? matches[1] : null;
};

const DEFAULT_THUMBNAIL = '/img/talks/default-talk-thumbnail.svg';

const TalkCard = ({ talk }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const youtubeId = talk.recordingUrl ? getYouTubeId(talk.recordingUrl) : null;

  const thumbnailSrc = imageFailed
    ? DEFAULT_THUMBNAIL
    : (talk.thumbnailUrl ? talk.thumbnailUrl :
      (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : DEFAULT_THUMBNAIL));

  const linkHref = talk.recordingUrl || talk.conferenceUrl || talk.workshopUrl || '#';
  const hasLink = talk.recordingUrl || talk.conferenceUrl || talk.workshopUrl;

  return (
    <div className="terminal-card">
      {/* Terminal header */}
      <div className="terminal-card-header">
        <div className="traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="path">~/talks/{talk.date}/{talk.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}</span>
      </div>

      <div className="terminal-card-body">
        {/* Badges row */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className="terminal-comment">{talk.date}</span>
          {talk.upcoming && (
            <span className="px-2 py-0.5 text-xs font-bold text-yellow-900 dark:text-yellow-300 bg-yellow-200 dark:bg-yellow-900/50 rounded">
              UPCOMING
            </span>
          )}
          {talk.type === 'keynote' && (
            <span className="px-2 py-0.5 text-xs font-bold text-purple-900 dark:text-purple-300 bg-purple-200 dark:bg-purple-900/50 rounded">
              KEYNOTE
            </span>
          )}
          {talk.type === 'workshop' && (
            <span className="px-2 py-0.5 text-xs font-bold text-green-900 dark:text-green-300 bg-green-200 dark:bg-green-900/50 rounded">
              WORKSHOP
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-full md:w-48">
            <a
              href={hasLink ? linkHref : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`block overflow-hidden rounded border border-gray-300 dark:border-gray-600 hover:opacity-90 transition-opacity ${!hasLink ? 'pointer-events-none' : ''}`}
            >
              <img
                src={thumbnailSrc}
                alt={talk.title}
                className="w-full h-auto object-cover"
                onError={() => setImageFailed(true)}
              />
            </a>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="terminal-file text-lg mb-1 break-words">
              {talk.title}
            </h3>

            {talk.conference && (
              <div className="text-sm terminal-comment mb-2">
                # {talk.conference}
              </div>
            )}

            <p className="text-sm terminal-comment mb-3 line-clamp-2">
              {talk.description}
            </p>

            {/* Links as commands */}
            <div className="flex flex-wrap gap-3 text-sm">
              {talk.recordingUrl && (
                <a
                  href={talk.recordingUrl}
                  className="terminal-link terminal-link-green"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ./watch.sh
                </a>
              )}
              {talk.slidesUrl && (
                <a
                  href={talk.slidesUrl}
                  className="terminal-link terminal-link-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ./slides.pdf
                </a>
              )}
              {talk.conferenceUrl && (
                <a
                  href={talk.conferenceUrl}
                  className="terminal-link terminal-link-purple"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ./conference.url
                </a>
              )}
              {talk.type === 'workshop' && talk.workshopUrl && (
                <a
                  href={talk.workshopUrl}
                  className="terminal-link text-orange-600 dark:text-orange-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ./workshop.sh
                </a>
              )}
            </div>

            {/* Tags */}
            {talk.tags && talk.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {talk.tags.map((tag, index) => (
                  <span key={index} className="terminal-tag">
                    .{tag.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkCard;
