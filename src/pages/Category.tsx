import { useSelector } from 'react-redux';

import classes from './Category.module.css';
import ImageCard from '../components/ui-elements/image-card/ImageCard';
import CustomSpinner from '../components/ui-elements/spinner/CustomSpinner';

const Category = () => {

    const isLoading = useSelector((state: any) => state.ui.isLoading);
    const categoryData = useSelector((state: any) => state.products.categoryProducts);

    return (
        <div className={classes.container}>
            <CustomSpinner isLoading={isLoading}>
                <ul>
                    {<div className={classes.grid_container}>

                        {
                            categoryData.map((product: any) => (
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
    );
};

export default Category;