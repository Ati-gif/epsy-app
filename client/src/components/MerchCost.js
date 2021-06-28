import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";


// This is what my data is going to look like coming back from API
const apiDummyData = [
    {merch: 'Toys', prices: "123234,23412,2134123"},
    {merch: 'Accessories', prices: "223234,23412,134123"},
]

// This is how recharts needs it
const dummyData =   [
    { name: "Toys", price: 500000 },
    { name: "Accessories", price: 250000 },
  ]


  const MerchCost = () =>{
      const [prices, setPrices] = useState(null)
      useEffect(()=>{
          getPrices()
        },[])
        
        const normalizeChartData = (apiData) => {
            return apiData.map( merchData => {
                let pricesArray = merchData.prices.split(',')
                let sum = pricesArray.reduce((acumm, thing) => acumm += parseInt(thing), 0)
                let average = sum/pricesArray.length
          
                return {name: merchData.merch, price: average.toFixed(2)}
            })
        } 
        
        const getPrices = async () => {
        try{
            // TODO: hookup to actual API
            let res = await axios.get('/api/merches/merch_cost')
            // since api is not hook we will not get here instead goes
            // to catch block
            const formattedData =  normalizeChartData(res.data)
            setPrices(formattedData)
        } catch(err){
            console.log(err)
            console.log(err.response)
        }
    }
    const renderChart =()=> {
        if(!prices){
            return <p>loading</p>
        } else {
            return (
                <BarChart width={600} height={300} data={prices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#82ca9d" />
              </BarChart>

            )
        }
    }
    return (
        <>
          <h1>Merchandise Price Page</h1>
           {renderChart()}
        </>
    )
}

export default MerchCost
