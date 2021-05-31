import React from 'react';
import Wedding from './pages/Wedding/Wedding';
import TableService from './pages/Wedding/Table-Service/Table-Service';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Home from './pages/Home';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/wedding',
        exact: true,
        main: () => <Wedding />
    },
    {
        path: '/wedding/table-service',
        exact: true,
        main: ({history}) => <TableService history={history}/>
    },
    // {
    //     path: '/product/:id/edit',
    //     exact: false,
    //     main: ({match, history}) => <ProductActionPage match={match} history={history}/>
    // },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;