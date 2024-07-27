import React from "react"
import {Routes,Route, Navigate} from "react-router-dom"
import { DashboardPage } from "./Pages/Dashboard/dashboard"
import { ConnectionDetails } from "./Pages/ConnectionDetails/connection-details"

export const AppRouter = () => {
    return (
        <>
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/details/:id" element={<ConnectionDetails />}/>
            <Route path="*" element={<Navigate to="dashboard"/>}/>
        </Routes>
        </>

    )
}