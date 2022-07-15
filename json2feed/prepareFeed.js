const fs = require('fs');

async function fetchFeedJSON() {
  const response = await fetch('http://localhost:3000/feed2json/feed2json-output.json');
  const feed = await response.json();
  return feed;
}

fetchFeedJSON().then(feed => {
  const loopPodcasts = () => {

    // Create list of file output
    const feedList = [];

    for (let episodeFeed in feed.podcasts) {
      const podcastRaw = feed.podcasts[episodeFeed];

      // Create podcast object
      const podcast = {}

      // Extract episodes, remove keys, add as objects to array, then add to podcast object
      const episodeArr = [];
      const episodes = {...podcastRaw}; // Do shallow copy instead of reference
      delete episodes['title'];
      for (const episode in episodes) {
        episodeArr.push(episodes[episode]);
      }
      podcast.items = episodeArr.reverse();

      // Add metadata and if necessary rename to fit jsonfeed-to-rss requirements
      podcast.title = podcastRaw.title;
      podcast.description = podcastRaw['1'].content;
      podcast.date_published = podcastRaw['1'].pubDate;
      podcast.icon = podcastRaw['1'].itunes.image;

      podcast.home_page_url = feed.link;
      podcast.feed_url = feed.feedUrl;
      podcast.version = "https://jsonfeed.org/version/1"; // Crucial for jsonfeed-to-rss package

      // Add itunes-related metadata, then change episode image
      podcast._itunes = feed.itunes;
      podcast._itunes.image = podcastRaw['1'].itunes.image;

      // Add metadata for each podcast episode (item)
      for (const [index, item] of podcast.items.entries()) {
        // renaming follows pattern: delete Object.assign(obj, {newKey: obj.oldKey}).oldKey;
        delete Object.assign(item, {attachments: item.enclosure}).enclosure; // Rename enclosure object in each item to attachments
        delete Object.assign(item, {date_published: item.pubDate}).pubDate; // -..- to date_published
        delete Object.assign(item, {url: item.link}).link; // -..- to url
        delete Object.assign(item, {content_html: item.content}).content; // -..- to content_html
        delete Object.assign(item.attachments, {mime_type: item.attachments.type}).type; // -..- to mime_type
        delete Object.assign(item.attachments, {size_in_bytes: item.attachments['length']})['length']; // -..- to size_in_bytes
        item.attachments.duration_in_seconds = parseInt(item.attachments.duration_in_seconds);
        
        item.attachments.title = podcast.title;
        item.image = item.itunes.image;
        
        delete Object.assign(item, {_itunes: item.itunes}).itunes; // Rename itunes to _itunes
        item._itunes.episode = podcast.items.length - index; // Add episode number
        
        const saveAttachments = {...item.attachments};
        item.attachments = [];
        item.attachments.push(saveAttachments);
      }

      const podcastJSON = JSON.stringify(podcast, null, 4);

      const normalizedEpisodeFeed = episodeFeed
                                      .normalize("NFD")
                                      .replace(/\p{Diacritic}/gu, "")
                                      .replace(/\ /g, "_")
                                      .replace(/[\,\;\:\.\?\!]/g, "")
                                      .toLowerCase();

      try {
        fs.writeFileSync(`./feeds/json/${normalizedEpisodeFeed}.json`, podcastJSON);
        // file written successfully
        feedList.push(`${normalizedEpisodeFeed}`)
      } catch (err) {
        console.error(err);
      }
    }

    // Output JSON with feed filenames
    const feedListJSON = JSON.stringify(feedList, null, 4);
    try {
      fs.writeFileSync(`./feeds/feed-list.json`, feedListJSON);
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  }

  loopPodcasts();
});