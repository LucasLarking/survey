import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import CreateSurvey from "./survey/createSurvey/CreateSurvey";
import Experiment from "./pages/Experiment";
import TakeSurvey from "./TakeSurvey/TakeSurvey";
import ConfirmationPage from "./pages/ConfirmationPage";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";

import LogInPage from "./pages/LogInPage";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, 
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <HomePage />},
            {path: 'create/:slug', element: <Experiment />},
            {path: 'take/:slug', element: <TakeSurvey />},
            {path: 'dashboard/:slug', element: <Dashboard />},
            {path: 'confirmation', element: <ConfirmationPage />},
            {path: 'signup', element: <SignUpPage />},
            {path: 'login', element: <LogInPage />},



        ]
    },
]);

export default router;