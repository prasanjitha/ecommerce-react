import { redirect } from "react-router-dom";

export function action() {

    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('myCart');
    localStorage.removeItem('user');

    return redirect('/');
}