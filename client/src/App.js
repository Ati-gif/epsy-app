import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Demo/Home";
import NoMatch from "./components/NoMatch";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { Container } from "semantic-ui-react";
import FetchBuyer from "./components/FetchBuyer";
import ProtectedRoute from "./components/ProtectedRoute";
import Available from "./components/Available";
import FindMerch from "./components/FindMerch";
import MerchCost from "./components/MerchCost";
import Categories from "./components/Categories";

function App() {
  return (
    <>
      <NavBar />
      <FetchBuyer>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/available" component={Available} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path ='/merch_cost' component={MerchCost} />
            <Route exact path ='/find_merch' component={FindMerch} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </FetchBuyer>
    </>
  );
}

export default App;

