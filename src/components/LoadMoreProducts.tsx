import React, {
    useEffect,
    useState,
} from 'react';
import { useSelector } from 'react-redux';

import classes from './LoadMoreProducts.module.css';
import ImageCard from './ui-elements/image-card/ImageCard';
import CustomSpinner from './ui-elements/spinner/CustomSpinner';
import { json } from 'react-router-dom';

const LoadMoreProducts = () => {

    const [page, setPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const productItems = useSelector((state: any) => state.products.products);
    const [items, setItems] = useState<any>(productItems);

    useEffect(() => {

        fetchData(page);

    }, [page]);

    const fetchData = async (page: any) => {

        try {

            setIsLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=${page}&skip=20`);
            const data = await response.json();
            setItems(data.products)
            setIsLoading(false);

        } catch (error) {

            setIsLoading(false);
            return json(
                { message: 'Something went wrong!' },
                { status: 500 }
            );

        }

    }

    const onScroll = () => {

        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight) {
            setPage(page + 10);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [items])

    return (
        <div className={classes.container}>
            <CustomSpinner isLoading={isLoading}>
                <ul>
                    {<div className={classes.grid_container}>

                        {
                            items.map((product: any) => (
                                <div className={classes.grid_item} key={product.id}>
                                    <ImageCard
                                        product={product}
                                        productId={product.id}
                                        title={product.title}
                                        price={product.price}
                                        itemImagePath={product.thumbnail}
                                        status='New'
                                        statusColor='#01AD5A'
                                        isDiscount={true}
                                        discoutPrice={product.price + product.price * product.discountPercentage / 100}
                                    />
                                </div>

                            )
                            )
                        }
                    </div>}
                </ul>
            </CustomSpinner>
        </div>
    )
}

export default LoadMoreProducts;