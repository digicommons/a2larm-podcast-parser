# A2larm podcast parser

[A2larm](https://a2larm.cz/) features more than a dozen well-produced [podcasts](https://a2larm.cz/tema/podcast/). Since they are hosted on Soundcloud, all podcasts are unfortunately only available through one monolithic feed. This parser disentangles this feed with the help of [rss-parser](https://github.com/rbren/rss-parser), then creates a JSON-file for each parsed podcast and finally converts the JSON to an RSS-feed with the help of [jsonfeed-to-rss](https://github.com/bcomnes/jsonfeed-to-rss).

## Disclaimer
Currently, the parser is only parsing podcasts that follow the following episode naming scheme: `Podcast name #10: Podcast title`. This unfortunately excludes a few podcasts/series that would require a more custom filter such as "Volby 2021", "Gig economy" or "Bydlení je nad zlato".

## Roadmap
- Refactore spaghetti code
- Automate scripts