// FILE: src/Router.jsx  (full rewrite — dedicated detail Pages, new routes)
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Components/layout/MainLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ContentList from "./Pages/ContentList";
import CourseDetail from "./Pages/CourseDetail";
import ServiceDetail from "./Pages/ServiceDetail";
import WorkshopDetail from "./Pages/WorkshopDetail";
import BlogDetail from "./Pages/BlogDetail";
import Resources from "./Pages/Resources";
import ResourceDetail from "./Pages/ResourceDetail";
import Publications from "./Pages/Publications";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Apply from "./Pages/Apply";
import NotFound from "./Pages/errors/NotFound";
import ServerError from "./Pages/errors/ServerError";
import Forbidden from "./Pages/errors/Forbidden";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ServerError />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "courses", element: <ContentList typeKey="courses" /> },
      { path: "courses/:slug", element: <CourseDetail /> },
      { path: "services", element: <ContentList typeKey="services" /> },
      { path: "services/:slug", element: <ServiceDetail /> },
      { path: "workshops", element: <ContentList typeKey="workshops" /> },
      { path: "workshops/:slug", element: <WorkshopDetail /> },
      { path: "blog", element: <ContentList typeKey="blog" /> },
      { path: "blog/:slug", element: <BlogDetail /> },
      { path: "resources", element: <Resources /> },
      { path: "resources/:slug", element: <ResourceDetail /> },
      { path: "publications", element: <Publications /> },
      { path: "our-work", element: <Projects /> },
      { path: "contact", element: <Contact /> },
      { path: "apply", element: <Apply /> },
      { path: "403", element: <Forbidden /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default Router;
