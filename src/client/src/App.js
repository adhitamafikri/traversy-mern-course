import React from 'react';
import './App.css';

import { ShoppingListProvider } from './context/ShoppingList'
import ShoppingList from './components/ShoppingList'

function App() {
  return (
    <ShoppingListProvider>
      <div className="App">
        <header className="App-header">
          <ShoppingList />
        </header>
      </div>
    </ShoppingListProvider>
  );
}

export default App;
