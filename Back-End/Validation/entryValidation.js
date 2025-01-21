const checkUserValues = (req, res, next) => {
  if (req.body.username && req.body.password && req.body.email) {
    next();
  } else {
    res.status(400).json({
      error:
        "You are missing required keys. Please make sure you have: username, password, email",
    });
  }
};

const checkUserExtraEntries = (req, res, next) => {
  const validFields = ["username", "password", "email"];
  const keys = Object.keys(req.body);

  const extraFields = keys.filter((key) => !validFields.includes(key));

  if (extraFields.length > 0) {
    res.status(400).json({
      error: `You have extra keys: ${extraFields.join(", ")}.`,
    });
  } else {
    next();
  }
};

const checkCalcValues = (req, res, next) => {
  if (req.body.expression && req.body.result) {
    next();
  } else {
    res.status(400).json({
      error:
        "You are missing required keys. Please make sure you have: expression, result",
    });
  }
};

const checkCalcExtraEntries = (req, res, next) => {
  const validFields = ["expression", "result", "calculator_type"];
  const keys = Object.keys(req.body);

  const extraFields = keys.filter((key) => !validFields.includes(key));

  if (extraFields.length > 0) {
    res.status(400).json({
      error: `You have extra keys: ${extraFields.join(", ")}.`,
    });
  } else {
    next();
  }
};

module.exports = {
  checkUserValues,
  checkUserExtraEntries,
  checkCalcValues,
  checkCalcExtraEntries,
};
