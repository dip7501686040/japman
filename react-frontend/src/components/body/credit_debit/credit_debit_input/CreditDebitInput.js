import React, { Component } from 'react'
import './CreditDebitInput.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';

class CreditDebitInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputValues: [],
            total: 0
        };
        this.appendInput = this.appendInput.bind(this);
        this.getTotal = this.getTotal.bind(this);

    }

    appendInput() {
        this.setState(
            prevState => ({ inputValues: [...prevState.inputValues, { type: '', amount: '' }] })
        )
    }

    handleAmountChange(i, e) {
        let inputValues = [...this.state.inputValues];
        inputValues[i].amount = e.target.value;
        this.setState({ inputValues });
        this.props.getInputs(inputValues)
    }

    handleTypeChange(i, e) {
        let inputValues = [...this.state.inputValues];
        inputValues[i].type = e.target.value;
        this.setState({ inputValues });
        this.props.getInputs(inputValues)
    }

    remooveInput(i) {
        if (window.confirm('are you sure')) {
            let inputValues = [...this.state.inputValues];
            let total = this.state.total - inputValues[i].amount
            inputValues.splice(i, 1);
            this.setState({
                inputValues: inputValues,
                total: total
            });
            this.props.getInputs(inputValues)
            this.props.getTotal(total)
        }
    }
    getTotal() {
        let total = this.state.inputValues.map(value => value.amount).reduce((prev, next) => Number(prev) + Number(next));
        this.setState({
            total: total
        })
        this.props.getTotal(total)
    }

    render(props) {
        return (
            <div className="credit__debit__input">
                <div className="heading">
                    <h6>{this.props.heading}</h6>
                    <span onClick={this.appendInput}><AddCircleIcon className='heading__icon' /></span>
                    <span><EditIcon className='heading__icon' /></span>
                </div>
                <hr />
                <div className="input__container">
                    <ul>
                        {
                            this.state.inputValues.map((el, i) =>
                                (<li key={i}>
                                    <input type="text" value={el.type || ''} placeholder="Type"
                                        onChange={this.handleTypeChange.bind(this, i)} required
                                    />=
                                    <input type="number" value={el.amount || ''} placeholder="Amount"
                                        onChange={(e) => {
                                            this.handleAmountChange(i, e)
                                            this.getTotal(i)
                                        }} required
                                    />
                                    <RemoveIcon className='removeicon' onClick={(e) => {
                                        this.remooveInput(i, e)
                                    }}
                                    />
                                </li>
                                ))
                        }
                    </ul>
                </div>
                <div className="total">
                    <h6>({this.props.parameter}) Total : {this.state.total} Rs
                    </h6>
                </div>
            </div>
        )
    }
}

export default CreditDebitInput
