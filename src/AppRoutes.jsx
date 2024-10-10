import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from './features/blog/pages/Blog';
import RateBlog from './features/blog/pages/RateBlog';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Blog />} />
            <Route path='/rate' element={<RateBlog />} />
        </Routes>
    );
};

export default AppRoutes;