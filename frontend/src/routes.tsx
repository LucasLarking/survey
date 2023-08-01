import { createBrowserRouter } from "react-router-dom";
import TakeSurvey from "./TakeSurvey/TakeSurvey";
import ConfirmationPage from "./pages/ConfirmationPage";
import Dashboard from "./dashboard/Dashboard";

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import SignUpPage from "./pages/SignUpPage";

import LogInPage from "./pages/LogInPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import EditSurveyPage from "./pages/EditSyrveyPage";
import ResponsePage from "./response/ResponsePage";
import NewHome from "./newhome/NewHome";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },


            { path: 'signup', element: <SignUpPage /> },
            { path: 'login', element: <LogInPage /> },



        ]
    },
    {
        element: <PrivateRoutes />,
        children: [
            { path: 'create/:slug', element: <EditSurveyPage /> },
            { path: 'take/:slug', element: <TakeSurvey /> },
            { path: 'dashboard/:slug', element: <Dashboard /> },
            { path: 'response/:id/:slug', element: <ResponsePage /> },
            { path: 'confirmation', element: <ConfirmationPage /> },
            { path: 'newhome', element: <NewHome /> },

        ]
    }
]);

export default router;