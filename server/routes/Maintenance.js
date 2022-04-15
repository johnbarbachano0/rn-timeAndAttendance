const express = require("express");
const router = express.Router();
const {
  ChangeRequestStatus,
  Modules,
  Roles,
  TimeLogTypes,
  WorkStatus,
  Permissions,
  Permission_Role_Tags,
  Users,
} = require("../models");
const { Op } = require("sequelize");
const {
  createTrail,
  getAdminUid,
  capitalize,
} = require("../middlewares/miscjs");

const getType = (type) => {
  return type === 1
    ? "Change Request Status"
    : type === 2
    ? "Module"
    : type === 3
    ? "Role"
    : type === 4
    ? "Time Log Types"
    : type === 6
    ? "Work Status"
    : type === 8
    ? "Permission"
    : "Permission-Role Tag";
};

//Get Maintenance
router.get("/", (req, res, next) => {
  const { q, uid, type: typeJson } = req.query;
  const type = typeJson ? JSON.parse(typeJson) : "all";
  const isAll = type === "all";
  const queryObj = { [Op.substring]: q };
  const whereClause = {
    where: {
      [Op.or]: [{ title: queryObj }],
      deleted: false,
    },
  };
  const userClause = {
    where: {
      deleted: false,
      status: true,
    },
  };
  const getChangeReq =
    type === 1 || isAll || type === undefined
      ? ChangeRequestStatus.findAll(whereClause).then((results) => ({
          changeReq: results,
        }))
      : null;

  const getModules =
    type === 2 || isAll || type === undefined
      ? Modules.findAll(whereClause).then((results) => ({
          modules: results,
        }))
      : null;
  const getRoles =
    type === 3 || isAll || type === undefined
      ? Roles.findAll(whereClause).then((results) => ({
          roles: results,
        }))
      : null;
  const getTimeLogTypes =
    type === 4 || isAll || type === undefined
      ? TimeLogTypes.findAll(whereClause).then((results) => ({
          timeLogTypes: results,
        }))
      : null;
  const getWorkStatus =
    type === 6 || isAll || type === undefined
      ? WorkStatus.findAll(whereClause).then((results) => ({
          workStatus: results,
        }))
      : null;
  const getApprovers =
    type === 7 || isAll || type === undefined
      ? Users.findAll(userClause).then((results) => {
          return {
            approvers: results.map(({ id, firstname, lastname }) => ({
              id,
              fullname: capitalize(firstname) + " " + capitalize(lastname),
            })),
          };
        })
      : null;

  const getPermissions =
    type === 8 || isAll || type === undefined
      ? Permissions.findAll(userClause).then((results) => {
          return {
            permissions: results,
          };
        })
      : null;

  const getPermissionRoleTags =
    type === 9 || isAll || type === undefined
      ? Permission_Role_Tags.findAll({
          include: [
            {
              model: Roles,
              as: "Role",
              required: true,
              attributes: ["title"],
            },
            {
              model: Permissions,
              as: "Permission",
              required: true,
              attributes: ["title"],
            },
          ],
          where: {
            deleted: false,
          },
        }).then((results) => {
          const newResults = results.map((data) => {
            var newData = data?.dataValues;
            newData = {
              ...newData,
              role: newData?.Role?.title,
              permission: newData?.Permission?.title,
            };
            delete newData?.Role;
            delete newData?.Permission;
            return newData;
          });

          return {
            permissionRoleTags: newResults,
          };
        })
      : null;

  Promise.all([
    getChangeReq,
    getModules,
    getRoles,
    getTimeLogTypes,
    getWorkStatus,
    getApprovers,
    getPermissions,
    getPermissionRoleTags,
  ])
    .then((results) => {
      const proc = results.filter((result) => result !== null);
      res.json(proc);
    })
    .catch(async (error) => {
      var adminId;
      if (uid === "" || uid === undefined) {
        adminId = await getAdminUid();
      }
      createTrail(
        `Get ${getType(type)} Maintenance`,
        "Error during get maintenance",
        null,
        null,
        uid ? uid : adminId,
        error?.message
      );
      res.send(error?.message);
    });
});

// Post New Maintenance
router.post("/", (req, res, next) => {
  const { uid, type: typeJson } = req.query;
  const type = typeJson ? JSON.parse(typeJson) : "all";
  const isAll = type === "all";
  const newItem = req.body;
  const postChangeReq =
    type === 1 || isAll
      ? ChangeRequestStatus.create(newItem).catch((error) => next(error))
      : null;
  const postModules =
    type === 2 || isAll
      ? Modules.create(newItem).catch((error) => next(error))
      : null;
  const postRoles =
    type === 3 || isAll
      ? Roles.create(newItem).catch((error) => next(error))
      : null;
  const postTimeLogTypes =
    type === 4 || isAll
      ? TimeLogTypes.create(newItem).catch((error) => next(error))
      : null;
  const postWorkStatus =
    type === 6 || isAll
      ? WorkStatus.create(newItem).catch((error) => next(error))
      : null;
  const postPermission =
    type === 8 || isAll
      ? Permissions.create(newItem).catch((error) => next(error))
      : null;
  const postPermissionRoleTag =
    type === 9 || isAll
      ? Permission_Role_Tags.create(newItem).catch((error) => next(error))
      : null;
  Promise.all([
    postChangeReq,
    postModules,
    postRoles,
    postTimeLogTypes,
    postWorkStatus,
    postPermission,
    postPermissionRoleTag,
  ])
    .then((results) => {
      const proc = results.filter((result) => result !== null);
      createTrail(
        `Create New ${getType(type)} Maintenance`,
        "Create Success",
        null,
        proc[0],
        uid,
        null
      );
      res.json(proc);
    })
    .catch((error) => {
      createTrail(
        `Create New ${getType(type)} Maintenance`,
        "Error during create",
        null,
        newItem,
        uid,
        error.message
      );
      res.send(error);
    });
});

// Patch New Maintenance
router.patch("/", (req, res, next) => {
  const { uid, type: typeJson } = req.query;
  const type = typeJson ? JSON.parse(typeJson) : "all";
  const isAll = type === "all";
  const newItem = req.body;
  const patchChangeReq =
    type === 1 || isAll
      ? ChangeRequestStatus.findOne({ where: { id: newItem.id } }).then(
          (prevValue) =>
            ChangeRequestStatus.update(newItem, {
              where: { id: newItem.id },
            }).then((results) =>
              ChangeRequestStatus.findOne({ where: { id: newItem.id } }).then(
                (newValue) => ({ newValue, prevValue })
              )
            )
        )
      : null;
  const patchModules =
    type === 2 || isAll
      ? Modules.findOne({ where: { id: newItem.id } }).then((prevValue) =>
          Modules.update(newItem, {
            where: { id: newItem.id },
          }).then((results) =>
            Modules.findOne({ where: { id: newItem.id } }).then((newValue) => ({
              newValue,
              prevValue,
            }))
          )
        )
      : null;
  const patchRoles =
    type === 3 || isAll || isAll
      ? Roles.findOne({ where: { id: newItem.id } }).then((prevValue) =>
          Roles.update(newItem, {
            where: { id: newItem.id },
          }).then((results) =>
            Roles.findOne({ where: { id: newItem.id } }).then((newValue) => ({
              newValue,
              prevValue,
            }))
          )
        )
      : null;
  const patchTimeLogTypes =
    type === 4 || isAll
      ? TimeLogTypes.findOne({ where: { id: newItem.id } }).then((prevValue) =>
          TimeLogTypes.update(newItem, {
            where: { id: newItem.id },
          }).then((results) =>
            TimeLogTypes.findOne({ where: { id: newItem.id } }).then(
              (newValue) => ({ newValue, prevValue })
            )
          )
        )
      : null;
  const patchWorkStatus =
    type === 6 || isAll
      ? WorkStatus.findOne({ where: { id: newItem.id } }).then((prevValue) =>
          WorkStatus.update(newItem, {
            where: { id: newItem.id },
          }).then((results) =>
            WorkStatus.findOne({ where: { id: newItem.id } }).then(
              (newValue) => ({ newValue, prevValue })
            )
          )
        )
      : null;

  const patchPermission =
    type === 8 || isAll
      ? Permissions.findOne({ where: { id: newItem.id } }).then((prevValue) =>
          Permissions.update(newItem, {
            where: { id: newItem.id },
          }).then((results) =>
            Permissions.findOne({ where: { id: newItem.id } }).then(
              (newValue) => ({ newValue, prevValue })
            )
          )
        )
      : null;

  const patchPermissionRoleTag =
    type === 9 || isAll
      ? Permissions.findOne({ where: { id: newItem.id } }).then((prevValue) =>
          Permission_Role_Tags.update(newItem, {
            where: { id: newItem.id },
          }).then((results) =>
            Permission_Role_Tags.findOne({ where: { id: newItem.id } }).then(
              (newValue) => ({ newValue, prevValue })
            )
          )
        )
      : null;

  Promise.all([
    patchChangeReq,
    patchModules,
    patchRoles,
    patchTimeLogTypes,
    patchWorkStatus,
    patchPermission,
    patchPermissionRoleTag,
  ])
    .then((results) => {
      const proc = results.filter((result) => result !== null);
      createTrail(
        `Update ${getType(type)} Maintenance`,
        "Update Success",
        proc[0].prevValue,
        proc[0].newValue,
        uid,
        null
      );
      res.json(proc);
    })
    .catch((error) => {
      createTrail(
        `Update ${getType(type)} Maintenance`,
        "Error during update",
        newItem,
        uid,
        error.message
      );
      res.send(error);
    });
});

module.exports = router;
