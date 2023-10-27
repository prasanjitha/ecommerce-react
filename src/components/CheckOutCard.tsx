import React from 'react';
import {
    Button,
    Divider
} from 'antd';
import {
    Link,
    useLocation,
    useRouteLoaderData,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './ChaeckOutCard.module.css';

const CheckOutCard = () => {

    const subTotal = useSelector((state: any) => state.cart.totalPrice);
    const cartData = useSelector((state: any) => state.cart.items);

    const token = useRouteLoaderData('root');
    const location: any = useLocation();
    const tax = 4.23;
    const toalPrice = tax + subTotal;

    const saveCartHandler = () => {
        const myCart: any = {
            products: cartData,
            totalPrice: toalPrice,
        };

        const jsonString = JSON.stringify(myCart);

        localStorage.setItem('myCart', jsonString);

    }

    return (
        <>
            <div className={classes.checkoutContainer}>
                <div className={classes.cartItems}>
                    <p className={classes.title}>Subtotal</p>
                    <p className={classes.title}>${subTotal.toFixed(2)}</p>
                </div>
                <Divider />
                <div className={classes.cartItems}>
                    <p className={classes.salesTax}>Sales tax (6.5%)</p>
                    <p className={classes.salesTax}>${tax.toFixed(2)}</p>
                </div>
                <Divider />
                <div className={classes.cartItems}>
                    <p className={classes.title}>Total due</p>
                    <p className={classes.title}>${toalPrice.toFixed(2)}</p>
                </div>
                {location.pathname !== "/checkout" && <Button type='primary' className={classes.chackOutBtn} onClick={saveCartHandler}>

                    <Link to={token ? "/checkout" : "/signin"}>Check Out</Link>

                </Button>}

            </div>
        </>
    )
}

export default CheckOutCard