require('file-loader?name=[name].[ext]!./index.html');
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
// import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>);