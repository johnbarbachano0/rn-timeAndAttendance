"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("Permission_Role_Tags", [
        {
          PermissionId: 1,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 2,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 3,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 4,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 5,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 6,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 7,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 8,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 9,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 10,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 11,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 12,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PermissionId: 13,
          RoleId: 1,
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  down: (queryInterface, sequelize) => {
    return Promise.all([queryInterface.bulkDelete("WorkStatuses", null, {})]);
  },
};
