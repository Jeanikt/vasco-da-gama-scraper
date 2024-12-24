require('dotenv').config();

module.exports = {
  DATABASE_PATH: process.env.DATABASE_PATH || './vasco_da_gama.sqlite',
  TEAM_URL: 'https://vasco.com.br',
  PLAYERS_URL: 'https://vasco.com.br/elenco-masculino',
  NEWS_URL: 'https://vasco.com.br/noticias',
  SCRAPE_INTERVAL: 3600000, 
  MAX_RETRIES: 3,
  RETRY_DELAY: 5000,
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};
