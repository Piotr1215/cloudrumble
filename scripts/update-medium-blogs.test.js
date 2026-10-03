// Run: node --test scripts/update-medium-blogs.test.js

const test = require('node:test');
const assert = require('node:assert');
const { parseFeed, mergeBlogs } = require('./update-medium-blogs');

const ITEM = `
<item>
  <title><![CDATA[Tmux &amp; Regex]]></title>
  <link>https://itnext.io/tmux-regex-a37741c4842b?source=rss-3c5c31a7d1d7------2</link>
  <category><![CDATA[tmux]]></category>
  <category><![CDATA[terminal]]></category>
  <pubDate>Mon, 28 Sep 2026 12:22:01 GMT</pubDate>
  <content:encoded><![CDATA[<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*hero" /><figcaption>Photo by <a href="https://unsplash.com">Someone</a> on Unsplash</figcaption></figure><h4>Copy without a mouse</h4><p>Regex &amp; tmux.</p><pre>bind-key y copy</pre><img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=a37741c4842b" width="1" height="1" alt="">]]></content:encoded>
</item>`;

test('parseFeed maps a Medium item to a blogs.json entry', () => {
  const [post] = parseFeed(`<rss><channel>${ITEM}</channel></rss>`);

  assert.deepStrictEqual(post, {
    title: 'Tmux & Regex',
    link: 'https://itnext.io/tmux-regex-a37741c4842b',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/0*hero',
    description: 'Copy without a mouse Regex & tmux....',
    date: 'Sep 28, 2026',
    publishedAt: '2026-09-28T12:22:01.000Z',
    categories: ['tmux', 'terminal']
  });
});

test('parseFeed skips the tracking pixel when a post has no hero image', () => {
  const noHero = ITEM.replace(/<figure>[\s\S]*?<\/figure>/, '');
  const [post] = parseFeed(noHero);

  assert.strictEqual(post.thumbnail, '');
});

test('parseFeed returns nothing for an empty feed', () => {
  assert.deepStrictEqual(parseFeed('<rss><channel></channel></rss>'), []);
});

test('mergeBlogs keeps pinned entries first and drops their feed duplicates', () => {
  const pinned = { link: 'https://a', title: 'pinned', pinned: true };
  const stale = { link: 'https://old', title: 'stale' };
  const feed = [{ link: 'https://b', title: 'new' }, { link: 'https://a', title: 'dup' }];

  assert.deepStrictEqual(mergeBlogs([pinned, stale], feed), [pinned, feed[0]]);
});
