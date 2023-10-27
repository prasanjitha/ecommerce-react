import { uiActions } from './ui-slice';
import { authActions } from './auth-slice';
import { httpRequset } from '../helpers/http-wrapper.helper';
import {
    getAllUsersAPI,
    postUserDataAPI,
} from '../configs/api-end-points';

export const sendUserData = (dispatch: any, data: any) => {
    return new Promise<void>(async (resolve, reject) => {
        dispatch(uiActions.loadingSpinner(true));

        try {

            const response = await httpRequset(postUserDataAPI, "POST", data);

            console.log(response);
            dispatch(authActions.authUser(response));


            const jsonString = JSON.stringify(response);

            localStorage.setItem('user', jsonString);

            const token = response.token;

            console.log(token);
            localStorage.setItem('token', token);

            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            localStorage.setItem('expiration', expiration.toISOString());

            dispatch(uiActions.loadingSpinner(false));


        } catch (error) {

            console.error('Error:', error);
            dispatch(uiActions.loadingSpinner(false));

        }
        resolve();
    });
};

export const fetchAllUsers = (dispatch: any) => {

    return new Promise<void>(async (resolve, reject) => {
        dispatch(uiActions.loadingSpinner(true));

        try {

            const response = await httpRequset(getAllUsersAPI);

            const allUsers = response.users;
            const findUser = allUsers.find((user: any) => user.id === user.id);

            dispatch(authActions.addUserAddress(findUser.address));


        } catch (error) {

            console.error('Error:', error);
            dispatch(uiActions.loadingSpinner(false));

        }
        resolve();
    });
};
