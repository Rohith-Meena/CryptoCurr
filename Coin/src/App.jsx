import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Components/ErrorPage.jsx';
import Header from './Components/Header.jsx';
import CoinPage from './Components/CoinPage.jsx';
import Logo from './Components/logo.jsx';
import HomePage from './Components/HomePage.jsx';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:
      <><Logo/><Header/><HomePage/></>,
      // errorElement:<><Logo/><ErrorPage/></>,
    },
    {
      path:"/Coins/:id",
      element:<><Logo/><Header/><CoinPage/></>,
      // errorElement:<><Logo/><ErrorPage/></>,
    },
   
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
