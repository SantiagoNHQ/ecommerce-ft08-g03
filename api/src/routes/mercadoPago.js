const server = require("express").Router();
const { Orden } = require("../db");

const mercadopago = require("mercadopago");
const { response } = require("express");

const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

server.post("/", (req, res, next) => {
  console.log("ACA ESTOYYYY", req.body);

  const id_orden = 1;

  // const carrito = [
  //     {title: "producto 1", quantity: 5, price: 20},
  //     {title: "producto 2", quantity: 3, price: 5}
  // ]
  const carrito = req.body.data;
  const items_ml = carrito.map((i) => ({
    title: i.title,
    unit_price: i.price,
    quantity: i.quantity,
  }));

  let preference = {
    items: items_ml,
    external_reference: `${id_orden}`,
    payment_methods: {
      excluyed_payment_types: [
        {
          id: "ata",
        },
      ],
      installments: 3,
    },
    back_urls: {
      success: "http://localhost:3000/",
      failure: "http://localhost:3000/",
      pending: "http://localhost:3000/",
    },
  };

  mercadopago.preferences
    .create(preference)

    .then((response) => {
      console.info("respondio");
      global.id = response.body.id;
      console.log(response.body);
      res.json({ id: global.id });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/pagos", (req, res) => {
  console.info("en la ruta pagos ", req);
  const paymentid = req.query.payment_id;
  const paymentstatus = req.query.status;
  const externalreference = req.query.external_reference;
  const merchantorderid = req.query.merchant_order_id;
  console.log("EXTERNAL RFERENCE ", external_reference);

  Orden.findByPk(external_reference)
    .then((orden) => {
      // orden.payment_id = payment_id
      // orden.payment_status = payment_status
      // orden.merchant_order_id = merchant_order_id
      orden.estado = "completa";
      console.info("salvando orden");
      orden
        .save()
        .then(() => {
          console.info("redirect success");
          return res.redirect("http://localhost:3000");
        })
        .catch((err) => {
          console.error("error al salvar", err);
          return res.redirect("http://localhost:3000/error");
        });
    })
    .catch((err) => {
      console.error("error al buscar", err);
      return res.redirect("http://localhost:3000/errorbuscar");
    });
});
module.exports = server;
