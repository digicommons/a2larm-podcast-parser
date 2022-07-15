const fs = require('fs');
const jsonfeedToRSS = require('jsonfeed-to-rss');
const fileList = require('../feeds/feed-list.json');

for (const file of fileList) {
  const episodeJSONFeed = require(`../feeds/json/${file}.json`);

  const rssFeed = jsonfeedToRSS(episodeJSONFeed);

  try {
    fs.writeFileSync(`./feeds/rss/${file}.rss`, rssFeed);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}