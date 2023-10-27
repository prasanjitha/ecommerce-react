import React from 'react';
import {
    Button,
    Select,
} from 'antd';
import {
    useDispatch,
} from 'react-redux';

import classes from './CartItem.module.css';
import { cartActions } from '../store/cart-slice';

const { Option } = Select;

const CartItem: React.FC<{
    productId: number,
    imageUrl: string,
    prodName: string,
    price: number,
    discountPrice: number,
    quantity: number
}> = ({ productId, imageUrl, prodName, price, discountPrice, quantity }) => {

    const dispatch = useDispatch();

    const handleSelectChange = (value: any) => {

        const changeData = {
            id: productId,
            quantity: value
        };

        dispatch(cartActions.changeProductQuantity(changeData));

    };

    const removeItemHandler = () => {

        dispatch(cartActions.deleteItem(productId));
    };
    return (
        <div className={classes.prodCantainer}>
            <div className={classes.changeQty}>
                <img alt='product' className={classes.image} src={imageUrl} />
                <div className={classes.qtyContainer}>
                    <p className={classes.productName}>{prodName}</p>
                    <div className={classes.qty}>
                        <div className={classes.qtyText}>Qty</div>
                        <div>
                            <Select
                                defaultValue={quantity}
                                style={{ width: 70 }}
                                onChange={handleSelectChange}
                                className={classes.selectBtn}
                            >
                                <Option value="1"> 1</Option>
                                <Option value="2"> 2</Option>
                                <Option value="3"> 3</Option>
                                <Option value="4"> 4</Option>
                                <Option value="5"> 5</Option>
                                <Option value="6"> 6</Option>
                            </Select>

                        </div>
                        <Button className={classes.deleteBtn} onClick={removeItemHandler} type='primary'>Delete</Button>
                    </div>
                </div>
            </div>
            <div>
                <p className={classes.price}>${price!.toFixed(2)}</p>
                <p className={classes.discountPrice}>${discountPrice!.toFixed(2)} each</p>

            </div>

        </div>
    )
}

export default CartItem;