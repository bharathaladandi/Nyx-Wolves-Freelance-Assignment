import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Homepage } from '../Components/Homepage';

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={ <Homepage /> }></Route>
        </Routes>
    </div>
  )
}
