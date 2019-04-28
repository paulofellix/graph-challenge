import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'

export default class Employee extends Component {

    state = {
        data: {}
    }

    componentWillMount (){
        const labels = this.props.data.salaries.map(salary => salary.date)
        const datasets = [{
            label: 'Evolução Salarial',
            data: this.props.data.salaries.map(salary => salary.salary),
            borderWidth: 1
        }]

        const data = {
            labels,
            datasets: datasets
        }

        this.setState({data})
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col style={{display: 'flex', flexDirection: 'col', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{fontSize: 30}}>{this.props.data.fullname}</span>
                    </Col>
                    <Col>
                        <Line data={this.state.data} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
