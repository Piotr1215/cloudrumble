import React from 'react';

/**
 * InfoCards - A flexible card grid component for displaying table data in a visual format
 *
 * @param {Array} items - Array of objects to display as cards
 * @param {string} titleKey - Key for the card title (e.g., 'Workload Type', 'Feature')
 * @param {Array} fields - Array of field definitions: [{ key: string, label: string, badge: boolean, badgeType: string }]
 * @param {number} columns - Number of columns (default: auto-fit)
 */
const InfoCards = ({ items, titleKey, fields, columns }) => {
  const getBadgeClass = (type) => {
    switch (type) {
      case 'success':
        return 'info-card-badge info-card-badge-success';
      case 'warning':
        return 'info-card-badge info-card-badge-warning';
      case 'danger':
        return 'info-card-badge info-card-badge-danger';
      case 'info':
      default:
        return 'info-card-badge info-card-badge-info';
    }
  };

  const gridStyle = columns ? {
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  } : {};

  return (
    <div className="info-card-grid" style={gridStyle}>
      {items.map((item, index) => (
        <div key={index} className="info-card">
          <div className="info-card-header">
            {item[titleKey]}
          </div>
          <div className="info-card-content">
            {fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <strong className="text-gray-700 dark:text-gray-400">{field.label}:</strong>{' '}
                {field.badge ? (
                  <span className={getBadgeClass(field.badgeType || 'info')}>
                    {item[field.key]}
                  </span>
                ) : (
                  <span>{item[field.key]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
