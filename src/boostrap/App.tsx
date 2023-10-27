import React, { useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import './App.css';
import Home from '../pages/Home';
import Error from '../pages/Error';
import RootLayout from '../pages/Root';
import CheckOut from '../pages/CheckOut';
import Favorite from '../pages/Favorite';
import Category from '../pages/Category';
import SignIn from '../components/SignIn';
import MyCart from '../components/MyCart';
import { cartActions } from '../store/cart-slice';
import SearchProduct from '../pages/SearchProduct';
import ProfileDetails from '../pages/ProfileDetails';
import { action as logoutAction } from '../pages/LogOut';
import { checkAuthLoader, getAvailableItems, tokenLoader } from '../util/auth';
import { fetchAllCategories, fetchCartData } from '../store/product-action';
import ProductDetails, { loader as productDetailsLoader } from '../components/ProductDetails';

const router = createBrowserRouter([

  {
    path: '/',
    id: 'root',
    loader: tokenLoader,
    errorElement: <Error />,
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'product/:id',
        id: 'event-detail',
        loader: productDetailsLoader,
        element: <ProductDetails />
      },
      {
        path: 'logout',
        action: logoutAction,
      },
      {
        path: 'cart',
        element: <MyCart />
      },
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'checkout',
        element: <CheckOut />,
        loader: checkAuthLoader
      },
      {
        path: 'profile',
        element: <ProfileDetails />,
        loader: checkAuthLoader
      },
      {
        path: 'favorite',
        element: <Favorite />
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'search',
        element: <SearchProduct />
      },
    ]
  },

]);

function App() {

  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state.cart.items);

  useEffect(() => {

    fetchCartData(dispatch, 10).catch(error => {
      console.log('err', error);
    });

    fetchAllCategories(dispatch);

    const availableItem = getAvailableItems();

    if (availableItem) {

      const data: any = {
        items: availableItem.products,
        totalQuantity: availableItem.products.length,

      }

      dispatch(cartActions.replacrCart(data));
    }

  }, [dispatch]);

  return (<RouterProvider router={router} />);

}

export default App;
