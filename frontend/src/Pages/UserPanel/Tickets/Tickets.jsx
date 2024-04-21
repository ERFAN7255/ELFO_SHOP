import React, { useEffect } from "react";
import "./Tickets.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/tickets/user", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allTickets) => {
        setTickets(allTickets);
        console.log(allTickets);
      });
  }, []);
  return (
    <div className="orders-container col-8">
      <h1>تیکت</h1>
      <table className="order__table table table-oraderDetails">
        <thead>
          <tr>
            <th>عنوان</th>
            <th>بخش</th>
            <th>وضعیت</th>
            <th>مشاهده پاسخ</th>
          </tr>
        </thead>
        <tbody className="order__table-body">
          {tickets.map((ticket) => (
            <tr className="order__table-body-list course-orderDetails">
              <td>{ticket.title}</td>
              <td>{ticket.departmentID}</td>

              {ticket.answer === 0 ? (
                <td className="text-danger">درحال بررسی</td>
              ) : (
                <td className="text-success">پاسخ داده شده</td>
              )}
              <td>
                <Link to={`answer/${ticket._id}`} className="btn btn-success">
                  مشاهده پاسخ
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"createticket"} className="btn btn-primary w-25 m-3">
        ایجاد تیکت جدید
      </Link>
    </div>
  );
}
