import React, { createContext } from 'react'
import uuid from 'uuid'
import axios from 'axios'

const itemList = [
  { _id: uuid(), name: 'Egg' },
  { _id: uuid(), name: 'Carrot' },
  { _id: uuid(), name: 'Eggplant' },
  { _id: uuid(), name: 'Honey' },
  { _id: uuid(), name: 'Mustard' },
]

const ShoppingListContext = createContext({})

export function ShoppingListProvider(props) {
  const [loading, setLoading] = React.useState(true)
  const [shoppingItems, setShoppingItems] = React.useState(itemList)

  const fetchShoppingItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/traversy-mern/v1')
      console.log(response.data)
      setShoppingItems([...shoppingItems, ...response.data])
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const addShoppingItem = async (newItem) => {
    try {
      setLoading(true)
      const response = await axios.post('/traversy-mern/v1', { name: newItem })
      const savedItem = { _id: response.data._id, name: response.data.name }
      const items = [...shoppingItems, savedItem]
      setShoppingItems(items)
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const removeShoppingItem = (uuid) => {
    console.log('removing shopping items', uuid)
    const newValue = shoppingItems.filter(x => x._id !== uuid)
    setShoppingItems(newValue)
  }

  return (
    <ShoppingListContext.Provider
      value={{
        loading,
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
