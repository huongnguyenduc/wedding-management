import React from 'react';
import TableServiceTabBar from './TabBar'
import theme from '../../../components/MuiTheme';
import {  MuiThemeProvider } from '@material-ui/core';
function TableService() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <TableServiceTabBar />
        </MuiThemeProvider>
    </div>
  );
}

export default (TableService);