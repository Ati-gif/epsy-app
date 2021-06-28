import React from 'react';
import axios from 'axios';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const colors = [
  '#8884d8',
  '#93FD93',
  '#2493FD',
  '#FF00DD',
  '#DD00FF',
  '#00FFD3',
  '#1279D0',
  '#D01279',
  '#939393'
]

class MerchCost extends React.Component {
  state = { merches: [] }

  componentDidMount() {
    axios.get('/api/merches/merch_cost')
      .then( res => this.setState({ merches: res.data }) )
  }

  calcAvg = (prices, price) => {
    let sum = prices.split(', ').reduce( (total, num) => {
      return parseFloat(num) + total;
    }, 0);


    return sum / price
  }

  data = () => {
    let { merches } = this.state;
    return merches.map( merch => {
      let key = merch.merch;
      let avg = this.calcAvg(merch.prices, merch.price);
      return {
        name: key,
        [key]: avg,
        amt: avg
      }
    });
  }

  render() {
    let { merches } = this.state;
    return (
      <BarChart 
        width={600} 
        height={300} 
        data={merches.length ? this.data() : []}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        barGap={0}
      >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      { merches.map( (merch, i) =>
          <Bar key={merch.merch} dataKey={merch.merch} fill={colors[i]}/>
        )
      }
      </BarChart>
    )
  }

}

export default MerchCost;
