import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <Error/>,
    children: [
      { index: true, element: <Home/> },
      { path: 'account', element: <Account/> },
      { path: 'cart', element: <Cart/> }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}