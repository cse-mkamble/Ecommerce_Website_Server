const orderModel = require("../models/orders");
const productModel = require("../models/products");
const userModel = require("../models/users")
const sendMail = require("../utils/sendMail");
const orderMail = require("../utils/mail/orderMail");

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {

    let { allProduct, user, amount, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          address,
          phone,
        });
        let result = await newOrder.save();
        if (result) {
          // console.log(result)
          var keys = Object.keys(result.allProduct)
          var orderListMessage = ""
          for (var i = 0; i < keys.length; i++) {
            var value = result.allProduct[i].id;
            let ProductObj = await productModel.findById(value)
            orderListMessage = orderListMessage + `
              <tr>
                  <td style=" border: 1px solid #9e9e9e; " >${i}]</td>
                  <td style=" border: 1px solid #9e9e9e; " >
                      <table>
                          <tr>
                              <td><img src="${ProductObj.pImages[0].url}" alt="" style=" width: 60px; " /></td>
                              <td><p>${ProductObj.pName}</p></td>
                          </tr>    
                      </table>
                  </td>
                  <td style=" border: 1px solid #9e9e9e; " >${result.allProduct[i].quantitiy}</td>
              </tr>
            `
          }

          const user = await userModel.findOne({ _id: result.user })
          var senderStatus = 'Your'
          var subjectMail = `${senderStatus} Order`
          var orderStatusColor = 'red'
          var orderDate = result.createdAt.toLocaleString()
          var dateMessage = `
              <tr>
                  <td>Order Date</td>
                  <td>:</td>
                  <td>${orderDate}</td>
              </tr>
            `

          var message = orderMail({
            sender_status: senderStatus,
            order_list: orderListMessage,
            order_id: result._id,
            order_status: result.status,
            order_status_color: orderStatusColor,
            order_amount: result.amount,
            order_address: result.address,
            order_phone: result.phone,
            order_date: dateMessage
          })
          sendMail({ to: user.email, subject: subjectMail, text: message })

          senderStatus = 'Customer'
          subjectMail = `${senderStatus} Order`
          message = ``
          message = orderMail({
            sender_status: senderStatus,
            order_list: orderListMessage,
            order_id: result._id,
            order_status: result.status,
            order_status_color: orderStatusColor,
            order_amount: result.amount,
            order_address: result.address,
            order_phone: result.phone,
            order_date: dateMessage
          })
          sendMail({ to: process.env.EMAIL_FROM, subject: subjectMail, text: message })

          return res.json({ success: "Order created successfully" });
        }
      } catch (err) {
        return res.json({ error: err });
      }
    }

  }

  async postUpdateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let currentOrder = orderModel.findByIdAndUpdate(oId, {
          status: status,
          updatedAt: Date.now(),
        });

        currentOrder.exec(async (err, result) => {
          if (err) console.log(err);
          if (result) {

            let Order = await orderModel.findOne({ _id: result._id })
            console.log(Order)

            var keys = Object.keys(Order.allProduct)
            var orderListMessage = ""
            for (var i = 0; i < keys.length; i++) {
              var value = Order.allProduct[i].id;
              let ProductObj = await productModel.findById(value)
              orderListMessage = orderListMessage + `
              <tr>
                  <td style=" border: 1px solid #9e9e9e; " >${i}]</td>
                  <td style=" border: 1px solid #9e9e9e; " >
                      <table>
                          <tr>
                              <td><img src="${ProductObj.pImages[0].url}" alt="" style=" width: 60px; " /></td>
                              <td><p>${ProductObj.pName}</p></td>
                          </tr>    
                      </table>
                  </td>
                  <td style=" border: 1px solid #9e9e9e; " >${Order.allProduct[i].quantitiy}</td>
              </tr>
            `
            }

            const user = await userModel.findOne({ _id: Order.user })
            var senderStatus = 'Your'
            var subjectMail = `${senderStatus} Order`
            var orderStatusColor = ''
            if (Order.status === 'Processing') {
              orderStatusColor = '#d69e2e'
            } else if (Order.status === 'Shipped') {
              orderStatusColor = '#3182ce'
            } else if (Order.status === 'Delivered') {
              orderStatusColor = '#38a169'
            } else {
              orderStatusColor = 'red'
            }
            var orderDate = Order.createdAt.toLocaleString()
            var orderUpdateDate = Order.updatedAt.toLocaleString()
            var dateMessage = `
              <tr>
                  <td>Order Date</td>
                  <td>:</td>
                  <td>${orderDate}</td>
              </tr>
              <tr>
                  <td>Order Update</td>
                  <td>:</td>
                  <td>${orderUpdateDate}</td>
              </tr>
            `
            var message = orderMail({
              sender_status: senderStatus,
              order_list: orderListMessage,
              order_id: Order._id,
              order_status: Order.status,
              order_status_color: orderStatusColor,
              order_amount: Order.amount,
              order_address: Order.address,
              order_phone: Order.phone,
              order_date: dateMessage
            })
            sendMail({ to: user.email, subject: subjectMail, text: message })

            senderStatus = 'Customer'
            subjectMail = `${senderStatus} Order`
            message = ``
            message = orderMail({
              sender_status: senderStatus,
              order_list: orderListMessage,
              order_id: Order._id,
              order_status: Order.status,
              order_status_color: orderStatusColor,
              order_amount: Order.amount,
              order_address: Order.address,
              order_phone: Order.phone,
              order_date: dateMessage
            })
            sendMail({ to: process.env.EMAIL_FROM, subject: subjectMail, text: message })

            return res.json({ success: "Order updated successfully" });
          }
        })

      } catch (err) {
        return res.json({ error: err });
      }
    }
  }

  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
