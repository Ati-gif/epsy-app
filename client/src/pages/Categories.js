import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Card, Dropdown, Form, Select } from 'semantic-ui-react'

const Categories = () => {
  //Note: we are not using useEffect in this component because we don't want the items to render until 
  //a selection has been made

  //set categories for dropdown menu
  const [categories, setCategories] = useState([
    {key: 'All', text: 'All Merchandise', value: 'All'},
    {key: 'Accessories', text: 'Accessories', value: 'Accessories'},
    {key:'Apparel', text: 'Apparel', value: 'Apparel'},
    {key: 'Home', text: 'Home', value: 'Home'},
    {key:'Living', text: 'Living', value: 'Living'},
    {key:'Wedding', text: 'Wedding', value: 'Wedding'},
    {key:'Entertainment', text: 'Entertainment', value: 'Entertainment'},
    {key:'Collectibles', text: 'Collectibles', value: 'Collectibles'},
    {key: 'Crafts', text: 'Crafts', value: 'Crafts'},
    {key:'Toys', text: 'Toys', value: 'Toys'}
  ])

  const [merch, setMerch] = useState([])

  //variable, if user selects "all" for category it will render category under item desc/price
  const [showCategories, setShowCategories] = useState(true)

  const handleChange =  async (e, {value}) => {
    try{
      //if user selects a specific category, set showCategories to false and hide categories form cards rendered
      if(value != 'All'){
        let res =  await axios.get(`/api/categories/${value}`)
        setMerch(res.data)
        setShowCategories(false)
      }
      else{
        //user has selected "All", set showCategories to true and render categories in the cards
        let res = await axios.get('api/merchandises')
        setMerch(res.data)
        setShowCategories(true)
      }
      
    }catch(err){
      alert(err)
    }
  }

  const renderMerch = () => {
    return(
      <Card.Group style={{marginTop: '20px'}}>
        {merch.map( m => (
          <>
          <Card style={{padding: '10px'}}>
            <Card.Header>
              <h3>{m.description}</h3>
            </Card.Header>
            <Card.Meta>
              <p>{`Price: $${m.price}`}</p>
              {/* if showCategories = true (user has selected "All" categories, add category to the card) */}
              <p>{showCategories && `Category: ${m.category}`}</p>
              
            </Card.Meta>
          </Card>
          </>
        ))}
      </Card.Group>
    )
  }
  
  return (
    <div>
      <h1>Categories</h1>
      <Dropdown
        onChange={handleChange}
        placeholder='Select a Category'
        fluid
        selection
        options={categories}
      />
      {merch && renderMerch()}
      {!merch && <p>No Merchandise available</p>}
    </div>
  )
  
}

export default Categories