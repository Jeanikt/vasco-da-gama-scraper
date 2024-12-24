const sqlite3 = require('sqlite3').verbose();
const config = require('./config');
const { logger } = require('./utils');

let db;

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    if (!db) {
      db = new sqlite3.Database(config.DATABASE_PATH, (err) => {
        if (err) {
          logger.error('Failed to connect to SQLite database:', err);
          reject(err);
        } else {
          logger.info('Connected to SQLite database');
          createTables().then(resolve).catch(reject);
        }
      });
    } else {
      resolve();
    }
  });
}

function createTables() {
  return new Promise((resolve, reject) => {
    const queries = [
      `CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        number INTEGER,
        nationality TEXT,
        birth_date TEXT,
        height TEXT,
        weight TEXT,
        url TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        date TEXT,
        url TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        competition TEXT,
        opponent TEXT,
        result TEXT,
        score TEXT,
        url TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      queries.forEach((query) => {
        db.run(query, (err) => {
          if (err) {
            logger.error('Error creating table:', err);
            reject(err);
          }
        });
      });
      db.run('COMMIT', (err) => {
        if (err) {
          logger.error('Error committing transaction:', err);
          reject(err);
        } else {
          logger.info('Tables created or already exist');
          resolve();
        }
      });
    });
  });
}

function insertPlayers(players) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT OR REPLACE INTO players (name, position, number, nationality, birth_date, height, weight, url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const stmt = db.prepare(query);
    
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      players.forEach((player) => {
        stmt.run(
          player.name,
          player.position,
          player.number,
          player.nationality,
          player.birthDate,
          player.height,
          player.weight,
          player.url,
          (err) => {
            if (err) {
              logger.error('Error inserting player:', err);
            }
          }
        );
      });
      
      db.run('COMMIT', (err) => {
        if (err) {
          logger.error('Error committing transaction:', err);
          reject(err);
        } else {
          logger.info(`Inserted or updated ${players.length} players`);
          resolve();
        }
      });
    });
    
    stmt.finalize();
  });
}

function insertNews(newsItems) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT OR REPLACE INTO news (title, content, date, url)
      VALUES (?, ?, ?, ?)
    `;
    
    const stmt = db.prepare(query);
    
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      newsItems.forEach((item) => {
        stmt.run(item.title, item.content, item.date, item.url, (err) => {
          if (err) {
            logger.error('Error inserting news item:', err);
          }
        });
      });
      
      db.run('COMMIT', (err) => {
        if (err) {
          logger.error('Error committing transaction:', err);
          reject(err);
        } else {
          logger.info(`Inserted or updated ${newsItems.length} news items`);
          resolve();
        }
      });
    });
    
    stmt.finalize();
  });
}

function insertMatches(matches) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT OR REPLACE INTO matches (date, competition, opponent, result, score, url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const stmt = db.prepare(query);
    
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      matches.forEach((match) => {
        stmt.run(
          match.date,
          match.competition,
          match.opponent,
          match.result,
          match.score,
          match.url,
          (err) => {
            if (err) {
              logger.error('Error inserting match:', err);
            }
          }
        );
      });
      
      db.run('COMMIT', (err) => {
        if (err) {
          logger.error('Error committing transaction:', err);
          reject(err);
        } else {
          logger.info(`Inserted or updated ${matches.length} matches`);
          resolve();
        }
      });
    });
    
    stmt.finalize();
  });
}

module.exports = {
  connectToDatabase,
  insertPlayers,
  insertNews,
  insertMatches
};
