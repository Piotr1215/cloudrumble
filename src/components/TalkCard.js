import React, { useState } from 'react';
import { Calendar, Video, Map, Link, ExternalLink } from 'lucide-react';

// Function to extract YouTube video ID from various YouTube URL formats
const getYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  // Handle youtu.be URLs
  if (url.includes('youtu.be')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return id || null;
  }
  
  // Handle youtube.com URLs
  const matches = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return matches && matches[1] ? matches[1] : null;
};

// Default fallback image path
const DEFAULT_THUMBNAIL = '/static/img/talks/default-talk-thumbnail.svg';

const TalkCard = ({ talk }) => {
  const [imageFailed, setImageFailed] = useState(false);
  
  // Extract YouTube ID if recording URL exists
  const youtubeId = talk.recordingUrl ? getYouTubeId(talk.recordingUrl) : null;
  
  // Source URL based on load state
  const thumbnailSrc = imageFailed
    ? DEFAULT_THUMBNAIL
    : (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : DEFAULT_THUMBNAIL);
  
  // Link and content properties
  const isExternalLink = talk.recordingUrl && youtubeId && !imageFailed;
  const linkHref = isExternalLink 
    ? talk.recordingUrl 
    : (talk.workshopUrl || talk.conferenceUrl || '#');
    
  return (
    <div className="talks-card">
      <div className="flex items-start justify-between flex-col md:flex-row gap-6">
        {/* Thumbnail section */}
        <div className="flex-shrink-0 w-full md:w-64">
          <a 
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`block overflow-hidden rounded-lg hover:opacity-90 transition-opacity ${!isExternalLink && !talk.workshopUrl && !talk.conferenceUrl ? 'pointer-events-none' : ''}`}
          >
            <img 
              src={thumbnailSrc}
              alt={talk.title}
              className="w-full h-auto object-cover"
              onError={() => setImageFailed(true)}
            />
          </a>
        </div>
        
        {/* Content section */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="talks-title">{talk.title}</h3>
            <div className="flex gap-2">
              {talk.slidesUrl && (
                <a 
                  href={talk.slidesUrl}
                  className="talks-link"
                  title="View Slides"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Link size={20} />
                </a>
              )}
              {talk.conferenceUrl && (
                <a 
                  href={talk.conferenceUrl}
                  className="talks-link"
                  title="Conference Page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>
          
          <p className="talks-description">{talk.description}</p>
          
          <div className="talks-metadata">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{talk.date}</span>
            </div>
            {talk.conference && (
              <div className="flex items-center gap-1">
                <Map size={16} />
                <span>{talk.conference}</span>
              </div>
            )}
            {talk.recordingUrl && (
              <a 
                href={talk.recordingUrl}
                className="talks-recording-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Video size={16} />
                <span>Watch Recording</span>
              </a>
            )}
            {talk.type === 'workshop' && talk.workshopUrl && (
              <a 
                href={talk.workshopUrl}
                className="talks-recording-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link size={16} />
                <span>Try Workshop</span>
              </a>
            )}
          </div>

          {talk.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {talk.tags.map((tag, index) => (
                <span key={index} className="talks-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkCard;
