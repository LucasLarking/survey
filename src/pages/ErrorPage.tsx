
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "./Navbar";

const ErrorPage = () => {
  const error = useRouteError();
    return (
      <>
      <Navbar/>
      <h1>Oops</h1>
      <h3>{isRouteErrorResponse(error) ? 'This page does not exist' : 'An unexpected error occured'}</h3>
      
      </>
    );
};

export default ErrorPage;