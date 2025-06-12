import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './index.css'
import '/node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
