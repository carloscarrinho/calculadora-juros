import React from "react";
import { Container, Card } from "react-bootstrap";
import "./style.css";

export default function CardInfo({ incomes }) {
  return (
    <Container className="d-flex flex-wrap">
      {incomes.map((income) => {
        const { month, amount, roi, net } = income;
        return (
          <Card
            className={
              net < 0
                ? "col-md-4 p-0 text-center col-lg-2 card-info text-white bg-danger"
                : "col-md-4 p-0 text-center col-lg-2 card-info text-white bg-success"
            }
            key={month}
          >
            <Card.Header className="text-center font-weight-bold">{month}º Mês</Card.Header>
            <Card.Body className="px-0">
              <Card.Title>{amount}</Card.Title>
              <Card.Text>{roi}</Card.Text>
              <Card.Text>{`${net}%`}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
}
