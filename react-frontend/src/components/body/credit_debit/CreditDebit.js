import React, { Component } from 'react'
import './CreditDebit.css'
import CreditDebitInput from './credit_debit_input/CreditDebitInput'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

class CreditDebit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openingCreditInputs: [],
            closingCreditInputs: [],
            closingDebitInputs: [],
            openingCreditTotal: 0,
            closingCreditTotal: 0,
            closingDebitTotal: 0,
            todaySell: 0,
            totalCredit: 0,
            todayCalculatedCredit: 0,
            datepicker: new Date(),
        }
        this.yesterdayCreditSetTotal = this.yesterdayCreditSetTotal.bind(this)
        this.todayCreditSetTotal = this.todayCreditSetTotal.bind(this)
        this.todayDeditSetTotal = this.todayDeditSetTotal.bind(this)
        this.handleCalculate = this.handleCalculate.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        // this.handleSelect = this.handleSelect.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.setOpeningCreditInputs = this.setOpeningCreditInputs.bind(this)
        this.setClosingCreditInputs = this.setClosingCreditInputs.bind(this)
        this.setClosingDebitInputs = this.setClosingDebitInputs.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    yesterdayCreditSetTotal(openingCreditTotal) {
        this.setState({
            openingCreditTotal: Number(openingCreditTotal)
        })
    }

    todayCreditSetTotal(closingCreditTotal) {
        this.setState({
            closingCreditTotal: Number(closingCreditTotal)
        })
    }

    todayDeditSetTotal(closingDebitTotal) {
        this.setState({
            closingDebitTotal: Number(closingDebitTotal)
        })
    }

    setOpeningCreditInputs(openingCreditInputs) {
        this.setState({
            openingCreditInputs: openingCreditInputs
        })
    }

    setClosingCreditInputs(closingCreditInputs) {
        this.setState({
            closingCreditInputs: closingCreditInputs
        })
    }
    setClosingDebitInputs(closingDebitInputs) {
        this.setState({
            closingDebitInputs: closingDebitInputs
        })
    }

    handleCalculate() {

        let todaySell = (this.state.closingCreditTotal + this.state.closingDebitTotal) - this.state.openingCreditTotal
        let totalCredit = todaySell + this.state.openingCreditTotal
        let todayCalculatedCredit = totalCredit - this.state.closingDebitTotal
        this.setState({
            todaySell: todaySell,
            totalCredit: totalCredit,
            todayCalculatedCredit: todayCalculatedCredit
        })
    }

    handleDateChange(date) {
        this.setState({
            datepicker: date,
        });

    }

    // handleSelect (date) {
    //     this.setState({
    //         startDate: date
    //     });
    // }

    handleSave() {
        let emptyInputFlag = (this.state.openingCreditInputs.length && this.state.closingCreditInputs.length &&
            this.state.closingDebitInputs.length) ? ((this.state.openingCreditInputs.map((input) => input.type.length &&
                input.amount.length ? true : false) && this.state.closingCreditInputs.map((input) => input.type.length &&
                    input.amount.length ? true : false) && this.state.closingDebitInputs.map((input) => input.type.length &&
                        input.amount.length ? true : false)) ? true : false) : false

        if (emptyInputFlag && this.state.totalCredit !== 0
            && this.state.todayCalculatedCredit !== 0) {
            if (window.confirm('Are tou sure')) {
                axios.post('http://localhost:8000/api/credit_debit',
                    {
                        date: this.state.datepicker,
                        openingCreditInputs: this.state.openingCreditInputs,
                        closingCreditInputs: this.state.closingCreditInputs,
                        closingDebitInputs: this.state.closingDebitInputs,
                        openingCreditTotal: this.state.openingCreditTotal,
                        closingCreditTotal: this.state.closingCreditTotal,
                        closingDebitTotal: this.state.closingDebitTotal,
                        todaySell: this.state.todaySell,
                        totalCredit: this.state.totalCredit,
                        todayCalculatedCredit: this.state.todayCalculatedCredit,

                    }
                ).then(response => {
                    console.log(response.data)
                    if (response.data.message == 'inserted') {
                        alert('Saved successfully')
                    }
                    else {
                        alert('Failed To Saved !')
                    }
                }).catch(error => {
                    alert('axios ' + error)
                });
            }
        }
        else {
            alert('Please give proper inputs')
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form className='credit__debit' onSubmit={this.handleSubmit}>
                <div className="date">
                    <h5>Credit Debit</h5>
                    <div className="date__input">
                        <DatePicker
                            className='datepicker'
                            dateFormat="dd/MM/yyyy"
                            selected={this.state.datepicker}
                            onChange={this.handleDateChange}
                        />
                    </div>
                </div>
                <div className="row credit__debit__inputs__container">
                    <div className="col-sm-4 col__border">
                        <CreditDebitInput heading='Opening Credit' parameter='C'
                            getTotal={this.yesterdayCreditSetTotal} getInputs={this.setOpeningCreditInputs} />
                    </div>
                    <div className="col-sm-4 col__border">
                        <CreditDebitInput heading='Closing Credit' parameter='A'
                            getTotal={this.todayCreditSetTotal} getInputs={this.setClosingCreditInputs} />
                    </div>
                    <div className="col-sm-4">
                        <CreditDebitInput heading='Closing Dedit' parameter='B'
                            getTotal={this.todayDeditSetTotal} getInputs={this.setClosingDebitInputs} />
                    </div>
                </div>
                <div className="row credit__debit__calculations__container">
                    <div className="operations">
                        <button className='calculate' onClick={this.handleCalculate}>Calculate</button>
                        <button className='calculate' onClick={this.handleSave}>Save</button>
                        <button className='calculate'>Print</button>
                    </div>
                    <div className="calculations">
                        <h5>Today's Sell (D = (A+B)-C) = {this.state.todaySell}</h5>
                        <h5>Total Credit (E = D+C) = {this.state.totalCredit}</h5>
                        <h5>Today Calculated Credit (F=(E-B)) = {this.state.todayCalculatedCredit}</h5>
                        <div className="resulticon">
                            {this.state.todayCalculatedCredit !== 0 ?
                                this.state.closingCreditTotal === this.state.todayCalculatedCredit ?
                                    <h5><CheckCircleOutlineIcon /> A({this.state.closingCreditTotal}) = F
                                        ({this.state.todayCalculatedCredit})</h5> :
                                    <h5><HighlightOffIcon />{this.state.closingCreditTotal >
                                        this.state.todayCalculatedCredit ?
                                        <h5>A({this.state.closingCreditTotal}) - F({this.state.todayCalculatedCredit}) =
                                        {this.state.closingCreditTotal - this.state.todayCalculatedCredit}</h5> :
                                        <h5>A({this.state.todayCalculatedCredit}) - F({this.state.closingCreditTotal}) =
                                        {this.state.todayCalculatedCredit - this.state.closingCreditTotal}</h5>}
                                    </h5>
                                : ''}
                        </div>
                    </div>
                    <div className="record">
                        <h5>Old Records</h5>
                        {/* <DatePicker
                            selected={this.state.startDate}
                            onSelect={this.handleSelect}
                            onChange={this.handleChange}
                        /> */}
                    </div>
                </div>
            </form>
        )
    }
}

export default CreditDebit
