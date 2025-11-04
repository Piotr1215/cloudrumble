import { useEffect, useState } from 'react';
import videosData from '../data/videos.json';
import blogsData from '../data/blogs.json';
import talksData from '../data/talks.json';

/**
 * Custom hook to aggregate activity data from all platforms
 * Returns activity grouped by date with type information
 */
export function useActivityData() {
  const [activityData, setActivityData] = useState({
    byDate: {},
    stats: {
      totalVideos: 0,
      totalBlogs: 0,
      totalTalks: 0,
      totalActivities: 0,
      currentStreak: 0,
      longestStreak: 0,
    },
    recentActivity: [],
    heatmapData: [],
  });

  useEffect(() => {
    // Aggregate all activities
    const activities = [];

    // Add videos
    videosData.forEach(video => {
      const date = new Date(video.publishedAt);
      activities.push({
        date: date,
        dateString: date.toISOString().split('T')[0],
        type: 'video',
        title: video.title,
        url: `https://youtube.com/watch?v=${video.videoId}`,
        thumbnail: video.thumbnail,
      });
    });

    // Add blogs
    blogsData.forEach(blog => {
      const date = new Date(blog.publishedAt);
      activities.push({
        date: date,
        dateString: date.toISOString().split('T')[0],
        type: 'blog',
        title: blog.title,
        url: blog.link,
        thumbnail: blog.thumbnail,
      });
    });

    // Add talks (only past talks)
    talksData
      .filter(talk => !talk.upcoming)
      .forEach(talk => {
        // Parse date (format: "2025-11" or "2025-11-15")
        let date;
        if (talk.date.length === 7) {
          // Format: "2025-11"
          date = new Date(`${talk.date}-01`);
        } else {
          date = new Date(talk.date);
        }

        activities.push({
          date: date,
          dateString: date.toISOString().split('T')[0],
          type: 'talk',
          title: talk.title,
          url: talk.conferenceUrl || talk.recordingUrl,
          conference: talk.conference,
        });
      });

    // Sort activities by date (newest first)
    activities.sort((a, b) => b.date - a.date);

    // Group by date
    const byDate = {};
    activities.forEach(activity => {
      if (!byDate[activity.dateString]) {
        byDate[activity.dateString] = [];
      }
      byDate[activity.dateString].push(activity);
    });

    // Calculate stats
    const stats = {
      totalVideos: videosData.length,
      totalBlogs: blogsData.length,
      totalTalks: talksData.filter(t => !t.upcoming).length,
      totalActivities: activities.length,
    };

    // Calculate streaks (consecutive days with activity)
    const sortedDates = Object.keys(byDate).sort().reverse();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;

    sortedDates.forEach(dateString => {
      const currentDate = new Date(dateString);

      if (lastDate === null) {
        tempStreak = 1;
      } else {
        const dayDiff = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));
        if (dayDiff === 1) {
          tempStreak++;
        } else {
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          tempStreak = 1;
        }
      }

      lastDate = currentDate;
    });

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    // Current streak (from today backwards)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let checkDate = new Date(today);
    currentStreak = 0;

    while (true) {
      const dateString = checkDate.toISOString().split('T')[0];
      if (byDate[dateString]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    stats.currentStreak = currentStreak;
    stats.longestStreak = longestStreak;

    // Generate heatmap data (last 365 days)
    const heatmapData = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 364); // 365 days total

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      const dayActivities = byDate[dateString] || [];

      heatmapData.push({
        date: dateString,
        count: dayActivities.length,
        activities: dayActivities,
        level: getActivityLevel(dayActivities.length),
      });
    }

    setActivityData({
      byDate,
      stats,
      recentActivity: activities, // All activities for filtering
      heatmapData,
    });
  }, []);

  return activityData;
}

/**
 * Determine activity level for heatmap coloring
 * @param {number} count - Number of activities on that day
 * @returns {number} Level from 0 to 4
 */
function getActivityLevel(count) {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4; // 4 or more
}
