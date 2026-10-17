// Run: node --test scripts/update-youtube-videos.test.js

const test = require('node:test');
const assert = require('node:assert');
const { parseVideos, withRetry } = require('./update-youtube-videos');

function flaky(failures) {
  let calls = 0;
  const fn = async () => {
    calls++;
    if (calls <= failures) {
      throw new Error('Request failed with status 500');
    }
    return 'feed';
  };
  return { fn, calls: () => calls };
}

test('withRetry returns the first success after transient failures', async () => {
  const waits = [];
  const feed = flaky(2);

  const result = await withRetry(feed.fn, { delayMs: 10, sleep: async (ms) => waits.push(ms) });

  assert.strictEqual(result, 'feed');
  assert.strictEqual(feed.calls(), 3);
  assert.deepStrictEqual(waits, [10, 20]);
});

test('withRetry rethrows the last error once attempts run out', async () => {
  const waits = [];
  const feed = flaky(Infinity);

  await assert.rejects(
    withRetry(feed.fn, { attempts: 3, delayMs: 10, sleep: async (ms) => waits.push(ms) }),
    /status 500/
  );
  assert.strictEqual(feed.calls(), 3);
  assert.deepStrictEqual(waits, [10, 20]);
});

test('parseVideos maps a feed entry to a videos.json entry', () => {
  const xml = `<feed><entry>
    <yt:videoId>abc123</yt:videoId>
    <title>Tmux &amp; Vim</title>
    <published>2026-09-28T12:00:00+00:00</published>
    <media:description>Short demo</media:description>
  </entry></feed>`;

  const [video] = parseVideos(xml);

  assert.strictEqual(video.videoId, 'abc123');
  assert.strictEqual(video.title, 'Tmux & Vim');
  assert.strictEqual(video.thumbnail, 'https://img.youtube.com/vi/abc123/maxresdefault.jpg');
  assert.strictEqual(video.description, 'Short demo...');
  assert.strictEqual(video.publishedAt, '2026-09-28T12:00:00+00:00');
});
