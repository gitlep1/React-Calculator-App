const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");

const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  checkIfUserExists,
} = require("../Queries/usersQueries");

const {
  checkUserValues,
  checkUserExtraEntries,
} = require("../validation/entryValidation");
const { requireAuth } = require("../validation/requireAuth");
const { scopeAuth } = require("../validation/scopeAuth");

const JSK = process.env.JWT_SECRET;

users.get("/", requireAuth(), scopeAuth(["read:user"]), async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log("=== GET Users ", { users }, "===");

    res.status(200).json({ payload: users });
  } catch (err) {
    console.error("Error during users get:", err);
    res.status(500).json({ error: err.message });
  }
});

users.get(
  "/user",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      console.log("=== GET User by ID", { getUser }, "===");

      res.status(200).json({ payload: getUser });
    } catch (err) {
      console.error("Error during user get ID:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

users.post(
  "/signup",
  checkUserValues,
  checkUserExtraEntries,
  async (req, res) => {
    try {
      const newUserData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      };

      const userExists = await checkIfUserExists(
        newUserData.email,
        newUserData.password
      );
      if (userExists) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      const newUser = await createUser(newUserData);
      const userDataForClient = {
        theme: newUser.theme,
        email: newUser.email,
        username: newUser.username,
        profileimg: newUser.profileimg,
        last_online: newUser.last_online,
      };

      const clientTokenPayload = {
        user: newUser,
        scopes: ["read:user", "write:user"],
      };
      console.log(
        "=== POST User (clientTokenPayload)",
        { clientTokenPayload },
        "==="
      );
      const token = jwt.sign(clientTokenPayload, JSK, {
        expiresIn: "30d",
      });

      res.status(200).json({ payload: userDataForClient, token });
    } catch (err) {
      console.error("Error during user post:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

users.put(
  "/user",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const updatedUser = await updateUser(decoded.user.id, req.body);
      console.log("=== PUT User ", { updatedUser }, "===");

      const userDataForClient = {
        theme: updatedUser.theme,
        email: updatedUser.email,
        username: updatedUser.username,
        profileimg: updatedUser.profileimg,
        last_online: updatedUser.last_online,
      };

      res.status(200).json({ payload: userDataForClient });
    } catch (err) {
      console.error("Error during user put:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

users.delete(
  "/user",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const deletedUser = await deleteUser(decoded.user.id);
      console.log("=== DELETE User ", { deletedUser }, "===");

      res.status(200).json({ payload: deletedUser });
    } catch (err) {
      console.error("Error during user delete:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = users;
