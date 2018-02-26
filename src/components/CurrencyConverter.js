import React, {Component} from 'react';
import {Segment, Form, Button, Message} from 'semantic-ui-react';

class CurrencyConverter extends Component {
  constructor() {
    super();
    this.state = {
      currencyFrom: '',
      currencyTo: '',
      amountToConvert: 0,
      formErrors: {
        amountToConvert: ''
      },
      currFromValid: false,
      currToValid: false,
      amtToConvertValid: false,
      formValid: false
    }
  }

  handleCurrencyFrom = (event) => {
    debugger;
    this.setState({
      currencyFrom: event.target.innerHTML,
      currFromValid: true
    }, this.validateForm);
  };

  handleCurrencyTo = (event) => {
    debugger;
    this.setState({
      currencyTo: event.target.innerHTML,
      currToValid: true
    }, this.validateForm);
  };

  handleConversionAmt = (event) => {
    let errors = this.state.formErrors;
    let validAmount = true;
    const value = parseFloat(event.target.value);

    if (isNaN(value)) {
      errors.amountToConvert = 'Conversion amount must be a number.';
      validAmount = false;
    } else {
      errors.amountToConvert = '';
    }

    this.setState({
      amountToConvert: value,
      formErrors: errors,
      amtToConvertValid: validAmount
    }, this.validateForm);
  };

  calculateCurrencyAmt = (event) => {
    event.preventDefault();
    console.info(`Calling API with: ${this.state.currencyFrom}, ${this.state.currencyTo}, and ${this.state.amountToConvert}`)
  };

  displayFormErrors() {
    let errors = [];
    for (let error in this.state.formErrors) {
      const msg = this.state.formErrors[error];
      if (msg.length > 0) {
        errors.push(msg)
      }
    }
    return errors;
  }

  validateForm = () => {
    const { currFromValid, currToValid, amtToConvertValid } = this.state;
    this.setState({
      formValid: currFromValid && currToValid && amtToConvertValid
    });
    console.info(`from: ${currFromValid}, to: ${currToValid}, amt: ${amtToConvertValid}`)
  };

  render() {
    return (
      <Segment>
        <Form name="currencyConverter"
              onSubmit={this.calculateCurrencyAmt}>
          <Form.Group widths="equal">
            <Form.Select inline fluid label="From"
                         placeholder={this.props.selectedCurrency}
                         options={this.props.currencyTypes}
                         onChange={this.handleCurrencyFrom}/>

            <Form.Select inline fluid label="To"
                         options={this.props.currencyTypes}
                         onChange={this.handleCurrencyTo}/>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input fluid name="amount" label="Amount"
                        required
                        onChange={this.handleConversionAmt}/>
          </Form.Group>
          <Message error visible={this.displayFormErrors().length > 0}
                   list={this.displayFormErrors()}
                   header="Errors with your calculation"/>

          <Segment raised>
            {/*TODO: change this when API call is live*/}
            <p><strong>Result:</strong> {this.state.amountToConvert}</p>
          </Segment>
          <Form.Group widths="equal">
            <Button fluid disabled={!this.state.formValid}
                    type="submit">Calculate</Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default CurrencyConverter;