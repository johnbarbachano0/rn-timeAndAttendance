require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  ChangeRequests,
  ChangeRequestStatus,
  TimeLogs,
  TimeLogTypes,
  Users,
} = require("../models");
const { createTrail } = require("../middlewares/miscjs");
const { Op } = require("sequelize");

//Post New Change Request
router.post("/", (req, res, next) => {
  const { uid } = req.query;
  const changeReq = req.body;
  ChangeRequests.create({ ...changeReq })
    .then((createdChangeReq) => {
      createTrail(
        "Create Change Request",
        "New Change Request created",
        null,
        createdChangeReq,
        uid,
        null
      );
      res.send(true);
    })
    .catch((error) => {
      createTrail(
        "Create Change Request",
        "Error during change request save",
        null,
        changeReq,
        uid,
        error?.message
      );
      res.send(false);
    });
});

//Get Change Requests
router.get("/", async (req, res, next) => {
  const { uid, q } = req.query;
  const queryObj = { [Op.substring]: q };
  ChangeRequests.findAll({
    include: [
      {
        model: Users,
        as: "User",
        required: true,
        attributes: ["username", "firstname", "lastname", "approverId"],
      },
      {
        model: TimeLogTypes,
        as: "TimeLogType",
        required: true,
        attributes: ["title"],
      },
      {
        model: ChangeRequestStatus,
        as: "ChangeRequestStatus",
        required: true,
        attributes: ["title"],
      },
    ],
    where: {
      [Op.or]: [
        { reason: queryObj },
        { "$TimeLogType.title$": queryObj },
        { "$ChangeRequestStatus.title$": queryObj },
        { "$User.username$": queryObj },
        { "$User.firstname$": queryObj },
        { "$User.lastname$": queryObj },
      ],
      deleted: false,
      UserId: uid,
    },
  })
    .then(async (results) => {
      const newRes = await results?.map((result) => {
        const data = result?.dataValues;
        const proc = {
          ...data,
          username: data?.User?.username,
          firstname: data?.User?.firstname,
          lastname: data?.User?.lastname,
          approverId: data?.User?.approverId,
          timeLogType: data?.TimeLogType?.title,
          changeReqStatus: data?.ChangeRequestStatus?.title,
        };
        delete proc.User;
        delete proc.TimeLogType;
        delete proc.ChangeRequestStatus;
        return proc;
      });
      res.json(newRes);
    })
    .catch((error) => {
      createTrail(
        "Get Change Requests",
        "Error during get change requests",
        null,
        null,
        uid,
        error?.message
      );
      next(error);
    });
});

//Get Change Requests Approvals
router.get("/approvals", (req, res, next) => {
  const { uid } = req.query;
  ChangeRequests.findAll({
    include: [
      {
        model: Users,
        as: "User",
        required: true,
        attributes: ["username", "firstname", "lastname", "approverId"],
      },
      {
        model: TimeLogTypes,
        as: "TimeLogType",
        required: true,
        attributes: ["title"],
      },
      {
        model: ChangeRequestStatus,
        as: "ChangeRequestStatus",
        required: true,
        attributes: ["title"],
      },
    ],
    where: {
      "$User.approverId$": uid,
      deleted: false,
    },
  })
    .then((results) => {
      const newRes = results?.map((result) => {
        const data = result?.dataValues;
        const proc = {
          ...data,
          username: data?.User?.username,
          firstname: data?.User?.firstname,
          lastname: data?.User?.lastname,
          approverId: data?.User?.approverId,
          timeLogType: data?.TimeLogType?.title,
          changeReqStatus: data?.ChangeRequestStatus?.title,
        };
        delete proc.User;
        delete proc.TimeLogType;
        delete proc.ChangeRequestStatus;
        return proc;
      });
      res.json(newRes);
    })
    .catch((error) => {
      createTrail(
        "Get Change Request Approvals",
        "Error during get change requests approvals",
        null,
        null,
        uid,
        error?.message
      );
      next(error);
    });
});

//Update Change Request Approvals
router.post("/approvals", (req, res, next) => {
  const { uid } = req.query;
  const { changeReq, timelog } = req.body;
  ChangeRequests.findByPk(changeReq.id).then((prevVal) => {
    ChangeRequests.update(changeReq, { where: { id: changeReq.id } })
      .then((response) =>
        ChangeRequests.findOne({ where: { id: changeReq.id } })
      )
      .then((newVal) => {
        createTrail(
          "Update Change Request due to approval",
          "Update success",
          prevVal,
          newVal,
          uid,
          null
        );
        timelog
          ? TimeLogs.findAll({
              where: {
                UserId: timelog?.UserId,
                date: timelog?.date,
                TimeLogTypeId: timelog?.TimeLogTypeId,
              },
            })
              .then((resultLog) => {
                try {
                  if (resultLog?.length > 0) {
                    const newVal = resultLog?.pop();
                    TimeLogs.update(timelog, { where: { id: newVal.id } }).then(
                      (resultLog) => {
                        resultLog.pop() === 1
                          ? res.send(true)
                          : res.send(false);
                      }
                    );
                  } else {
                    TimeLogs.create({
                      ...timelog,
                      isUploaded: true,
                      location: "Not Available",
                      coordinates: {
                        latitude: 16.348574144761884,
                        longitude: 120.35882040142783,
                      },
                    }).then((createdLog) => {
                      createTrail(
                        "Create Time Log",
                        "New Time Log created due to change request approval",
                        null,
                        createdLog,
                        uid,
                        null
                      );
                      res.send(true);
                    });
                  }
                } catch (error) {
                  createTrail(
                    "Create Time Log",
                    "Error during time log save",
                    null,
                    timelog,
                    uid,
                    error?.message
                  );
                  res.send(false);
                }
              })
              .catch((error) => {
                createTrail(
                  "Update Change Request",
                  "Error during change request update",
                  null,
                  prevVal,
                  uid,
                  error?.message
                );
                res.send(false);
              })
          : res.send(true);
      });
  });
});

//Update Change Request
router.patch("/", (req, res, next) => {
  const { uid } = req.query;
  const changeReq = req.body;
  ChangeRequests.findByPk(changeReq.id).then((prevVal) => {
    ChangeRequests.update(changeReq, { where: { id: changeReq.id } })
      .then((response) =>
        ChangeRequests.findOne({ where: { id: changeReq.id } })
      )
      .then((newVal) => {
        createTrail(
          "Update Change Request",
          "Update success",
          prevVal,
          newVal,
          uid,
          null
        );
        res.send(true);
      })
      .then()
      .catch((error) => {
        createTrail(
          "Update Change Request",
          "Error during change request update",
          null,
          prevVal,
          uid,
          error?.message
        );
        res.send(false);
      });
  });
});

module.exports = router;
