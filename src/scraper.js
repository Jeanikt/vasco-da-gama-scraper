const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');
const { logger, sleep } = require('./utils');

async function scrapePlayers() {
  try {
    const response = await axios.get(config.PLAYERS_URL, {
      headers: { 'User-Agent': config.USER_AGENT }
    });
    const $ = cheerio.load(response.data);
    
    const players = [];
    
    $('.jogador').each((_, element) => {
      const player = {
        name: $(element).find('.nome-jogador').text().trim(),
        position: $(element).find('.posicao-jogador').text().trim(),
        number: parseInt($(element).find('.numero-jogador').text().trim(), 10),
        nationality: $(element).find('.nacionalidade-jogador').text().trim(),
        birthDate: $(element).find('.data-nascimento-jogador').text().trim(),
        height: $(element).find('.altura-jogador').text().trim(),
        weight: $(element).find('.peso-jogador').text().trim(),
        url: config.TEAM_URL + $(element).find('a').attr('href')
      };
      players.push(player);
    });
    
    return players;
  } catch (error) {
    logger.error(`Erro ao raspar informações dos jogadores:`, error);
    return [];
  }
}

async function scrapeNews() {
  try {
    const response = await axios.get(config.NEWS_URL, {
      headers: { 'User-Agent': config.USER_AGENT }
    });
    const $ = cheerio.load(response.data);
    
    const newsItems = [];
    
    $('.noticia').each((_, element) => {
      const newsItem = {
        title: $(element).find('.titulo-noticia').text().trim(),
        content: $(element).find('.resumo-noticia').text().trim(),
        date: $(element).find('.data-noticia').text().trim(),
        url: config.TEAM_URL + $(element).find('a').attr('href')
      };
      newsItems.push(newsItem);
    });
    
    return newsItems;
  } catch (error) {
    logger.error(`Erro ao raspar notícias:`, error);
    return [];
  }
}

async function scrapeMatches() {
  try {
    const response = await axios.get(config.TEAM_URL, {
      headers: { 'User-Agent': config.USER_AGENT }
    });
    const $ = cheerio.load(response.data);
    
    const matches = [];
    
    $('.partida').each((_, element) => {
      const match = {
        date: $(element).find('.data-partida').text().trim(),
        competition: $(element).find('.competicao-partida').text().trim(),
        opponent: $(element).find('.adversario-partida').text().trim(),
        result: $(element).find('.resultado-partida').text().trim(),
        score: $(element).find('.placar-partida').text().trim(),
        url: config.TEAM_URL + $(element).find('a').attr('href')
      };
      matches.push(match);
    });
    
    return matches;
  } catch (error) {
    logger.error(`Erro ao raspar partidas:`, error);
    return [];
  }
}

async function scrapeWithRetry(scrapeFunc) {
  for (let i = 0; i < config.MAX_RETRIES; i++) {
    const result = await scrapeFunc();
    if (result.length > 0) return result;
    await sleep(config.RETRY_DELAY);
  }
  return [];
}

async function scrapeAll() {
  const players = await scrapeWithRetry(scrapePlayers);
  const news = await scrapeWithRetry(scrapeNews);
  const matches = await scrapeWithRetry(scrapeMatches);
  
  return { players, news, matches };
}

module.exports = {
  scrapeAll
};

