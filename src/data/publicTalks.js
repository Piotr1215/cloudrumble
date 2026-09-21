// Talks the site may show: delivered (completed) or confirmed (accepted).
// Submissions and any other pipeline status in talks.json stay private.
const talks = require('./talks.json');

const PUBLIC_STATUSES = ['completed', 'accepted'];

module.exports = talks.filter(t => PUBLIC_STATUSES.includes(t.status));
