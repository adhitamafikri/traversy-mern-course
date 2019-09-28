import React, { createContext } from 'react'
import uuid from 'uuid'
import axios from 'axios'

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
  const [isFetching, setIsFetching] = React.useState(false)

  const fetchShoppingItems = async () => {
    console.log('fetching shopping items')
    try {
      const response = await axios.get('/traversy-mern/v1')
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

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
        isFetching,
        shoppingItems,
        fetchShoppingItems,
        addShoppingItem,
        removeShoppingItem
      }}
    >
      {props.children}
    </ShoppingListContext.Provider>
  )
}

export default ShoppingListContext
