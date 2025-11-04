import React from 'react';
import Layout from '@theme/Layout';
import ActivityHeatmap from '../components/ActivityHeatmap';

export default function Activity() {
  return (
    <Layout
      title="Activity Dashboard"
      description="Track my contributions across YouTube, Medium, and Conference talks"
    >
      <main className="container mx-auto px-4 py-8">
        {/* Activity Heatmap Component */}
        <ActivityHeatmap />
      </main>
    </Layout>
  );
}
