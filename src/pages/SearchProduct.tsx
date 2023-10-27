import { useSelector } from 'react-redux';

import classes from './SearchProduct.module.css';
import ImageCard from '../components/ui-elements/image-card/ImageCard';
import CustomSpinner from '../components/ui-elements/spinner/CustomSpinner';

const SearchProduct = () => {

    const searchProducts = useSelector((state: any) => state.products.searchProducts);
    const isLoading = useSelector((state: any) => state.ui.isLoading);

    return (
        <div className={classes.container}>
            <CustomSpinner isLoading={isLoading}>
                {searchProducts.length === 0 ? <p>No Item Found!</p> : <ul>
                    {<div className={classes.grid_container}>

                        {
                            searchProducts.map((product: any) => (
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
                </ul>}
            </CustomSpinner>
        </div>

    )
}

export default SearchProduct;