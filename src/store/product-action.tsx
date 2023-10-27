import { uiActions } from "./ui-slice";
import { productActions } from "./product-slice";
import { httpRequset } from "../helpers/http-wrapper.helper";
import {
    getAllCategoryAPI,
    getProductListAPI,
    getProductsByCategoryAPI,
    getSearchProductAPI,
} from "../configs/api-end-points";

export const fetchCartData = (dispatch: any, page: any) => {
    return new Promise<void>(async (resolve, reject) => {
        const fetchData = async () => {

            const response = await httpRequset(getProductListAPI.replace("${page}", page));

            if (!response) {

                throw new Error('Could not fetch cart data!');
            }
            return response;
        };
        try {
            dispatch(uiActions.loadingSpinner(true));

            const cartData = await fetchData();
            console.log('call the function', cartData);

            dispatch(productActions.replacrCart({
                items: cartData.products,
            }));
            dispatch(uiActions.loadingSpinner(false));


        } catch (err) {
            dispatch(uiActions.loadingSpinner(false));
            console.log('err', err);
        }

        resolve();
    });
};


export const fetchAllCategories = (dispatch: any) => {
    return new Promise<void>(async (resolve, reject) => {
        const fetchData = async () => {

            const responseCategory = await httpRequset(getAllCategoryAPI);
            if (!responseCategory) {
                throw new Error('Could not fetch category data!');
            }
            return responseCategory;
        };
        try {
            dispatch(uiActions.loadingSpinner(true));

            const categories = await fetchData();
            console.log('call the function', categories);

            dispatch(productActions.addCatgories(categories));
            dispatch(uiActions.loadingSpinner(false));

        } catch (err) {
            dispatch(uiActions.loadingSpinner(false));
            console.log('err', err);
        }

        resolve();
    });
};


export const getProductsByCategory = (dispatch: any, category: string) => {
    return new Promise<void>(async (resolve, reject) => {
        const fetchData = async () => {
            const response = await httpRequset(getProductsByCategoryAPI.replace("${category}", category));
            if (!response) {
                throw new Error('Could not fetch category data!');
            }
            return response;
        };
        try {
            dispatch(uiActions.loadingSpinner(true));

            const categories = await fetchData();
            console.log('call the function', categories);

            dispatch(productActions.addCategoryData({
                items: categories.products,
            }));
            dispatch(uiActions.loadingSpinner(false));

        } catch (err) {
            dispatch(uiActions.loadingSpinner(false));
            console.log('err', err);

        }

        resolve();
    });
};


export const getSearchProduct = (dispatch: any, searchKey: string) => {
    return new Promise<void>(async (resolve, reject) => {


        const fetchData = async () => {

            const response = await httpRequset(getSearchProductAPI.replace("${searchKey}", searchKey));

            if (!response) {
                throw new Error('Could not fetch category data!');
            }

            console.log('search product Name: ', response.products);
            return response;
        };
        try {
            dispatch(uiActions.loadingSpinner(true));

            const categories = await fetchData();
            console.log('call the function', categories);

            dispatch(productActions.addSearchProducts({
                items: categories.products,
            }));
            dispatch(uiActions.loadingSpinner(false));


        } catch (err) {
            dispatch(uiActions.loadingSpinner(false));
            console.log('err', err);

        }

        resolve();
    });
};
