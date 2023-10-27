import axios from 'axios';

/**
 * Http client wrapper
 * @param {String} apiURL 
 * @param {String} httpMethod 
 * @param {Object} body 
 * @returns any
 */
const httpRequset = async (apiURL: string, httpMethod: string = "get", body: object = {}) => {
    console.log('///////////////');
    console.log(apiURL);
    try {
        const data = await axios({
            url: apiURL,
            method: httpMethod,
            data: body,
        });

        // const data = await axios.get('https://dummyjson.com/products/categories');
        console.log('*************************8888');
        console.log(data.data);
        return data.data;

    } catch (ex) {
        console.log("EX-", ex);
        return null;
    }
}

export {
    httpRequset
}