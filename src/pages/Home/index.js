import React, { Fragment, useState, useEffect } from "react";
import { Container, Form, Col } from "react-bootstrap";
import CardInfo from "../../components/CardInfo";

export default function Home() {
  const [amount, setAmount] = useState(100);
  const [fee, setFee] = useState(0.5);
  const [period, setPeriod] = useState(1);
  const [incomes, setIncomes] = useState([]);

  /** funções de manipulação do estado */
  const handleChangeAmount = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  };

  const handleChangeFee = (e) => {
    const newFee = e.target.value;
    setFee(newFee);
  };

  const handleChangePeriod = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);
  };

  const calculateIncome = () => {
    let newIncomes = [];
    for(let i=1; i<= period; i++) {
      let currentAmount = amount * Math.pow((1 + (fee/100)), i);
      let roi = currentAmount - amount;
      let net = (roi / amount) * 100;
      
      newIncomes.push({
        month: i,
        amount: formatNumber(currentAmount),
        roi: formatNumber(roi),
        net: net.toFixed(2)
      });
    }

    setIncomes(newIncomes);
  }

  /** controlando efeitos colaterais */
  useEffect(() => {
    calculateIncome();
  }, [amount, fee, period]);

  /** funções helpers */
  const formatNumber = (numb) => {
    return numb.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <Fragment>
      <Container fluid className="bg-gunmetal">
        <h1 className="text-center p-4 text-white">Calculadora de Juros Compostos</h1>
        <Form className="mt-3 p-2">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="text-white font-weight-bold">
                Montante ($)
              </Form.Label>
              <Form.Control
                type="number"
                value={amount}
                min="100"
                step="100"
                onChange={handleChangeAmount}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-white font-weight-bold">
                Tx Mensal (%)
              </Form.Label>
              <Form.Control
                type="number"
                value={fee}
                min="-12"
                max="12"
                step="0.1"
                onChange={handleChangeFee}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-white font-weight-bold">
                Meses
              </Form.Label>
              <Form.Control
                type="number"
                value={period}
                min="1"
                step="1"
                onChange={handleChangePeriod}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
      <CardInfo incomes={incomes} />
    </Fragment>
  );
}
