import React, {
    useEffect,
    useState
} from 'react';
import {
    Button,
    Rate
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { cartActions } from '../store/cart-slice';
import classes from './ProductDetailsCard.module.css';
import ImageCard from './ui-elements/image-card/ImageCard';


const ProductDetailsCard: React.FC<{ data: any }> = ({ data }) => {

    const dispatch = useDispatch();

    const product = data.resData;
    const imgs = product.images;
    const [count, setCount] = useState(1);
    const [wordData, setWordData] = useState(imgs[0]);

    useEffect(() => {

        setWordData(data.resData.images[0]);
        setCount(1);

    }, [imgs]);

    const incrementCount = () => {
        setCount(prev => prev + 1)
    };

    const decrementCount = () => {

        setCount(prev => prev - 1);

        if (count <= 1) {

            setCount(1);
        }
    };

    const addItemToCartHandler = () => {

        const cartData = {
            item: product,
            quantity: count,
            itemPrice: product.price * count
        }

        dispatch(cartActions.addItemToCart(cartData));

    };


    const handleClick = (index: number) => {

        const wordSlider = imgs[index];
        setWordData(wordSlider)
    };

    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.imagesContainer}>
                    <div className='flex_row'>
                        {imgs.map((data: any, i: any) =>
                            <div className={classes.thumbnail} key={i} >
                                <img
                                    className={wordData.id == i ? "clicked" : ""}
                                    src={data}
                                    onClick={() => handleClick(i)}
                                    height="70"
                                    width="100"
                                />
                            </div>
                        )}
                    </div>
                    <div className={classes.imageBackgoud}>
                        <img src={wordData} className={classes.mainImage} />
                    </div>
                </div>
                <div className={classes.details}>
                    <p className={classes.title}>Brand:<span className={classes.subTitle}>{product.brand}</span></p>
                    <p className={classes.title}>Model:<span className={classes.subTitle}>OLDSJAHDKDKE</span></p>
                    <p className={classes.title}>Availability:<span className={classes.subTitle}>Only {product.stock} in Stock</span></p>
                    <p className={classes.mainTitle}>{product.title}</p>
                    <Rate allowHalf className={classes.rateBar} defaultValue={product.rating} />
                    <p className={classes.itemDescription}>
                        {product.description}
                    </p>
                    <div>
                        <p className={classes.usd}>USD(incl. of all taxes):</p>
                        <p className={classes.price}>${product.price}
                            <span className={classes.discount}>
                                ${product.price + product.price * product.discountPercentage / 100}
                            </span>
                        </p>
                    </div>

                    <div className={classes.cartArea}>
                        <div className={classes.changeQuantity}>
                            <div className={classes.changeBtn} onClick={decrementCount}>  - </div>
                            <p className={classes.changeBtn}> {count}</p>
                            <div className={classes.changeBtn} onClick={incrementCount}>+</div>
                        </div>
                        <div>
                            <Button type="primary" onClick={addItemToCartHandler} className={classes.buyNowBtn}>Buy Now</Button>
                            <Button className={classes.addToCart} onClick={addItemToCartHandler}>Add to Cart</Button>
                        </div>

                    </div>
                </div>
            </div>
            <div className={classes.recentImage}>

                <div className={classes.grid_container}>

                    {
                        data.data.products.map((product: any) =>
                        (
                            <div className={classes.grid_item}>
                                <Link to={`/product/${product.id}`}>
                                    <ImageCard
                                        productId={product.id}
                                        product={product}
                                        title={product.title}
                                        price={product.price}
                                        itemImagePath={product.thumbnail}
                                        status='New'
                                        statusColor='#01AD5A'
                                        isDiscount={true}
                                        discoutPrice={product.price + product.price * product.discountPercentage / 100}
                                    />
                                </Link>
                            </div>

                        )
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default ProductDetailsCard;