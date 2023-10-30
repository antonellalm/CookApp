import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Aquí se crea una variable llamada composeEnhancer. Esta variable almacena la función compose que se utilizará para combinar los enhancers de Redux. En este caso, se intenta utilizar la extensión Redux DevTools si está disponible. Si no, se utiliza la función compose predeterminada de Redux.

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

// En resumen, applyMiddleware se utiliza para aplicar middleware a las acciones, legacy_createStore as createStore es un alias para la función de creación de tiendas en versiones anteriores de Redux, y compose se utiliza para combinar enhancers de Redux en una sola función enhancer.

//En resumen, la línea de código que proporcionaste está creando una tienda de Redux, configurando un reducer para manejar los cambios de estado, aplicando el middleware thunk para permitir acciones asíncronas y, opcionalmente, utilizando composeEnhancer para mejorar la funcionalidad de la tienda.

//composeEnhancer: Esta función es una utilidad utilizada para mejorar las capacidades de la tienda. A menudo se utiliza para aplicar mejoras o middleware adicionales a Redux. El composeEnhancer es opcional y suele ser utilizado para configurar herramientas de desarrollo, como Redux DevTools.

// applyMiddleware: Es una función de Redux que permite aplicar middleware a la tienda. El middleware en Redux es una capa de software que se coloca entre las acciones que se envían y los reducers. Permite realizar tareas adicionales, como realizar solicitudes asíncronas, antes de que las acciones lleguen a los reducers. En este caso, se está utilizando el middleware thunk.

// thunk: Es un middleware muy comúnmente utilizado en aplicaciones de Redux. Permite la creación de acciones asíncronas al retrasar la ejecución de una acción hasta que se cumpla cierta condición o se complete una operación asíncrona. Esto es útil para manejar lógicas asíncronas, como las solicitudes HTTP.
