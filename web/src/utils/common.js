
  export const getToken = () => {
    return localStorage.getItem('authorizationToken') || null;
  }
  
  export const removeToken = () => {
    localStorage.removeItem('authorizationToken');
  }
  
  export const setToken = (token) => {
    localStorage.setItem('authorizationToken', token);
  }