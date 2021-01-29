import { FORM_CHANGE, SEARCH_CHANGE, SEARCH_CLICK, CATEGORIES_LOAD, PRODUCTS_LOAD, ORDERS_LOAD, ADD_CARRITO, CHANGE_USER_STATUS } from './constants';
const initialState = {
  arrayCheckBox: [],
  formulario: { categories: [] },
  user: {/*  name: "benja", userId: 1  */},
  carrito: [],
  logged: null
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
    case CHANGE_USER_STATUS: {
      if (action.logged === "admin") {
        return (state = { ...state,
          logged: "admin",
          user: {
            userId: 1,
            nombre: "Gonzalo",
            apellido: "Rodriguez",
            nombreDeUsuario: "admin",
            email: "rodriguezgonzalo97@gmail.com",
            clave: "test"
          }
        });
      } else if (action.logged) {
        return (state = { ...state,
          logged: true,
          user: {
            userId: 2,
            nombre: "Gonzalo",
            apellido: "Rodriguez",
            nombreDeUsuario: "usuario",
            email: "rodriguezgonzalo97@gmail.comm",
            clave: "test"
          }
        });
      }
      
      return (state = { ...state,
        logged: false,
        user: {}
      });
    }
    default:
      return state;
  }
};

export default variable;
