let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');

(async () => {

  let feed = await parser.parseURL('https://feeds.soundcloud.com/users/soundcloud:users:56560035/sounds.rss');

  const obj = {
    title: feed.title,
    link: feed.link,
    feedUrl: feed.feedUrl,
    itunes: feed.itunes,
    podcasts: []
  }

  // All episodes that start with and include a title + #Number
  const regex = /^.+\ ?#\d+/;
  // All podcast names before episode number
  const podcastNameRegex = /^.+(?=#\d+)/i;
  // Podcast number (#1 etc.)
  const podcastNumber = /(?<=#)(\d+)/gim;


  feed.items.forEach(item => {

    if (regex.test(item.title)) {

      // Return podcast name
      let podcastName = item.title.match(podcastNameRegex).toString();

      // Check for space at the end of podcast name, then remove it
      if (podcastName[podcastName.length - 1] === ' ') {
        podcastName = podcastName.slice(0, podcastName.length - 1);
      }

      // Array with lowercase podcast names to compare against in next step
      const lowercasePodcasts = []
      for (podcast of obj.podcasts) {
        if (!lowercasePodcasts.includes(podcast.toLowerCase())) {
          lowercasePodcasts.push(podcast.toLowerCase());
        }
      }

      // Check if podcast already exists and add string to array
      if (!lowercasePodcasts.includes(podcastName.toLowerCase())) {
        obj.podcasts.push(podcastName);
      }
    }
  });

  // Turn array into object with named keys
  obj.podcasts = obj.podcasts.reduce((a, v) => ({ ...a, [v]: {}}), {});

  // Add metadata like podcast title to feed object
  for (podcast in obj.podcasts) {
    obj.podcasts[podcast].title = podcast;
  }

  // If item fits an object key, add it to object
  feed.items.forEach(item => {
    if (regex.test(item.title)) {

      // Return podcast name
      let podcastName = item.title.match(podcastNameRegex).toString();

      // Check for space at the end of podcast name, then remove it
      if (podcastName[podcastName.length - 1] === ' ') {
        podcastName = podcastName.slice(0, podcastName.length - 1);
      }

      /**
       * 
       * If there is a podcast of a similar name (f.e. POP for Pop), adjust item name to fit podcast name.
       * Then add item to matching podcast.
       * Else just add without name adjustment to matching podcast
       * 
       * */  
      if (obj.podcasts[podcastName] === undefined) {
        for (let podcast in obj.podcasts) {
          if (podcast.localeCompare(podcastName, undefined, { sensitivity: 'accent' }) === 0) {
            obj.podcasts[podcast][item.title.match(podcastNumber)] = item;
          }
        }
      } else {
        obj.podcasts[podcastName][item.title.match(podcastNumber)] = item;
      }

    }
  });

  const feedJSON = JSON.stringify(obj, null, 4);

  try {
    // Check if 'feeds' folder exists
    const feedsDir = './feeds'
    if (!fs.existsSync(feedsDir)){
      fs.mkdirSync(feedsDir, { recursive: true });
    }

    // Write full-feed.json
    fs.writeFileSync('./feeds/full-feed.json', feedJSON);

    // file written successfully
  } catch (err) {
    console.error(err);
  }
})();
