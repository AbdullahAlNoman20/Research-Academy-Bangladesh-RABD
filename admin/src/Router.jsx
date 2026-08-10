// FILE: src/Router.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import ContentList from './pages/ContentList';
import ContentDetail from './pages/ContentDetail';
import Resources from './pages/Resources';
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
      { path: 'courses/:slug', element: <ContentDetail typeKey="courses" /> },
      { path: 'services', element: <ContentList typeKey="services" /> },
      { path: 'services/:slug', element: <ContentDetail typeKey="services" /> },
      { path: 'workshops', element: <ContentList typeKey="workshops" /> },
      { path: 'workshops/:slug', element: <ContentDetail typeKey="workshops" /> },
      { path: 'blog', element: <ContentList typeKey="blog" /> },
      { path: 'blog/:slug', element: <ContentDetail typeKey="blog" /> },
      { path: 'resources', element: <Resources /> },
      { path: 'contact', element: <Contact /> },
      { path: 'apply', element: <Apply /> },
      { path: '403', element: <Forbidden /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default Router;