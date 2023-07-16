import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

disableReactDevTools()

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);