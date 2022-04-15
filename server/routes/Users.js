require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Users, Roles } = require("../models");
const {
  getAdminUid,
  genHash,
  createResponse,
  createTrail,
} = require("../middlewares/miscjs");
const { Op } = require("sequelize");
const { query } = require("express");

//Check if username is already available in user table
router.get("/", (req, res, next) => {
  const username = req.query.uname;
  Users.findOne({ where: { username: username } })
    .then((response) => {
      const user = response?.dataValues || [];
      if (user && user?.status === true) {
        res.json({ message: "existing" });
      } else if (user && user?.status === false) {
        res.json({ message: "inactive" });
      } else {
        res.json({ message: "available" });
      }
    })
    .catch((error) => {
      createTrail(
        "Check Username Availability",
        "Error during username availability check",
        null,
        null,
        req?.user?.id,
        error.message
      );
      next(error);
    });
});

//Register User
router.post("/register", (req, res, next) => {
  const newUser = req.body;
  newUser?.approverId === null && newUser.approverId === getAdminUid();
  Users.findOne({ where: { username: newUser.username } })
    .then(async (user) => {
      if (user) {
        res.json(createResponse("error", "Username already in use"));
      } else {
        const passwordHash = await genHash(newUser.password);
        const postUser = {
          ...newUser,
          passwordHash: await passwordHash,
        };
        Users.create(postUser)
          .then((user) => {
            createTrail(
              "Register User",
              "Register success",
              null,
              user,
              user.id,
              null
            );
            user.passwordHash = "******";
            res.json(user);
          })
          .catch((error) => {
            createTrail(
              "Register User",
              "Register fail",
              null,
              postUser,
              getAdminUid(),
              error.message
            );
            res.json(
              createResponse(
                "error",
                "Error encountered when saving to database."
              )
            );
          });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    const { username } = req.body;
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(`failure/${username}`);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(`success/${username}`);
    });
  })(req, res, next);
});

//Successful login redirect
router.get("/success/:username", (req, res, next) => {
  const { username } = req.params;
  Users.findOne({ where: { username } }).then((user) => {
    const userId = user.id;
    try {
      createTrail("User Login", "Login success", null, null, userId, null);
      const lastLogin = Date.now();
      Users.update({ lastLogin: lastLogin }, { where: { id: userId } }).then(
        () => {
          Users.findOne({
            attributes: { exclude: ["passwordHash"] },
            where: { id: userId },
          }).then((user) => {
            const data = {
              ...user.dataValues,
              sessionId: req.sessionID,
              expiry: req.session.cookie.expires,
              isLoggedIn: true,
            };
            res.json(data);
          });
        }
      );
    } catch (error) {
      createTrail(
        "Login success redirect error",
        "Error during success redirect",
        null,
        null,
        userId,
        error.message
      );
      next(error);
    }
  });
});

//Failed login redirect
router.get("/failure/:username", async (req, res, next) => {
  const { username } = req.params;
  const adminId = await getAdminUid();
  Users.findOne({ where: { username } }).then((user) => {
    const userId = user ? user.id : adminId;
    try {
      createTrail(
        "User Login",
        "Wrong password",
        null,
        { username: username },
        userId,
        null
      );
      const obj = { id: null };
      res.send(obj);
    } catch (error) {
      createTrail(
        "Login fail redirect error",
        "Error during fail redirect",
        null,
        { username: username },
        userId,
        error.message
      );
      next(error);
    }
  });
});

//Logout user
router.get("/logout", (req, res, next) => {
  const { uid } = req.query;
  try {
    req.logout();
    createTrail("User Logout", "Logout success", null, null, uid, null);
    res.send({ id: null });
  } catch (error) {
    createTrail("User Logout", "Logout failed", null, null, uid, error.message);
  }
});

//Get All Users
router.get("/user", (req, res, next) => {
  const { q, uid } = req.query;
  const queryObj = { [Op.substring]: q };
  Users.findAll({
    include: {
      model: Roles,
      as: "Role",
      required: true,
      attributes: ["title"],
    },
    attributes: { exclude: ["passwordHash"] },
    where: {
      [Op.or]: [
        { username: queryObj },
        { firstname: queryObj },
        { lastname: queryObj },
        { email: queryObj },
        { status: queryObj },
        { "$Role.title$": queryObj },
      ],
      deleted: false,
    },
    order: [["createdAt", "DESC"]],
  })
    .then((users) => {
      const newUsers = users.map((user) => {
        return {
          ...user.dataValues,
          roleTitle: user.dataValues.Role.title,
        };
      });
      res.json(newUsers);
    })
    .catch((error) => {
      createTrail(
        "Get All Users",
        "Error during get all users",
        null,
        null,
        uid,
        error.message
      );
      next(error);
    });
});

//Update User (this include delete=disable access)
router.patch("/user", (req, res, next) => {
  const { uid } = req.query;
  const { id } = req.body;
  Users.findByPk(id).then((prevValue) => {
    Users.update(req.body, { where: { id } })
      .then((response) => Users.findOne({ where: { id } }))
      .then((newValue) => {
        createTrail(
          "Update User",
          "Update success",
          prevValue,
          newValue,
          uid,
          null
        );
        res.send(true);
      })
      .catch((error) => {
        createTrail(
          "Update User",
          "Error during user update",
          prevValue,
          req.body,
          uid,
          error.message
        );
        res.send(false);
      });
  });
});

module.exports = router;
