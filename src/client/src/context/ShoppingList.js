import React, { createContext } from 'react'
import uuid from 'uuid'

const itemList = [
  { id: uuid(), name: 'Egg' },
  { id: uuid(), name: 'Carrot' },
  { id: uuid(), name: 'Eggplant' },
  { id: uuid(), name: 'Honey' },
  { id: uuid(), name: 'Mustard' },
]

const ShoppingListContext = createContext({})

export function ShoppingListProvider(props) {
  const [shoppingItems, setShoppingItems] = React.useState(itemList)

  const addShoppingItem = (newItem) => {
    console.log('adding new shopping item', newItem)
    const items = [...shoppingItems, newItem]
    setShoppingItems(items)
  }
  const removeShoppingItem = (uuid) => {
    console.log('removing shopping items', uuid)
    const newValue = shoppingItems.filter(x => x.id !== uuid)
    setShoppingItems(newValue)
  }

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingItems,
        addShoppingItem,
        removeShoppingItem
      }}
    >
      {props.children}
    </ShoppingListContext.Provider>
  )
}

export default ShoppingListContext
