import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Header, Container } from "semantic-ui-react";

export default () => {
  const { name} = useContext(AuthContext);
  return (
    <Container>
      <Header as="h1" textAlign="center">
        Welcome {name}
      </Header>
    </Container>
  );
};