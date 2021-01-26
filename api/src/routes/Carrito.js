const server = require("express").Router();
const {
  Product,
  Category,
  ProductAndCategory,
  User,
  Carrito,
} = require("../db");
const Sequelize = require("sequelize");

module.exports = server;
