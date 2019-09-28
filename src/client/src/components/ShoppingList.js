import React from 'react'
import {
  Pane,
  Text,
  Button,
  TextInput,
} from 'evergreen-ui'
import uuid from 'uuid'

import ShoppingListContext from '../context/ShoppingList'

function ShoppingItemForm({ addShoppingItem }) {
  const [newItem, setNewItem] = React.useState({
    id: '',
    name: '',
  })

  const handleChange = (e) => {
    const val = e.target.value
    setNewItem({ ...newItem, name: val })
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    setNewItem({ ...newItem, id: uuid() })
    addShoppingItem(newItem)
  }

  return (
    <Pane marginTop={32}>
      <form onSubmit={handleSubmission}>
        <Pane>
          <TextInput
            placeholder="item name..."
            name="name"
            id="name"
            value={newItem.name}
            onChange={handleChange}
          />
        </Pane>

        <Button
          width="100%"
          justifyContent="center"
          type="submit"
          appearance="primary"
          intent="success"
          marginTop={16}
        >
          Add New
        </Button>
      </form>
    </Pane>
  )
}

function ShoppingListItem({ name, removeShoppingItem }) {
  return (
    <Pane
      background="tint1" width="80%" padding={8} margin={4}
      onClick={removeShoppingItem}
    >
      <Text fontWeight="bold">{name}</Text>
    </Pane>
  )
}

function ShoppingList() {
  const {
    isFetching,
    fetchShoppingItems,
    shoppingItems,
    addShoppingItem,
    removeShoppingItem
  } = React.useContext(ShoppingListContext)
  React.useEffect(() => {
    fetchShoppingItems()
  }, [fetchShoppingItems, shoppingItems])

  return (
    <React.Fragment>
      <h1>Shopping Items</h1>

      {shoppingItems && shoppingItems.map(item => {
        return (
          <ShoppingListItem
            key={item.id}
            name={item.name}
            removeShoppingItem={() => removeShoppingItem(item.id)}
          />
        )
      })}

      <ShoppingItemForm addShoppingItem={addShoppingItem} />

    </React.Fragment>
  )
}

export default ShoppingList
