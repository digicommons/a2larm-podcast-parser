const fs = require('fs');
const jsonfeedToRSS = require('jsonfeed-to-rss');
const fileList = require('../feeds/feed-list.json');

for (const file of fileList) {
  const episodeJSONFeed = require(`../feeds/json/${file}.json`);

  const rssFeed = jsonfeedToRSS(episodeJSONFeed);

  try {
    // Check if 'feeds/rss' folder exists
    const feedsDir = './feeds/rss'
    if (!fs.existsSync(feedsDir)){
      fs.mkdirSync(feedsDir, { recursive: true });
    }

    // Write podcast information to .rss file
    fs.writeFileSync(`./feeds/rss/${file}.rss`, rssFeed);

    // file written successfully
  } catch (err) {
    console.error(err);
  }
}