import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo.jsx";
import Articles from "./Pages/Articles/Articles.jsx";
import CourseInfo from "./Pages/CourseInfo/CourseInfo.jsx";
import Courses from "./Pages/Courses/Courses.jsx";
import Index from "./Pages/Index/Index";
import Login from "./Pages/Login/Login.jsx";
import Search from "./Pages/Search/Search.jsx";

import UserPanelIndex from "./Pages/UserPanel/IndexUserPanel.jsx";
import UserPanelOrders from "./Pages/UserPanel/Orders/Orders.jsx";
import UserPanelProfile from "./Pages/UserPanel/Profile/Profile.jsx";
import UserPanelSendTicket from "./Pages/UserPanel/Tickets/SendTicket/SendTicket.jsx";
import UserPanelAnswerTicket from "./Pages/UserPanel/Tickets/AnswerTicket/AnswerTicket.jsx";
import UserPanelTickets from "./Pages/UserPanel/Tickets/Tickets.jsx";
import UserPanelEditProfile from "./Pages/UserPanel/EditProfile/EditProfile.jsx";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/courses", element: <Courses /> },
  { path: "/course/:courseName", element: <CourseInfo /> },
  { path: "/articles", element: <Articles /> },
  { path: "/articles/:articlename", element: <ArticleInfo /> },
  { path: "/search/:value", element: <Search /> },

  {
    path: "/my-account",
    element: <UserPanelIndex />,
    children: [
      { path: "orders", element: <UserPanelOrders /> },
      { path: "profile", element: <UserPanelProfile /> },
      { path: "edit-profile", element: <UserPanelEditProfile /> },
      { path: "tickets", element: <UserPanelTickets /> },
      { path: "tickets/createticket", element: <UserPanelSendTicket /> },
      { path: "tickets/answer/:ticketID", element: <UserPanelAnswerTicket /> },
    ],
  },
];

export default routes;
