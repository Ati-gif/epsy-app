import { useContext, useState } from "react";
import { Header, Form, Button, Segment } from "semantic-ui-react";
import { AuthContext } from "../providers/AuthProvider";

export default (props) => {
  //init register values
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [name, setName] = useState("");
  const { handleRegister, loading, authError } = useContext(AuthContext);

  //handle submit form
  const handleSubmit = () => {
    if (password === confirmPassword) {
      handleRegister({ email, password, name }, props.history);
    } else {
      alert("passwords dont match");
    }
  };

  const checkAuthError = () =>{
    if(authError){
     return  authError.map((err)=>(
        <p style={{color: 'red'}}>{err}</p>
      ))
    }
  }

  return (
    <>
      <Header as="h1">Register</Header>
      {checkAuthError()}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Input
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Input
          label="Confirm Password"
          name="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Segment basic textAlign="center">
          <Button primary loading={loading} disabled={loading} type="submit">
            register
          </Button>
        </Segment>
      </Form>
    </>
  );
};
