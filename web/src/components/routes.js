import React from 'react';
import ListOrders from './Order/ListOrders';
import OrderDetail from './Order/OrderDetail';
import Login from './Login/Login';

const routes = [
    {
        path : '/login',
        exact : true,
        public: true,
        main : ({ match }) => <Login match={match}/>
    },
    {
        path : '/',
        exact : true,
        public: false,
        main : ({ match }) => <ListOrders match={match}/>
    },
    {
        path : '/order/:id',
        exact : false,
        public: false,
        main : ({ match, location }) => <OrderDetail match={match} location={location} />
    }
];

export default routes;
