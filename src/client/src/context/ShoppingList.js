import React, { createContext } from 'react'
import axios from 'axios'

const ShoppingListContext = createContext({})

export function ShoppingListProvider(props) {
  const [loading, setLoading] = React.useState(true)
  const [shoppingItems, setShoppingItems] = React.useState([])

  const fetchShoppingItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get('.netlify/functions/traversy-mern/v1/items')
      setShoppingItems([...shoppingItems, ...response.data])
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const addShoppingItem = async (newItem) => {
    try {
      setLoading(true)
      const response = await axios.post('/traversy-mern/v1/items', { name: newItem })
      const savedItem = { _id: response.data._id, name: response.data.name }
      const items = [...shoppingItems, savedItem]
      setShoppingItems(items)
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const removeShoppingItem = async (_id) => {
    console.log('removing shopping items from function', _id)
    try {
      setLoading(true)
      const response = await axios.delete(`/traversy-mern/v1/items/${_id}`)
      if (response.status === 200) {
        const newValue = shoppingItems.filter(x => x._id !== _id)
        setShoppingItems(newValue)
      }
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <ShoppingListContext.Provider
      value={{
        loading,
        shoppingItems,
        fetchShoppingItems,
        addShoppingItem,
        removeShoppingItem,
      }}
    >
      {props.children}
    </ShoppingListContext.Provider>
  )
}

export default ShoppingListContext
