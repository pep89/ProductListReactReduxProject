import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const store = createStore(
    reducer,
    compose( applyMiddleware(thunk),
    //Lineas que nos permitiran utilizar redux_devtools_extension en nuestro navegador para poder controlar y hacer seguimiento del state de nuestra App.
        /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */

    //El codigo anterior nos activa devtools pero no nos permitirá arrancar la App en un navegador que no tenga instalada esta extención. Para corregir eso realizamos esta ternaria.
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' 
            ?
            window.__REDUX_DEVTOOLS_EXTENSION__() 
            : 
            f => f
    )
);

export default store;