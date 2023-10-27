import {
    useEffect,
    useState
} from 'react';
import {
    Form,
    Checkbox,
    Button,
    Divider,
    Input
} from 'antd';
import type {
    CheckboxChangeEvent,
} from 'antd/es/checkbox';
import {
    useDispatch,
    useSelector,
} from 'react-redux';

import MyCart from '../components/MyCart';
import classes from './CheckOut.module.css';
import { fetchAllUsers } from '../store/auth-action';
import CardPng from '../assets/images/checkOut/Cards.png';

const CheckOut = () => {

    const dispatch = useDispatch();
    const subTotal = useSelector((state: any) => state.cart.totalPrice);
    const address = useSelector((state: any) => state.authentication.address);
    const [currentAddress, setCurrentAddress] = useState<string>();

    useEffect(() => {

        fetchAllUsers(dispatch);

    }, []);


    const tax = 4.23;
    const toalPrice = tax + subTotal;

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        cardNumber?: string;
        expireDate?: string;
        cvc?: string;
        cardName?: string;
        address?: string;
        remarks?: string;
    };

    const onChange = (e: CheckboxChangeEvent) => {

        if (e.target.checked) {

            setCurrentAddress(address.address + ' ' + address.city);
        } else {

            setCurrentAddress('');
        }

    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.myCart}>
                <MyCart />
            </div>
            <div className={classes.payment}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Divider className={classes.heading}>Or pay with card</Divider>
                    <div>
                        <p className={classes.title}>Country or rgion</p>

                        <div className={classes.cardDetailsContainer}>
                            <div className={classes.cardDetails}>

                                <Form.Item<FieldType>
                                    name="cardNumber"
                                    rules={[{ required: true, message: 'Please input your card number!' }]}
                                >
                                    <Input className={classes.formInput} placeholder='1234 1234 1234 1234' />
                                </Form.Item>
                                <img className={classes.cardsImg} alt='card' src={CardPng} />
                            </div>
                            <div className={classes.cardDetails}>
                                <Form.Item<FieldType>
                                    name="cardNumber"
                                    rules={[{ required: true, message: 'Please input your card exp date!' }]}
                                >
                                    <Input className={classes.formExp} placeholder='MM/YY' />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    name="cardNumber"
                                    rules={[{ required: true, message: 'Please input your card CVC!' }]}
                                >
                                    <Input className={classes.formCvc} placeholder='CVC' />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className={classes.title}>Name on card</p>
                        <Form.Item<FieldType>
                            name="cardNumber"
                            rules={[{ required: true, message: 'Please input your card name!' }]}
                        >
                            <Input className={classes.formName} />
                        </Form.Item>
                    </div>

                    <div className={classes.addressContainer}>
                        <Form.Item<FieldType>
                            name="cardNumber"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input placeholder={currentAddress || 'Delivery address'} value={currentAddress} className={classes.addressInput} />
                        </Form.Item>

                        <Checkbox onChange={onChange} className={classes.title}>Use Current Address</Checkbox>
                        <Form.Item<FieldType>
                            name="cardNumber"
                            rules={[{ required: true, message: 'Please input your remarks!' }]}
                        >
                            <Input placeholder='Remarks' className={classes.addressInput} />
                        </Form.Item>
                    </div>
                    <Form.Item >
                        <Button type='primary' htmlType="submit" className={classes.payBtn}>Pay ${toalPrice.toFixed(2)}</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )

}

export default CheckOut