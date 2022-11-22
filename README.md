# A2larm podcast parser

[A2larm](https://a2larm.cz/) features more than a dozen well-produced [podcasts](https://a2larm.cz/tema/podcast/). Since they are hosted on Soundcloud, all podcasts are unfortunately only available through one monolithic feed. This parser disentangles this feed with the help of [rss-parser](https://github.com/rbren/rss-parser), then creates a JSON-file for each parsed podcast and finally converts the JSON to an RSS-feed with the help of [jsonfeed-to-rss](https://github.com/bcomnes/jsonfeed-to-rss).

:information_source: **Since [Heroku is eliminating free plans](https://techcrunch.com/2022/08/25/heroku-announces-plans-to-eliminate-free-plans-blaming-fraud-and-abuse/), a static JSON will be available as a [Gist](https://gist.github.com/digicommons/b7fa5297ddb21b46ee63794b5a381098) for the sake of presentation for the time being.** :information_source:

~~Check out the generated output files at [https://a2larm-podcast-parser.herokuapp.com/](https://a2larm-podcast-parser.herokuapp.com/)!~~

## Disclaimer
Currently, the parser only parses podcasts that follow the following episode naming scheme: `Podcast name #10: Podcast title`. This unfortunately excludes a few podcasts/series that would require a more custom filter such as "Volby 2021", "Gig economy" or "Bydlení je nad zlato".

## Roadmap
- Refactor spaghetti code
- Automate scripts

## Deployment
This project is prepared to be deployed on Heroku: A Procfile and build scripts are included, just follow the recommended deployment steps in the [Heroku docs](https://devcenter.heroku.com/articles/git).