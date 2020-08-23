import React, { useReducer, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Route } from 'react-router-dom';
import Header from './components/header/Header';
import SideNav from './components/side_navbar/SideNav';
import Body from './components/body/Body';

export const ItemContext = React.createContext()

const initialState = {
  item: {}
}

const reducer = (state, action) => {
  switch (action.type) {

    case 'data':
      return {
        item: action.payLoad
      }

    default:
      return state
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {

    if (Object.keys(state.item).length !== 0) {
      console.log(state.item)

    }

  }, [state])

  return (
    <ItemContext.Provider value={{ itemState: state, itemDispatch: dispatch }}>
      <Route>
        <Route path="/">
          {/* fixed header */}
          <Header />

          <div className="side_nav_body">
            {/* side nav */}
            <SideNav />

            {/* body */}
            <Body />
          </div>

        </Route>
      </Route>
    </ItemContext.Provider>
  );
}

export default App;
