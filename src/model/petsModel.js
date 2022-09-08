const db = require('../config');

class Pet {
  constructor(name, dob, email) {
    this.name = name;
    this.dob = dob;
    this.email = email;
  }

  async save() {
    const sql = 'INSERT INTO pets(name, dob, client_email) VALUES (?,?,?)';
    const [rows] = await db.execute(sql, [this.name, this.dob, this.email]);
    if (rows.affectedRows > 0) return true;
    return false;
  }

  static async getPets() {
    const sql = 'SELECT id, name, dob, client_email FROM pets WHERE archived = false';
    const [rows] = await db.query(sql);
    return rows;
  }

  static async getPet(id) {
    const sql = 'SELECT id, name, dob, client_email FROM pets WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows;
  }

  static async delete(id) {
    const sql = 'UPDATE pets SET archived = 1 WHERE id = ? AND archived = 0';
    const [rows] = await db.execute(sql, [id]);
    console.log('rows ===', rows);
    if (rows.affectedRows > 0) return true;
    return false;
  }
}
module.exports = Pet;
