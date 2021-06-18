import React from 'react';
import Wedding from './pages/Wedding/Wedding';
import TableService from './pages/Wedding/Table-Service/Table-Service';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Bill from './pages/Bill/Bill';
import DetailBill from './pages/Bill/DetailBill';
import Access from './pages/Access/Access';
import Service from './pages/Service/Service';
import Policy from './pages/Policy/Policy';
import Food from './pages/Food/Food';
import Lobby from './pages/Lobby/Lobby';
import Calendar from './pages/Home/Calendar';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Calendar />
    },
    {
        path: '/service',
        exact: true,
        main: () => <Service />
    },
    {
        path: '/policy',
        exact: true,
        main: () => <Policy />
    },
    {
        path: '/food',
        exact: true,
        main: () => <Food />
    },
    {
        path: '/lobby',
        exact: true,
        main: () => <Lobby />
    },
    {
        path: '/wedding',
        exact: true,
        main: () => <Wedding />
    },
    {
        path: '/bill',
        exact: true,
        main: () => <Bill />
    },
    {
        path: '/access',
        exact: true,
        main: () => <Access />
    },
    {
        path: '/bill/:weddingId',
        exact: false,
        main: ({match, history}) => <DetailBill match={match} history={history}/>
    },
    {
        path: '/wedding/:weddingId/:lobbyId',
        exact: true,
        main: ({match, history}) => <TableService  match={match} history={history}/>
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;