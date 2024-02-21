import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Ecommerce/src/App.jsx'
import './index.css'
import 'swiper/css';

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// fonts and icons
// import '././assets/css/icofont.min.css';
import './Ecommerce/src/assets/css/icofont.min.css';
import './Ecommerce/src/assets/css/animate.css';
import './Ecommerce/src/assets/css/style.min.css';

import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from './Ecommerce/src/pages/Home/Home.jsx';
import Shop from './Ecommerce/src/pages/Shop/Shop.jsx';
import SingleProduct from './Ecommerce/src/pages/Shop/SingleProduct.jsx';
import Blog from './Ecommerce/src/pages/Blog/Blog.jsx';
import SingleBlog from './Ecommerce/src/pages/Blog/SingleBlog.jsx';
import About from './Ecommerce/src/pages/AboutPage/About.jsx';
import Contact from './Ecommerce/src/pages/ContactPage/Contact.jsx';
import CartPage from './Ecommerce/src/pages/Shop/CartPage.jsx';
import CheckoutPage from './Ecommerce/src/pages/Shop/CheckoutPage.jsx';
import Signup from './Ecommerce/src/components/Signup.jsx';
import Login from './Ecommerce/src/components/Login.jsx';
import ErrorPage from './Ecommerce/src/components/ErrorPage.jsx';
import PrivateRoute from './Ecommerce/src/PrivateRoute/PrivateRoute.jsx';
import AuthProviderE from './Ecommerce/src/contexts/AuthProviderE.jsx';

export const AppEcommerce = () => {
  return (
    <AuthProviderE>
      <BrowserRouter>
        <Routes>
          <Route path="/Ecommerce" element={<Home />}></Route>
          <Route path="/Shop" element={<Shop/>}></Route>
          <Route path="/shop/:id" element={<SingleProduct />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/blog/:id" element={<SingleBlog />}></Route>
          <Route path="/aboutE" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/cart-page" element={<PrivateRoute><CartPage/></PrivateRoute>}></Route>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/check-out" element={<CheckoutPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProviderE>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/Ecommerce",
        element: <Home/>
      },
      {
        path: "/shop",
        element: <Shop/>
      },
      {
        path: "shop/:id",
        element: <SingleProduct/>
      },
      {
        path: "/blog",
        element: <Blog/>
      },
      {
        path: "/blog/:id",
        element: <SingleBlog/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/cart-page",
        element: <PrivateRoute><CartPage/></PrivateRoute>
      },
      {
        path: "/HomeUser",
        // element: <PrivateRoute><CartPage/></PrivateRoute>
      },
    ]
  },
  {
    path: "/sign-up",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/check-out",
    element: <CheckoutPage/>
  },
]);

export default router;
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <AuthProvider>
//      <RouterProvider router={router} />
//   </AuthProvider>
  
// )
