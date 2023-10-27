import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import PageContent from '../components/PageContent';

const Error = () => {

    const error: any = useRouteError();
    let title = "An Error Ocuured!";
    let message = "Something went wrong!";

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Not found!";
        message = "Could not find resource or page.";
    }

    return (
        <>
            <MainNavbar />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>

        </>
    )
}

export default Error;