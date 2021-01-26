import { FORM_CHANGE, SEARCH_CHANGE, CATEGORIES_LOAD, PRODUCTS_LOAD, ORDERS_LOAD } from './constants';

export const formChange = (form) => {
    return {
        type: FORM_CHANGE,
        form
    }
};

export const searchChange = (search) => {
    return {
        type: SEARCH_CHANGE,
        search
    }
};

export const categoriesLoad = (categories) => {
    return {
        type: CATEGORIES_LOAD,
        categories
    }
};

export const productsLoad = (products) => {
    return {
        type: PRODUCTS_LOAD,
        products
    }
}

export const ordersLoad = (orders) => {
    return {
        type: ORDERS_LOAD,
        orders
    }
}