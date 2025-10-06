import React from 'react';
import Layout from '@theme/Layout';
import Projects from '@site/src/components/Projects';

export default function ProjectsPage() {
  return (
    <Layout
      title="Open Source Projects"
      description="Open source tools, plugins, and utilities created by Piotr Zaniewski"
    >
      <main className="container mx-auto px-4 py-12">
        <Projects />
      </main>
    </Layout>
  );
}
