// FILE: src/Router.jsx  (full rewrite — dedicated detail pages, new routes)
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import ContentList from './pages/ContentList';
import CourseDetail from './pages/CourseDetail';
import ServiceDetail from './pages/ServiceDetail';
import WorkshopDetail from './pages/WorkshopDetail';
import BlogDetail from './pages/BlogDetail';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import NotFound from './pages/errors/NotFound';
import ServerError from './pages/errors/ServerError';
import Forbidden from './pages/errors/Forbidden';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ServerError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'courses', element: <ContentList typeKey="courses" /> },
      { path: 'courses/:slug', element: <CourseDetail /> },
      { path: 'services', element: <ContentList typeKey="services" /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'workshops', element: <ContentList typeKey="workshops" /> },
      { path: 'workshops/:slug', element: <WorkshopDetail /> },
      { path: 'blog', element: <ContentList typeKey="blog" /> },
      { path: 'blog/:slug', element: <BlogDetail /> },
      { path: 'resources', element: <Resources /> },
      { path: 'resources/:slug', element: <ResourceDetail /> },
      { path: 'publications', element: <Publications /> },
      { path: 'our-work', element: <Projects /> },
      { path: 'contact', element: <Contact /> },
      { path: 'apply', element: <Apply /> },
      { path: '403', element: <Forbidden /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default Router;