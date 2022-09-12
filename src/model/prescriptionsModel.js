const db = require('../config');

class Prescription {
  constructor(medId, comment) {
    this.medId = medId;
    this.comment = comment;
  }

  async save(id) {
    const sql = 'INSERT INTO prescriptions (medication_id, pet_id, comment) VALUES (?,?,?)';
    const [rows] = await db.execute(sql, [this.medId, +id, this.comment]);
    console.log('rows.affectedRows ===', rows.affectedRows);
    if (rows.affectedRows > 0) return true;
    return false;
  }

  static async getPres(id) {
    const sql = 'SELECT pets.name AS client, medications.name AS medication, prescriptions.comment AS description, prescriptions.timestamp AS isued FROM prescriptions LEFT JOIN medications ON prescriptions.medication_id = medications.id LEFT JOIN pets ON prescriptions.pet_id = pets.id WHERE prescriptions.pet_id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows;
  }
}
module.exports = Prescription;
