import React from 'react';
import TableServiceTabBar from './TabBar'
import theme from '../../../components/MuiTheme';
import {  MuiThemeProvider } from '@material-ui/core';
function TableService(props) {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <TableServiceTabBar weddingId={props.match.params.weddingId} lobbyId={props.match.params.lobbyId} status={props.match.params.status} />
        </MuiThemeProvider>
    </div>
  );
}

export default (TableService);