import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SellerMerches from './SellerMerches';

const Available = () => {
    const [sellers, setSellers] = useState([])
    useEffect(()=>{
        getSellersMerches()
    },{})

    const normalizeData = (sellerMerches) => {
             const uniqSellerIDS =[...new Set(sellerMerches.map(p=> p.seller_id))]

        console.log(uniqSellerIDS)
        const sellersData = []
       
        uniqSellerIDS.forEach( id => {
            
            let merches = sellerMerches.filter( ap => ap.seller_id === id)
            console.log(merches)
              
            let {seller_id, name, email} = merches[0]
           
            const cleanedMerches = merches.map(p => {
                return{description:p.description,
                       category:p.category,
                       price:p.price
                    }
            })

            sellersData.push({
                seller_id, Name: `${name}`, 
                email, 
                merches: cleanedMerches
            }
            )
        })
        console.log(sellersData)
        setSellers(sellersData)
    }

    const getSellersMerches = async()=> {
        try {
            let res = await axios.get('/api/merches')
            normalizeData(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1>Available</h1>
            {sellers.map(a => (
                <SellerMerches {...a} />
            ))
            }

        </>
    )
}

export default Available
