const db = require('../config');

class Log {
  constructor(petId, description, status) {
    this.petId = petId;
    this.description = description;
    this.status = status;
  }

  async save() {
    const sql = 'INSERT INTO logs (pet_id, description, status) VALUES (?, ?, ?)';
    const [rows] = await db.execute(sql, [this.petId, this.description, this.status]);
    return rows.affectedRows > 0;
  }

  static async getLogs() {
    const sql = 'SELECT * FROM logs';
    const [rows] = await db.query(sql);
    return rows;
  }

  static async getLog(id) {
    const sql = 'SELECT logs.description, status, pets.name, pets.dob, pets.client_email FROM logs LEFT JOIN pets ON logs.pet_id = pets.id WHERE logs.pet_id = ? ';
    const [rows] = await db.execute(sql, [id]);
    return rows;
  }
}
module.exports = Log;
