import { redirect } from "react-router-dom";

export function getTokenDuration() {

    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAvailableItems() {
    const availableItems = localStorage.getItem('myCart');

    if (!availableItems) {
        return null;
    } else {
        const myObject = JSON.parse(availableItems);
        return myObject;
    }

}

export function loggedUser() {
    const user = localStorage.getItem('user');
    if (!user) {
        return null;
    }
    const myObject = JSON.parse(user);
    return myObject;
}

export function getAuthToken() {

    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return token;

}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();
    if (!token) {
        return redirect('/signin');
    } else {
        return token;
    }
}