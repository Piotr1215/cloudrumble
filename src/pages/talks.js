import React from 'react';
import Layout from '@theme/Layout';
import TalksPage from '@site/src/components/Talks';

export default function Talks() {
  return (
    <Layout title="Talks" description="Conference talks and workshops">
      <main className="px-4 py-12">
        <TalksPage />
      </main>
    </Layout>
  );
}
