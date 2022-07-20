# A2larm podcast parser

[A2larm](https://a2larm.cz/) features more than a dozen well-produced [podcasts](https://a2larm.cz/tema/podcast/). Since they are hosted on Soundcloud, all podcasts are unfortunately only available through one monolithic feed. This parser disentangles this feed with the help of [rss-parser](https://github.com/rbren/rss-parser), then creates a JSON-file for each parsed podcast and finally converts the JSON to an RSS-feed with the help of [jsonfeed-to-rss](https://github.com/bcomnes/jsonfeed-to-rss).

Check out the generated output files at [https://a2larm-podcast-parser.herokuapp.com/](https://a2larm-podcast-parser.herokuapp.com/)!

## Disclaimer
Currently, the parser only parses podcasts that follow the following episode naming scheme: `Podcast name #10: Podcast title`. This unfortunately excludes a few podcasts/series that would require a more custom filter such as "Volby 2021", "Gig economy" or "Bydlení je nad zlato".

## Roadmap
- Refactor spaghetti code
- Automate scripts

## Deployment
This project is prepared to be deployed on Heroku: A Procfile and build scripts are included, just follow the recommended deployment steps in the [Heroku docs](https://devcenter.heroku.com/articles/git).