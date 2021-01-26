import { FORM_CHANGE, SEARCH_CHANGE, CATEGORIES_LOAD, PRODUCTS_LOAD, ORDERS_LOAD } from './constants';

const initialState = {
  arrayCheckBox: [],
  formulario: {categories: []}
};

var variable = (state = initialState, action) => {
  switch(action.type) {
    case FORM_CHANGE: {
      //state.formulario = action.form
      console.log("State form: ", state.formulario)
      return state = {...state, formulario: action.form}
    }
    case SEARCH_CHANGE: { // Done
        //state.search = action.search // state = {...state, search: action.search}
        return state = {...state, search: action.search}
    }
    case CATEGORIES_LOAD: {
      //state.categoria = action.categories
      console.log("State categoria: ", action.categories)
      return state = {...state, categoria: action.categories}
    }
    case PRODUCTS_LOAD: {
      return state = {...state, products: action.products}
    }
    case ORDERS_LOAD: {
      return state = {...state, orders: action.orders}
    }
    default: return state;
  }
};

export default variable
