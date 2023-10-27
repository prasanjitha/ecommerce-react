import {
    Button,
    Input,
    Space,
    Spin,
    Checkbox,
    Form,
} from 'antd';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    json,
    useNavigate,
} from 'react-router-dom';

import classes from './SignIn.module.css';
import { sendUserData } from '../store/auth-action';


const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: any) => state.ui.isLoading);
    const cartItems = useSelector((state: any) => state.cart.items);

    const onFinish = async (values: any) => {

        const userData = {
            username: values.username,
            password: values.password
        }

        try {

            await sendUserData(dispatch, userData);
            cartItems.length > 0 ? navigate('/checkout') : navigate('/');

        } catch (error) {
            return json({ message: 'Something went wrong!' }, { status: 500 })
            console.log('err', error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {

        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    return (
        <>
            {!isLoading && <div className={classes.mainContainer}>
                <div className={classes.container}>
                    <p className={classes.signInText}>Sign In</p>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className={classes.input} />
                        </Form.Item>

                        <Form.Item<FieldType>

                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password className={classes.input} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox className={classes.checkBox}>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item >

                            <Space direction="vertical" style={{ width: '100%' }} >

                                <Button type="primary" className={classes.signinBtn} block htmlType='submit'>
                                    Sign In
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>}
            {isLoading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 300 }}>
                <Spin size="large" />
            </div>}
        </>
    );
}

export default SignIn