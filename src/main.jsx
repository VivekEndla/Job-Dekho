import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './index.css'
import '/node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
