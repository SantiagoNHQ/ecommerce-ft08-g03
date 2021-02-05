import { FORM_CHANGE, SEARCH_CHANGE, SEARCH_CLICK, CATEGORIES_LOAD, PRODUCTS_LOAD, ORDERS_LOAD, ADD_CARRITO, CHANGE_USER_STATUS, CHANGE_EDIT_PRODUCT, SET_USER } from './constants';

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

export const searchClick = (search) => {
    return {
        type: SEARCH_CLICK,
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

export const addCarrito = (carrito) => {
    return {
        type: ADD_CARRITO,
        carrito
    }
};

export const changeUserStatus = (logged) => {
    return {
        type: CHANGE_USER_STATUS,
        logged
    }
};

export const changeEditProduct = (editarProducto) => {
    return {
        type: CHANGE_EDIT_PRODUCT,
        editarProducto
    }
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
};