import React, { Component } from 'react';
import arraySort from 'array-sort'
import unique from 'array-unique'

import Employees from '../Employees.json'
import moment from 'moment'

import { Bar } from 'react-chartjs-2'

export default class PercentByDepartment extends Component {

  state = {
    data: {}
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
    const departmentsNames = unique(employeesSorted.map(el => el.department))
    
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
        salary: salaries[salaries.length-1].salary,
        department: salaries[salaries.length-1].department
      }

      return employee
    })

    const departmentsCosts = departmentsNames.map(department => {
      const arrEmpDept = employees.filter(employee => 
        (employee.department === department)
      )

      let sum = 0;
      arrEmpDept.forEach(employee => {
        sum += parseInt(employee.salary)
      })
      
      const result = {
        name: department,
        cost: sum
      }

      return result
    })

    let companySumFinancial = 0;
    departmentsCosts.forEach(department => companySumFinancial += parseInt(department.cost))
  
    const labels = departmentsCosts.map(department => department.name)
    const datasets = [{
        label: `Percentual financeiro por Setor`,
        data: departmentsCosts.map(department => department.cost/companySumFinancial),
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
      <Bar data={this.state.data} />
    )
  }
}
