import React, { useState } from 'react';
import {
    Button,
    Menu,
    Dropdown,
    Input,
    MenuProps,
} from 'antd';
import {
    Form,
    Link,
    useNavigate,
} from 'react-router-dom';
import {
    useDispatch,
    useSelector,
} from 'react-redux';

import { loggedUser } from '../util/auth';
import classes from './MainNavbar.module.css';
import Logo from '../assets/icons/home/logo.png';
import { cartActions } from '../store/cart-slice';
import FavIcon from '../assets/icons/home/Heart.png';
import Cart from '../assets/icons/home/cart-black.png';
import AccoutPng from '../assets/icons/home/accout.png';
import CorrectIcon from '../assets/icons/home/correct.svg';
import AuthUser from '../assets/images/profile/authUser.png';
import { getProductsByCategory, getSearchProduct } from '../store/product-action';

const Search = Input.Search;

const MainNavbar = () => {

    const user = loggedUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartQuantity = useSelector((state: any) => state.cart.totalQuantity);
    const allCategories = useSelector((state: any) => state.products.allCategories);
    const cartData = useSelector((state: any) => state.cart.items);
    const favoriteProducts = useSelector((state: any) => state.products.favorite);

    const [seatchKey, setSearchKey] = useState<string>('');
    const [btnText, setBtnText] = useState('All Categories');

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to="/profile">
                    My Profile
                </Link>

            ),
        },
        {
            key: '2',
            label: (
                <Form action='/logout' method='post'>
                    <button className={classes.logoutBtn} onClick={() => {
                        const data: any = {
                            items: [],
                            totalQuantity: 0,

                        }
                        dispatch(cartActions.replacrCart(data));
                    }}>Logout</button>
                </Form>
            ),
        },

    ];

    const searchItemHandler = () => {
        getSearchProduct(dispatch, seatchKey);
        navigate("/search");
    }

    function handleMenuClick(e: any) {
        getProductsByCategory(dispatch, e.key);
        setBtnText(e.key);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            {
                allCategories.map((category: any) => (

                    <Menu.Item key={category}>
                        <Link to="/category">
                            {category}
                        </Link>
                    </Menu.Item>

                ))
            }

        </Menu>
    );

    return (
        <div className={classes.main}>

            <div className={classes.topCantaier}>
                <img alt='correct' className={classes.correct} src={CorrectIcon} />
                <p className={classes.topText}>Free shipping on all orders over $50</p>
            </div>
            <div className={classes.bottomContainer}>
                <Link to="/">
                    <div className={classes.logoContainer}>
                        <img alt='logo' className={classes.logo} src={Logo} />
                        <p className={classes.logoText}>Comforty</p>
                    </div>
                </Link>
                <div className={classes.middleArea}>
                    <Dropdown overlay={menu}>
                        <Button className={classes.categoryBtn}>
                            {btnText}
                        </Button>
                    </Dropdown>
                    <div className={classes.searchContainer}>

                        <Search
                            className={classes.search}
                            placeholder="Search here..."
                            style={{ width: 200, }}
                            onSearch={(value: string) => {
                                setSearchKey(value);
                                searchItemHandler();
                            }}
                        />

                        <Button type="primary" className={classes.searchBtn} onClick={searchItemHandler}>Search</Button>

                    </div>
                </div>

                <div className={classes.userInfo}>
                    <div className={classes.cart}>
                        <img alt='cart' src={Cart} />
                        <p className={classes.cartText}>
                            <Link to={cartData.length === 0 ? "/" : "cart"}>Cart</Link>
                        </p>

                        <div className={classes.counter}>
                            {cartQuantity}
                        </div>

                    </div>
                    {!user && <Link to="/signin">
                        <img alt='accont' className={classes.account} src={AccoutPng} />
                    </Link>}
                    {user && <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>

                        <img alt='accont' className={classes.account} src={AuthUser} />

                    </Dropdown>}

                    {favoriteProducts.length > 0 && <Link to="/favorite">
                        <div className={classes.favContainer}>
                            <img src={FavIcon} className={classes.favorite} />
                            <p className={classes.favCount}>{favoriteProducts.length}</p>

                        </div>

                    </Link>}
                </div>
            </div>
        </div>
    )
}

export default MainNavbar