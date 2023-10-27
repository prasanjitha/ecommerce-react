import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import cartWhite from '../../../assets/icons/home/cart-white.png';
import cartDark from '../../../assets/icons/cart/addCart.png';
import heart from '../../../assets/icons/home/Heart.png';
import redHeart from '../../../assets/icons/home/icons8-favorite-48.png';

import classes from './ImageCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import { Link } from 'react-router-dom';
import { productActions } from '../../../store/product-slice';
import { url } from 'inspector';

const ImageCard: React.FC<{ product: any, productId?: number, title: string, price: number, itemImagePath: string, statusColor: string, status: string, isDiscount: boolean, discoutPrice?: number }> = (props) => {

    console.log('View same category item Id:', props.productId);
    const dispatch = useDispatch();
    const cartData = useSelector((state: any) => state.cart.items);
    const favoriteProducts = useSelector((state: any) => state.products.favorite);
    console.log('favorite Items:', favoriteProducts);
    const [myFav, setMyFev] = useState(false);
    const [addItemToCart, setAddItemToCart] = useState(false);

    const id = props.productId;

    useEffect(() => {
        const cartItem = cartData.find((item: any) => item.item.id === id);
        if (cartItem) {
            setAddItemToCart(true);
        };
        const favProduct = favoriteProducts.find((product: any) => product.id === id);
        if (favProduct) {
            setMyFev(true);
        }

    }, [cartData, favoriteProducts]);


    const addItemToCartHandler = () => {
        const cartData = {
            item: props.product,
            quantity: 1,
            itemPrice: props.price * 1
        }
        dispatch(cartActions.addItemToCart(cartData));
        setAddItemToCart(true);

    }

    const removeItemToCart = () => {

        dispatch(cartActions.removeItemFromCart(id));
        setAddItemToCart(false);
    }

    const addFavoriteHandler = () => {
        dispatch(productActions.addFavorite(props.product));
        setMyFev(true);
    }

    const removeFavoriteHandler = () => {
        dispatch(productActions.removeFavorite(props.product));

        setMyFev(false);
    }

    return (
        <Card className={classes.mainContainer} bodyStyle={{ padding: 0 }}>
            <Link to={`/product/${id}`}>
                <img alt="chair-one" className={classes.mainImage} src={props.itemImagePath} />

            </Link>
            <div className={classes.cardFooter}>
                <div>
                    <p className={classes.title}>{props.title}</p>
                    <div className={classes.priceContainer}>
                        <p className={classes.subTitle}>${props.price!.toFixed(2)}</p>
                        {props.isDiscount && <p className={classes.discoutPrice}>${props.discoutPrice!.toFixed(2)}</p>}

                    </div>
                </div>

                {
                    addItemToCart ? <div className={classes.cartWhite} onClick={removeItemToCart}>
                        <img alt='cart' src={cartWhite} />
                    </div> : <img alt='cart' className={classes.cartAdded} onClick={addItemToCartHandler} src={cartDark} />
                }



            </div>
            <div className={classes.textButton} style={{ backgroundColor: props.statusColor }}>
                <p className={classes.btnText}>{props.status}</p>
            </div>

            <div className={classes.fevButton} >

                {
                    myFav ? <div onClick={removeFavoriteHandler}>
                        <img alt='heart' src={redHeart} />
                    </div> : <div className="fevBoarder">
                        <img alt='heart' className={classes.fevContainer} src={heart} onClick={addFavoriteHandler} />
                    </div>}



            </div>
        </Card>

    )
}

export default ImageCard