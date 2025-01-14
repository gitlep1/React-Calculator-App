const db = require("../db/dbConfig.js");

const getAllCalculations = async () => {
  const query = "SELECT id, expression, result, date FROM calculations";
  const calculations = await db.any(query);
  return calculations;
};

const getAllUserCalculations = async (userID) => {
  const query = "SELECT * FROM calculations WHERE user_id = $1";
  const calculations = await db.any(query, [userID]);
  return calculations;
};

const getCalculationByID = async (id) => {
  const query = "SELECT * FROM calculations WHERE id = $1";
  const calculation = await db.oneOrNone(query, id);
  return calculation;
};

const createCalculation = async (calculation) => {
  const query =
    "INSERT INTO calculations (user_id, expression, result) VALUES ($1, $2, $3) RETURNING *";
  const newCalculation = await db.oneOrNone(query, [
    calculation.user_id,
    calculation.expression,
    calculation.result,
  ]);
  return newCalculation;
};

const updateCalculation = async (id, calculation) => {
  const query =
    "UPDATE calculations SET expression = $1, result = $2 WHERE id = $3 RETURNING *";
  const updateCalculation = await db.oneOrNone(query, [
    calculation.expression,
    calculation.result,
    id,
  ]);
  return updateCalculation;
};

const deleteCalculation = async (id) => {
  const query = "DELETE FROM calculations WHERE id = $1 RETURNING *";
  const deletedCalculation = await db.oneOrNone(query, id);
  return deletedCalculation;
};

const deleteAllUserCalculations = async (userID) => {
  const query = "DELETE FROM calculations WHERE user_id = $1 RETURNING *";
  const deletedCalculation = await db.any(query, [userID]);
  return deletedCalculation;
};

module.exports = {
  getAllCalculations,
  getAllUserCalculations,
  getCalculationByID,
  createCalculation,
  updateCalculation,
  deleteCalculation,
  deleteAllUserCalculations,
};
