import { useState, useEffect } from "react";
import { List, Table } from "semantic-ui-react";
import { FixedSizeList as ListA } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import axios from "axios";

const App = () => {
  // const [data, setData] = useState([]);
  const [merches, setMerches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const isItemLoaded = (index) =>
    index < merches.length && merches[index] !== null;
  

  const normalizeData = (data) => {
    
    let sellers = data.reduce(
      (accum, m) => {
        let merch = {
          price: m.price,
          description: m.description,
          category: m.category
       };

        if (m.seller_id in accum) {
          accum[m.seller_id].sellerMerches.push(merch);
        } else {
          accum[m.seller_id] = {
            name: `${m.name}`,
            email: m.email,
            sellerMerches: [merch],
          };
        }
        return accum;
      },
      {} 
    );
    console.log(sellers);
    
    return Object.values(sellers);
  };

  useEffect(() => {
    getMerches();
  }, []);
  const getMerches = async () => {
    try {
      
      let res = await axios.get(`/api/merches?page=${page}`);
      setPage(page + 1);
      console.log(res);
      let normalized = normalizeData(res.data.data);
      setTotalPages(res.data.total_pages);
      console.log(normalized);
      setMerches(normalized);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("error occured");
      setLoading(false);
    }
  };

  if (loading) return <p>loading</p>;

  return (
    <>
      <h1>size: {merches.length}</h1>{" "}
      {/* <AutoSizer>
        {({ height, width }) => ( */}
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={merches.length}
        loadMoreItems={getMerches}
      >
        {({ onItemsRendered, ref }) => (
          
          <ListA
            height={200}
            width={200}
            divided
            verticalAlign="middle"
            onItemsRendered={onItemsRendered}
            ref={ref}
            itemData={merches}
            itemSize={500}
            style={
              {
               
              }
            }
          >
            {<h1>yo</h1>}
          </ListA>
          // ))}
        )}
      </InfiniteLoader>
      {/* )}
      </AutoSizer> */}
    </>
  );
};

const styles = {
  scroller: {
    height: "80vh",
    overflow: "auto",
  },
};

export default App;
