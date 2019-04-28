import React, { Component } from 'react';
import { Container} from 'react-bootstrap'

import Employee from './Employee'

export default class EmployeeList extends Component {
  
    state = {
        employees: [],
    }

    render() {

        const employees = this.props.employees.map((employee, index) => 
            <Employee key={index} data={employee}></Employee>)

        return (
            <Container>
                {employees}
            </Container>
        )
  }
}
