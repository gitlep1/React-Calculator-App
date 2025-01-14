const express = require("express");
const calculations = express.Router();
const jwt = require("jsonwebtoken");

const {
  getAllCalculations,
  getAllUserCalculations,
  getCalculationByID,
  createCalculation,
  updateCalculation,
  deleteCalculation,
  deleteAllUserCalculations,
} = require("../Queries/calculationsQueries");

const {
  checkCalcValues,
  checkCalcExtraEntries,
} = require("../Validation/entryValidation");
const { requireAuth } = require("../validation/requireAuth");
const { scopeAuth } = require("../validation/scopeAuth");

calculations.get(
  "/",
  requireAuth(),
  scopeAuth(["read:user"]),
  async (req, res) => {
    try {
      const calculations = await getAllCalculations();
      console.log("=== GET Calculations ", { calculations }, "===");

      res.status(200).json(calculations);
    } catch (err) {
      console.error("Error during calculations get:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

calculations.get(
  "/user-calculations",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUserCalculations = await getAllUserCalculations(decoded.user.id);
      console.log("=== GET User Calculations ", { getUserCalculations }, "===");

      res.status(200).json({ payload: getUserCalculations });
    } catch (err) {
      console.error("Error during user calculations get:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

calculations.get(
  "/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      const getCalculation = await getCalculationByID(id);
      console.log("=== GET Calculation by ID", { getCalculation }, "===");

      res.status(200).json({ payload: getCalculation });
    } catch (err) {
      console.error("Error during calculation get ID:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

calculations.post(
  "/",
  checkCalcValues,
  checkCalcExtraEntries,
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;

      const calculationData = {
        user_id: jwt.decode(token).user.id,
        expression: req.body.expression,
        result: req.body.result,
      };

      const newCalculation = await createCalculation(calculationData);

      res.status(200).json({ payload: newCalculation });
    } catch (err) {
      console.error("Error during calculations post:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

calculations.put(
  "/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const { id } = req.params;

      const calculationData = {
        user_id: jwt.decode(token).user.id,
        expression: req.body.expression,
        result: req.body.result,
        date: req.body.date,
      };

      const calculation = await getCalculationByID(id);

      if (calculationData.user_id !== calculation.user_id) {
        console.log(
          `=== PUT Calculation , user: ${calculationData.user_id} tried to update a calculation that belongs to user: ${calculation.user_id} ===`
        );
        return res.status(403).json({ error: "Forbidden" });
      }

      const updatedCalculation = await updateCalculation(
        calculation.id,
        calculationData
      );
      console.log("=== PUT Calculation ", { updatedCalculation }, "===");

      res.status(200).json({ payload: updatedCalculation });
    } catch (err) {
      console.error("Error during calculation put:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

calculations.delete(
  "/user-calculations",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const deletedUserCalculations = await deleteAllUserCalculations(
        decoded.user.id
      );
      console.log(
        "=== DELETE User Calculations ",
        { deletedUserCalculations },
        "==="
      );

      res.status(200).json({ payload: deletedUserCalculations });
    } catch (err) {
      console.error("Error during user calculations delete:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

calculations.delete(
  "/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const { id } = req.params;

      const calculationData = {
        user_id: jwt.decode(token).user.id,
      };

      const calculation = await getCalculationByID(id);

      if (calculationData.user_id !== calculation.user_id) {
        console.log(
          `=== PUT Calculation , user: ${calculationData.user_id} tried to delete a calculation that belongs to user: ${calculation.user_id} ===`
        );
        return res.status(403).json({ error: "Forbidden" });
      }

      const deletedCalculation = await deleteCalculation(calculation.id);
      console.log("=== DELETE Calculation ", { deletedCalculation }, "===");

      res.status(200).json({ payload: deletedCalculation });
    } catch (err) {
      console.error("Error during calculation delete:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = calculations;
