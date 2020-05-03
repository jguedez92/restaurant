import axios from 'axios';
import { API_URL } from '../../api-config';
import store from '../store';

export const getAllProducts = async(page = 0) => {
    try {
        const res = await axios.get(API_URL + 'products');
        store.dispatch({
            type: 'GET_ALL_PRODUCTS',
            payload: res.data.products
        })

        return res;
    } catch (error) {
        console.error(error)
    }
}
export const insert = async(product) => {
    await axios.post(API_URL + 'products', product);
    return getAllProducts();
}
// export const deleteOne = async(post_id) => {
//     await axios.delete(API_URL + 'products/' + post_id, {
//         headers: {
//             Authorization: localStorage.getItem('authToken')
//         }
//     });
//     return getAllProducts();
// }