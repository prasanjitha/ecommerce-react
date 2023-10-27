import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Favorite.module.css';
import ImageCard from '../components/ui-elements/image-card/ImageCard';

const Favorite = () => {

    const favoriteProducts = useSelector((state: any) => state.products.favorite);

    return (
        <div className={classes.container}>
            {favoriteProducts.length > 0 ? <ul>

                {
                    <div className={classes.grid_container}>
                        {
                            favoriteProducts.map((product: any) => (
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
                    </div>
                }
            </ul> : <div className={classes.emptyFav}>

                <p>No Favorite Products! Please Add Hurryup!</p>
                <Link to="/"  >
                    <Button className={classes.addBtn} type='primary'>Add</Button>
                </Link>
            </div>}
        </div>

    );
};

export default Favorite;