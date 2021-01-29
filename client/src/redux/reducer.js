import { FORM_CHANGE, SEARCH_CHANGE, SEARCH_CLICK, CATEGORIES_LOAD, PRODUCTS_LOAD, ORDERS_LOAD, ADD_CARRITO } from './constants';
const initialState = {
  arrayCheckBox: [],
  formulario: { categories: [] },
  user: { name: "benja", userId: 1 },
  carrito: [],
};

var variable = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARRITO: {
      //state.formulario = action.form
      return (state = { ...state, carrito: action.carrito });
    }
    case FORM_CHANGE: {
      //state.formulario = action.form
      return (state = { ...state, formulario: action.form });
    }
    case SEARCH_CHANGE: { // Done (Texto escrito en el search)
        //state.search = action.search // state = {...state, search: action.search}
        return state = {...state, search: action.search}
    }
    case SEARCH_CLICK: { // Done (Clickeó en buscar, entonces filtraremos por searchFilter)
        //state.search = action.search // state = {...state, search: action.search}
        return state = {...state, searchFilter: action.search}
    }
    case CATEGORIES_LOAD: {
      //state.categoria = action.categories
      return (state = { ...state, categoria: action.categories });
    }
    case PRODUCTS_LOAD: {
      return state = {...state, products: action.products}

    }
    case ORDERS_LOAD: {
      return (state = { ...state, orders: action.orders });
    }
    default:
      return state;
  }
};

export default variable;
