import React, { useEffect, useState } from "react";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData) {
      fetch("http://localhost:4000/v1/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, []);

  return (
    <div className="orders-container col-8">
      <h1>سفارشات</h1>
      <table className="table order-table">
        <thead>
          <tr>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>تخفیف</th>
            <th>جمع کل</th>
          </tr>
        </thead>
        <tbody className="order__table-body">
          {orders.length === 0 ? (
            <div className="alert alert-warning">
              سفارشی برای نمایش وجود ندارد
            </div>
          ) : (
            <>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="order__table-body-list course-orderDetails"
                >
                  <td>{order.course.name}</td>
                  <td className="text-success">
                    {order.course.price === 0
                      ? "رایگان"
                      : order.course.price + " تومان"}{" "}
                  </td>
                  <td className="text-danger">
                    {order.price !== order.course.price
                      ? order.course.price - order.price + " تومان"
                      : "ندارد"}
                  </td>
                  <td className="text-primary">
                    {order.course.price === 0
                      ? "رایگان"
                      : order.price + " تومان"}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
