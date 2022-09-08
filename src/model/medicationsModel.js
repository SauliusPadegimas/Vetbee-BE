const db = require('../config');

class Medication {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async save() {
    const sql = 'INSERT INTO medications (name, description) VALUES (?,?)';
    const [rows] = await db.execute(sql, [this.name, this.description]);
    return rows.affectedRows > 0;
  }

  static async getMedications() {
    const sql = 'SELECT id, name, description FROM medications';
    const [rows] = await db.query(sql);
    return rows;
  }

  static async getMedication(id) {
    const sql = 'SELECT id, name, description FROM medications WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows;
  }
}
module.exports = Medication;
