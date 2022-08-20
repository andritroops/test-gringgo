import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from './components/Header';

import IndexProvinces from './pages/MasterData/Provincies/Index';
import AddProvince from './pages/MasterData/Provincies/Add';
import EditProvince from './pages/MasterData/Provincies/Edit';
import ViewProvince from './pages/MasterData/Provincies/View';

function PageNotFound() {
    return (
        <div className='container py-3 d-flex justify-content-center'>
            <h2>404 Page not found</h2>
        </div>
    );
}


export default function App() {

    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/provinces" />} />
                    <Route path='/provinces' exact element={<IndexProvinces />} />
                    <Route path='/provinces/add' element={<AddProvince />} />
                    <Route path='/provinces/edit/:id' element={<EditProvince />} />
                    <Route path='/provinces/view/:id' element={<ViewProvince />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </div>
    );
}



