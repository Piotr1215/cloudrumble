import React from 'react';

/**
 * DataGrid - Modern table component with grid layout
 *
 * @param {Array} columns - Column definitions: [{ key: string, label: string, badge: boolean, badgeType: string }]
 * @param {Array} data - Array of row objects
 * @param {boolean} striped - Alternating row colors (default: true)
 * @param {boolean} hover - Row hover effect (default: true)
 */
const DataGrid = ({ columns, data, striped = true, hover = true }) => {
  const getBadgeClass = (type) => {
    const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block whitespace-nowrap';
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100`;
      case 'danger':
        return `${baseClasses} bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100`;
      case 'info':
      default:
        return `${baseClasses} bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100`;
    }
  };

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700`}>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`
                ${striped && rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                ${hover ? 'hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors' : ''}
              `}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {column.badge ? (
                    <span className={getBadgeClass(column.badgeType || 'info')}>
                      {row[column.key]}
                    </span>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
