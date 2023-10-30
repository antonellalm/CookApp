import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import store from "../src/redux/store";
//store={store}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// El provider es un componente que  sirve para la integracion de react y redux
// Cuando envuelves tu componente raíz con el Provider y le pasas la store como una prop, todos los componentes dentro de la aplicación pueden acceder a la store y sus datos utilizando el hook useSelector y despachar acciones utilizando el hook useDispatch.
