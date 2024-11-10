import React from 'react';
import { Calendar, Video, Map, Link, ExternalLink } from 'lucide-react';

const TalkCard = ({ talk }) => (
  <div className="talks-card">
    <div className="flex items-start justify-between">
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

export default TalkCard;
