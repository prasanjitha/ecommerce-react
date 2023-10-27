import React, {
    useEffect,
} from 'react'
import {
    Outlet,
    useLoaderData,
    useSubmit,
} from 'react-router-dom';

import Footer from '../components/Footer';
import { getTokenDuration } from '../util/auth';
import MainNavbar from '../components/MainNavbar';

const RootLayout = () => {

    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {

        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {

            submit(null, { action: '/logout', method: 'post' });
            return;

        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);

        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' });
        }, tokenDuration);

    }, [token, submit]);

    return (
        <>
            <MainNavbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default RootLayout