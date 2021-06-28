import React from "react";
import { Card, Table, Segment } from "semantic-ui-react";

const SellerMerches = ({ Name, email, merches }) => (
  <Segment>
    <Card>
      <Card.Content>
        <Card.Header>{Name}</Card.Header>
        <Card.Meta>{email}</Card.Meta>
      </Card.Content>
    </Card>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {merches.map((p) => (
          <Table.Row>
            <Table.Cell>${p.price}</Table.Cell>
            <Table.Cell>{p.description}</Table.Cell>
            <Table.Cell>{p.category}</Table.Cell>
            
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Segment>
);

export default SellerMerches;