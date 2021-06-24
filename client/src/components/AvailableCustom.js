import { List, Table } from "semantic-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";
export default () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getSellers();
  }, []);

  const getSellers = async () => {
    try {
      
      let res = await axios.get(`/api/merches?page=${page}`);
      console.log(res);
      let normalized = normalizeData(res.data.data);
      setTotalPages(res.data.total_pages);
      console.log(normalized);
      setSellers(normalized);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("error occured");
      setLoading(false);
    }
  };
  const normalizeData = (data) => {
    // [].reduce((accum,d)=>{}, {})
    let sellers = data.reduce(
      (accum, m) => {
        let merch = {
          price: m.price,
          description: m.description,
          category: m.category
        };
        if (m.seller_id in accum) {
          accum[m.seller_id].sellerMerch.push(merch);
        } else {
          accum[m.seller_id] = {
            name: `${m.name} `,
            email: m.email,
            sellerMerches: [merch],
          };
        }
        return accum;
      },
      {} // starting value of accum
    );
    console.log(sellers);
    // just need the value
    return Object.values(sellers);
  };
  const pageClicked = (i) =>{
    setPage(i);
    getSellers();
  }
  const renderPagePicker = () => {
    let jsx = [];
    for (let i = 1; i < totalPages; i++) {
      jsx.push(<span onClick={()=> pageClicked(i)} style={{ paddingRight: "5px" }}>{i}</span>);
    }
    return jsx;
  };
  return (
    <>
      <div style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', cursor: 'pointer'}}>{renderPagePicker()}</div>
      <List>
        {sellers.map((seller) => {
          let { seller_id, name, email, sellerMerches } = seller;
          return (
            <List.Item>
                        <List.Content>
                <List.Header as="a">{name}</List.Header>
              </List.Content>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Seller</Table.HeaderCell>
                    <Table.HeaderCell>Seller's Email</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {sellerMerches.map((m) => (
                    <Table.Row key={m.description}>
                      <Table.Cell>${m.category}</Table.Cell>
                      <Table.Cell>{m.price}</Table.Cell>
                      <Table.Cell>{m.seller_id}</Table.Cell>
                      <Table.Cell>{m.email}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </List.Item>
          );
        })}
      </List>
    </>
  );
};
