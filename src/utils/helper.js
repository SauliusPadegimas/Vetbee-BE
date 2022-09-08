const db = require('../config');

async function testDbConnection() {
  try {
    await db.query('SELECT 1');
    // console.log('rows ===', rows);
    console.log(`Connected to MYSQL DB ${process.env.DB_DATABASE}`.bgCyan.bold);
  } catch (error) {
    console.log(`Error connecting to db ${error.message}`.bgRed.bold);
    // console.log('error ===', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('is server running?'.yellow);
    }
  }
}
module.exports = testDbConnection;
