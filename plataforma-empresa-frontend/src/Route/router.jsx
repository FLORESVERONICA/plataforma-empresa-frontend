import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import RRHH from '../pages/RRHH';
import WorkerDatails from '../pages/WorkDetails';

const AppRouter = () => {
    return (
    
        <Router>
            <Routes>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/rrhh/*' element={<RRHH/>}/>
                <Route path='/worker/:id' element={<WorkerDatails/>}/>
            </Routes>
        </Router>
       
    );
};

export default AppRouter;