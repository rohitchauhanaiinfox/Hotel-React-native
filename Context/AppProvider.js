import React, {useReducer} from 'react';
import {AppReducer} from './AppReducer';
import {appInitialState} from './actionType';
import AppContext from '../Context/AppContext';

function AppProvider(props) {
  const [Context, dispatch] = useReducer(AppReducer, appInitialState);

  return (
    <AppContext.Provider value={{Context, dispatch}}>
      {props.children}
    </AppContext.Provider>
  );
}
export default AppProvider;
