const express = require("express");
const router = express.Router();
const { AuditTrail, Users } = require("../models");
const { Op } = require("sequelize");
const { isAdmin } = require("../middlewares/miscjs");

//Get All History
router.get("/", (req, res, next) => {
  const { q, uid } = req.query;
  const queryObj = { [Op.substring]: q };
  isAdmin(uid)
    .then((results) => {
      AuditTrail.findAndCountAll({
        include: {
          model: Users,
          as: "User",
          required: true,
          attributes: ["username", "firstname", "lastname"],
        },
        where: {
          [Op.or]: [
            { action: queryObj },
            { message: queryObj },
            { prevValue: queryObj },
            { newValue: queryObj },
            { error: queryObj },
            { "$User.username$": queryObj },
            { createdAt: queryObj },
            { updatedAt: queryObj },
          ],
          UserId: results ? { [Op.substring]: "" } : uid,
        },
        order: [["createdAt", "DESC"]],
      }).then(async ({ count, rows: results }) => {
        const newResults = await results.map((result) => {
          var procResult = result.dataValues;
          const { username, firstname, lastname } = procResult?.User;
          procResult = {
            ...procResult,
            username,
            fullname: firstname + " " + lastname,
          };
          delete procResult?.User;
          return procResult;
        });
        res.json(newResults);
      });
    })
    .catch((error) => next(error));

  // Users.findAll({
  //   where: { id: uid },
  // })
  //   .then((resultUser) => {
  //     const userData = resultUser.pop().dataValues;
  //     const isAdmin = userData.RoleId === 1;
  //     AuditTrail.findAndCountAll({
  //       include: {
  //         model: Users,
  //         as: "User",
  //         required: true,
  //         attributes: ["username", "firstname", "lastname"],
  //       },
  //       where: {
  //         [Op.or]: [
  //           { action: queryObj },
  //           { message: queryObj },
  //           { prevValue: queryObj },
  //           { newValue: queryObj },
  //           { error: queryObj },
  //           { "$User.username$": queryObj },
  //           { createdAt: queryObj },
  //           { updatedAt: queryObj },
  //         ],
  //         UserId: isAdmin ? { [Op.substring]: "" } : uid,
  //       },
  //       order: [["createdAt", "DESC"]],
  //     }).then(async ({ count, rows: results }) => {
  //       const newResults = await results.map((result) => {
  //         var procResult = result.dataValues;
  //         const { username, firstname, lastname } = procResult?.User;
  //         procResult = {
  //           ...procResult,
  //           username,
  //           fullname: firstname + " " + lastname,
  //         };
  //         delete procResult?.User;
  //         return procResult;
  //       });
  //       res.json(newResults);
  //     });
  //   })
  //   .catch((error) => next(error));
});

module.exports = router;
