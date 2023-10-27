import { Suspense } from 'react';
import {
    Await,
    defer,
    json,
    useRouteLoaderData
} from 'react-router-dom';

import ProductDetailsCard from './ProductDetailsCard';
import CustomSpinner from './ui-elements/spinner/CustomSpinner';

const ProductDetails = () => {

    const { event }: any = useRouteLoaderData('event-detail');

    return (
        < div style={{ paddingTop: 200 }}>
            <Suspense fallback={<CustomSpinner />}>
                <Await resolve={event}>
                    {(loadEvent) => <ProductDetailsCard data={loadEvent} />}
                </Await>
            </Suspense>
        </div>
    );
}

export default ProductDetails;

async function loadEvent(id: any) {

    try {

        const response = await fetch('https://dummyjson.com/products/' + id);

        if (!response.ok) {

            throw json({
                message: 'Could not fetch details for selected event.'
            }, {
                status: 500
            });
        } else {

            const resData = await response.json();

            const category = resData.category;
            const resCategoryData = await fetch(`https://dummyjson.com/products/category/${category}?limit=10&skip=0`);

            if (!resCategoryData.ok) {

                throw json({
                    message: 'Could not fetch details for selected event.'
                }, {
                    status: 500
                });
            } else {

                const data = await resCategoryData.json();

                return {
                    resData,
                    data
                };
            }

        }
    } catch (error) {

        console.log(error);
    }

}

export async function loader({ params }: any) {

    const id = params.id;

    return defer({
        event: loadEvent(id)
    });
}