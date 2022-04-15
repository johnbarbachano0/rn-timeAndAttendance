require("dotenv").config();
const express = require("express");
const router = express.Router();
const { TimeLogs, TimeLogTypes, Users } = require("../models");
const { createTrail } = require("../middlewares/miscjs");
const { Op } = require("sequelize");

//Post New TimeLog
router.post("/", (req, res, next) => {
  const { uid } = req.query;
  const timelog = req.body;
  TimeLogs.create({ ...timelog, isUploaded: 1 })
    .then((createdLog) => {
      createTrail(
        "Create Time Log",
        "New Time Log created",
        null,
        createdLog,
        uid,
        null
      );
      res.send(true);
    })
    .catch((error) => {
      createTrail(
        "Create Time Log",
        "Error during time log save",
        null,
        timelog,
        uid,
        error?.message
      );
      res.send(false);
    });
});

//GetTimeLogs
router.get("/", async (req, res, next) => {
  const { uid, q, filter } = req.query;
  const currDate = filter ? new Date(filter) : new Date();
  const start = new Date(currDate?.getFullYear(), currDate?.getMonth() - 1);
  const end = new Date(currDate?.getFullYear(), currDate?.getMonth() + 1);
  const queryObj = { [Op.substring]: q };
  const queryDate = { [Op.between]: [start, end] };
  const roleId = await Users.findByPk(uid, { attributes: ["RoleId"] }).then(
    (data) => data.RoleId
  );
  TimeLogs.findAll({
    include: [
      {
        model: Users,
        as: "User",
        required: true,
        attributes: ["username", "firstname", "lastname"],
      },
      {
        model: TimeLogTypes,
        as: "TimeLogType",
        required: true,
        attributes: ["title"],
      },
    ],
    where: {
      [Op.or]: [
        { "$TimeLogType.title$": queryObj },
        { "$User.username$": queryObj },
        { "$User.firstname$": queryObj },
        { "$User.lastname$": queryObj },
      ],
      UserId: roleId === 1 ? { [Op.substring]: "" } : uid,
      datetime: queryDate,
    },
    order: [["datetime", "DESC"]],
  })
    .then((results) => {
      const procResults = results.map((result) => {
        const data = result.dataValues;
        const proc = {
          ...data,
          username: data.User.username,
          firstname: data.User.firstname,
          lastname: data.User.lastname,
          timeLogType: data.TimeLogType.title,
        };
        delete proc.User;
        delete proc.TimeLogType;
        return proc;
      });
      res.json(procResults);
    })
    .catch((error) => {
      createTrail(
        "Get Time Logs",
        "Error during get time logs",
        null,
        null,
        uid,
        error.message
      );
      next(error);
    });
});

//Update TimeLogs
router.patch("/", (req, res, next) => {
  const { uid } = req.query;
  const timelog = req.body;
  TimeLogs.findByPk(timelog.id).then((prevVal) => {
    TimeLogs.update(timelog, { where: { id: timelog.id } })
      .then((response) => TimeLogs.findOne({ where: { id: timelog.id } }))
      .then((newVal) => {
        createTrail(
          "Update Timelog",
          "Update success",
          prevVal,
          newVal,
          uid,
          null
        );
        res.send(true);
      })
      .catch((error) => {
        createTrail(
          "Update Timelog",
          "Error during timelog update",
          null,
          prevVal,
          uid,
          error.message
        );
        res.send(false);
      });
  });
});

module.exports = router;
