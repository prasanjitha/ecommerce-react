import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CartItem from './CartItem';
import classes from './MyCart.module.css';
import CheckOutCard from './CheckOutCard';

const MyCart = () => {

    const cartItems = useSelector((state: any) => state.cart.items);
    const location: any = useLocation();

    if (cartItems.length === 0) {
        return (<div className={classes.emptyCart}>
            <p>Empty cart!</p>
        </div>
        )
    };

    return (
        <>
            <div className={classes.myCart}>
                {
                    cartItems.map((product: any) => (
                        <CartItem
                            key={product.item.id}
                            productId={product.item.id}
                            imageUrl={product.item.thumbnail}
                            prodName={product.item.title}
                            price={product.itemPrice}
                            discountPrice={product.item.price}
                            quantity={product.quantity}
                        />
                    ))
                }
                <CheckOutCard />
            </div>
            {location.pathname !== "/checkout" && <div className={classes.bottomBar}></div>}
        </>
    )
}

export default MyCart;