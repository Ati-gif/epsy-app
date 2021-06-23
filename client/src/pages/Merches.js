import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {List, Table} from 'semantic-ui-react'

const Merches = () => {

  // const [merchandises, setMerchandises] = useState([]) //not used, replaced w/ sellers array for data restructure
  
  const [sellers, setSellers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  
  //get seller/merchandise data via api
  const getMerches = async (page = 1) => {
    let res = await axios.get(`/api/merches?page=${page}`)
    setCurrentPage(page)
    console.log('total pages', res.data)
    setTotalPages(res.data.total_pages)
    createSellerArray(res.data.merches)
  }

  //restructure data from axios for seller merchandise tables in page
  const createSellerArray = (data) =>{
    console.log(data)
    let ids = [...new Set(data.map( d => d.seller_id ))];
    //set temp seller array to push to, then set non-temp seller array to match
    let sellerArray = []
    ids.map( id => {
      let merches = data.filter( d => d.seller_id === id );
      let { seller_id, name, email } = merches[0];

      let sellerMerches = merches.map( m => { 
        let { description, price, category, merch_id } = m;
        return { description, price, category, merch_id };
      });

      let detail = { seller_id, name, email, merchess: sellerMerches, };

      sellerArray.push(detail);
    });
    
    setSellers(sellerArray)
  }

  useEffect(()=>{
    getMerches()
  },[])

  //Called in renderSellers to insert each merchandise row
  const renderMerches = (merches) => {
    // console.log(merchandises)
    return merches.map( m => 
        <Table.Row key= {m.merch_id} >
          <Table.Cell>{m.description}</Table.Cell>
          <Table.Cell>{m.category}</Table.Cell>
          <Table.Cell>${m.price}</Table.Cell>
        </Table.Row>
    )
  }

  //map through sellers array, create table for each seller
  const renderSellers = () =>{
    // console.log('renderSellers called')
    // console.log(sellers)
      return (
        <List>
          { sellers.map( seller => {
              let { seller_id, name, email, merches } = seller;
              return (
                <List.Item key={seller_id}>
                  <List.Header><h2>{name} - {email}</h2></List.Header>
                  <List.Item>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Description</Table.HeaderCell>
                          <Table.HeaderCell>Category</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {renderMerches(merches)}
                      </Table.Body>
                    </Table>
                  </List.Item>
                </List.Item>
              )
            })
          }
        </List>
      )
    }
  
  const renderPageNav = () => {
    
    let numsJSX =[]
    for(let i = 1; i <= totalPages; i++){
      numsJSX.push(<span
        onClick={()=>getMerches(i)}
        style={
          {cursor:'pointer', marginRight: '3px', color: currentPage == i ? 'red':'black'}
        }>{i}</span>)
    }
    console.log('numsjsx', numsJSX.length)
    return numsJSX
    
  }

  
  
  return (
    <>
    <div>
      <h2>All Merchandise by Seller</h2>
      <p>Pages: {renderPageNav()}</p>
      {renderSellers()}
    </div>
    </>
  )
}

export default Merches
