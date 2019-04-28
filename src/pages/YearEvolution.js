import React, { Component } from 'react';
import arraySort from 'array-sort'
import unique from 'array-unique'
import moment from 'moment'

import Employees from '../Employees.json'
import EmployeeList from  '../components/EmployeeList'


export default class YearEvolution extends Component {

  state = {
    employees: []
  }

  componentWillMount (){
    const employeesAux = Employees.RECORDS.map(el => {
      return {
        fullname: el.fullname,
        gender: el.gender,
        department: el.department,
        dt_dept_start: moment(el.dt_dept_start,'DD/MM/YYYY').toDate(),
        dt_dept_end: moment(el.dt_dept_end,'DD/MM/YYYY').toDate(),
        salary: el.salary,
        dt_salary_start: moment(el.dt_salary_start,'DD/MM/YYYY').toDate(),
        dt_salary_end: moment(el.dt_salary_end,'DD/MM/YYYY').toDate(),
        salaryYear: moment(el.dt_salary_start,'DD/MM/YYYY').toDate().getFullYear()
      }
    })

    const employeesSorted = arraySort(employeesAux, ['fullname','salaryYear'])
    const employeesNames = unique(employeesSorted.map(el => el.fullname))
    
    const employees = employeesNames.map(fullname => {

      const arrAux = employeesSorted.filter(el => 
        fullname === el.fullname)
      
      const salaries = unique(arrAux.map(el => {
        return {
          salary: el.salary, 
          date: el.salaryYear,
          department: el.department
        }
      }))

      const employee = {
        fullname: fullname,
        salaries: salaries
      }

      return employee
    })

    this.setState({
        employees
    })
  }

  render() {
    return (
      <EmployeeList employees={this.state.employees} />
    )
  }
}
