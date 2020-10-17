import React from 'react';

import DataProvider from "./dataProvider";
import Map from './Map'

const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <Map />
      </div>
    </DataProvider>
  );
}

export default App;
