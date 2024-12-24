const { scrapeAll } = require('./scraper');
const { connectToDatabase, insertPlayers, insertNews, insertMatches } = require('./database');
const { logger } = require('./utils');
const config = require('./config');

async function main() {
  try {
    logger.info('Starting Vasco da Gama web scraper');
    await connectToDatabase();
    
    while (true) {
      const { players, news, matches } = await scrapeAll();
      
      logger.info(`Scraped ${players.length} players, ${news.length} news items, and ${matches.length} matches`);
      
      if (players.length > 0) {
        await insertPlayers(players);
      }
      
      if (news.length > 0) {
        await insertNews(news);
      }
      
      if (matches.length > 0) {
        await insertMatches(matches);
      }
      
      logger.info(`Waiting ${config.SCRAPE_INTERVAL / 1000} seconds before next scrape`);
      await new Promise(resolve => setTimeout(resolve, config.SCRAPE_INTERVAL));
    }
  } catch (error) {
    logger.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
