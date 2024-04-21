import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

export default function SendTicket() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [departmentsSubs, setDepartmentsSubs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [ticketTypeID, setTicketTypeID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [body, setBody] = useState("");
  const [courseID, setCourseID] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/v1/tickets/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
      });

    fetch("http://localhost:4000/v1/users/courses", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
  }, []);

  const getDepartmentsSub = (departmentID) => {
    fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
      .then((res) => res.json())
      .then((subs) => setDepartmentsSubs(subs));
  };

  const sendTicket = (event) => {
    console.log("first");
    const newTicketInfos = {
      departmentID,
      departmentSubID: ticketTypeID,
      title,
      priority,
      body,
      course: courseID.length !== 0 ? courseID : undefined,
    };
    swal({
      title: "آیا از ارسال تیکت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch("http://localhost:4000/v1/tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
          body: JSON.stringify(newTicketInfos),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "تیکت با موفقیت ارسال شد, در اسرع وقت پاسخ داده میشود",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              navigate("/my-account/tickets");
            });
          } else {
            swal({
              title: "خطا در ارسال تیکت",
              text: "لطفا تمامی کادر ها را با دقت پرکرده باشید!!",
              icon: "warning",
              buttons: "تلاش دوباره",
            });
          }
        });
      }
    });
  };

  return (
    <div className="orders-container col-8">
      <h1>ارسال تیکت</h1>
      <div className="profile-container">
        <label htmlFor="username">عنوان تیکت :</label>
        <input
          type="text"
          id="username"
          placeholder="عنوان تیکت..."
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="password">دپارتمان :</label>
        <select
          className="ticket-form__select"
          onChange={(event) => {
            setDepartmentID(event.target.value);
            getDepartmentsSub(event.target.value);
          }}
        >
          <option className="ticket-form__option">
            نوع دپارتمان را انتخاب کنید...
          </option>
          {departments.map((department) => (
            <option value={department._id}>{department.title}</option>
          ))}
        </select>

        <label htmlFor="name">نوع تیکت :</label>
        <select
          className="ticket-form__select"
          onChange={(event) => setTicketTypeID(event.target.value)}
        >
          <option className="ticket-form__option">
            نوع تیکت را انتخاب کنید...
          </option>
          {departmentsSubs.map((sub) => (
            <option value={sub._id}>{sub.title}</option>
          ))}
        </select>

        <label htmlFor="email">اولویت تیکت :</label>
        <select
          className="ticket-form__select"
          onChange={(event) => setPriority(event.target.value)}
        >
          <option className="ticket-form__option" value={"3"}>
            اولویت تیکت را انتخاب کنید...
          </option>
          <option value={"3"}>کم</option>
          <option value={"2"}>متوسط</option>
          <option value={"1"}>بالا</option>
        </select>
        {ticketTypeID === "63b688c5516a30a651e98156" && (
          <>
            <label htmlFor="email">دوره را انتخاب کنید :</label>
            <select
              className="ticket-form__select"
              onChange={(event) => setCourseID(event.target.value)}
            >
              <option className="ticket-form__option">
                دوره را انتخاب کنید...
              </option>
              {courses.map((course) => (
                <option
                  className="ticket-form__option"
                  value={course._id}
                  key={course._id}
                >
                  {course.course.name}
                </option>
              ))}
            </select>
          </>
        )}

        <label htmlFor="phone">محتوای تیکت را وارد کنید :</label>
        <textarea
          type="number"
          id="phone"
          placeholder="محتوای تیکت..."
          onChange={(event) => setBody(event.target.value)}
        />

        <button className="text-bg-primary" onClick={sendTicket}>
          ارسال تیکت
        </button>
        <Link
          to={"/my-account/tickets"}
          onClick={() => window.scrollTo(40, 40)}
        >
          برگشت
        </Link>
      </div>
    </div>
  );
}
