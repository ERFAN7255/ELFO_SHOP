import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../../../Context/authContext";
import "./AnswerTicket.css";

export default function AnswerTicket() {
  const { ticketID } = useParams();
  const authContext = useContext(AuthContext);
  const [answerTicket, setAnswerTicket] = useState([]);
  const [isAnswer, setIsAnswer] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/answer/${ticketID}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswerTicket(data);
        setIsAnswer(true);
      });
  }, [ticketID]);

  return (
    <div className="orders-container col-8">
      <h1>مشاهده پاسخ تیکت</h1>
      <div className="profile-container answer-ticket-containerChat">
        {answerTicket.answer ? (
          <>
            <div className="answer-ticket-containerChat-user">
              <h3 className="answer-ticket-user">
                {authContext.userInfos.name} -
              </h3>
              <p className="answer-ticket-body">{answerTicket.ticket}</p>
            </div>
            <div className="answer-ticket-containerChat-admin">
              <p className="answer-ticket-body">{answerTicket.answer}</p>
              <h3 className="answer-ticket-admin"> - ادمین سایت</h3>
            </div>
          </>
        ) : (
          <div className="alert alert-danger">
            هنوز پاسخی برای این تیکت وجود ندارد لطفا منتظر بمانید
          </div>
        )}

        <Link to={"/my-account/tickets"} className="w-25 text-bg-danger"  onClick={() => window.scrollTo(40, 40)}>
          برگشت به تیکت ها
        </Link>
      </div>
    </div>
  );
}
