import decode from 'jwt-decode';

const checkTokenExpirationMiddleware = store => next => action => {
    const token =
      JSON.parse(localStorage.getItem("profile")) &&
      JSON.parse(localStorage.getItem("profile"))["token"];
    if (token && decode(token).exp < Date.now() / 1000) {
      
      localStorage.removeItem("profile");
      next(action);
    }
    next(action);
  };

export default checkTokenExpirationMiddleware;