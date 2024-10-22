const server = require("express").Router();
const { Orden, Orderline, Product } = require("../db");

const mercadopago = require("mercadopago");
const { response } = require("express");

const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});


server.post("/:id", (req, res, next) => {
  console.log("ACA ESTOYYYY", req.body);
  const id_orden = req.params.id;
  console.log("SOYY ORDEN ID", id_orden);

  // const carrito = [
  //     {title: "producto 1", quantity: 5, price: 20},
  //     {title: "producto 2", quantity: 3, price: 5}
  // ]
  const carrito = req.body.data;
  const items_ml = carrito.map((i) => ({
    title: i.title,
    unit_price: i.unit_price,
    quantity: i.quantity,
  }));

  let preference = {
    items: items_ml,
    external_reference: id_orden,
    payment_methods: {
      excluyed_payment_types: [
        {
          id: "ata",
        },
      ],
      installments: 3,
    },
    back_urls: {
      success: "http://localhost:3001/mercadopago/pagos",
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
  console.log("EXTERNAL RFERENCE ", externalreference);

  var carrito; 

  Orderline.findAll({
    where: {ordenId: externalreference}
  })
  .then(respuesta => {
    carrito = respuesta
    console.log("ESTO ME LLEGA AL CARRITO DESPUES DEL FIND ONE", carrito)

    carrito.map(pos => {
      var ids = pos.productId
      console.log("ESTO ES IDS....................", ids)
      // console.log("ESTO ES REPSUETA.ORDERLINE.DATAVALUES", pos.orderline.dataValues)
      Product.findOne(
        {where: {id: ids}
      })
      .then(response => {
        var stock = response.stock
        stock = stock - pos.cantidad
        console.log("SOY STOCK QUE VIENE DEL FIND ONE", stock)
        Product.update(
          {stock: stock},
          {where : {id: pos.productId}}
         )
         .then(respuesta =>{console.log("STOCK CAMBIADO")})
         .catch(err => {console.log ("error cambio de stock", err)})
      })
      .catch(err => {console.log("HUBO PROBLEMAS CON EL FIND ONEE", err)})
    })

  })
  .catch(err => { console.log("ERROR PARGO MERCADOPAGO EN FINDONE", err)})

 

  Orden.update(
    { estado: "creada", paymentid, paymentstatus, merchantorderid },
    { where: { id: externalreference } }
  )
    .then((orden) => {
      // orden.payment_id = payment_id
      // orden.payment_status = payment_status
      // orden.merchant_order_id = merchant_order_id
      console.info("salvando orden");
      console.info("redirect success");
      return res.redirect("http://localhost:3000/user/finalizarcompra");
    })
    .catch((err) => {
      console.error("error al salvar", err);
      return res.redirect("http://localhost:3000/error");
    });
});
module.exports = server;
