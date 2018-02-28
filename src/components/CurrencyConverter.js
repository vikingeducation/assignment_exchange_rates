import React, {Component} from 'react';
import {Segment, Form, Button, Message} from 'semantic-ui-react';

const fx = window.fx;

class CurrencyConverter extends Component {
  constructor() {
    super();
    this.state = {
      currencyFrom: '',
      currencyTo: '',
      amountToConvert: 0,
      conversionResult: '',
      formErrors: {
        amountToConvert: '',
        currencyFrom: '',
        currencyTo: ''
      },
      currFromValid: false,
      currToValid: false,
      amtToConvertValid: false,
      formValid: false
    }
  }

  handleCurrencyFrom = (event) => {
    let errors = this.state.formErrors;
    const text = event.target.innerText;
    if (text.length === 3) {
      errors.currencyFrom = '';

      this.setState({
        currencyFrom: text,
        currFromValid: true
      }, this.validateForm);
    } else {
      errors.currencyFrom = 'Please reselect a currency to convert from.';
      this.validateForm();
    }
  };

  handleCurrencyTo = (event) => {
    let errors = this.state.formErrors;
    const text = event.target.innerText;
    if (text.length === 3) {
      errors.currencyTo = '';

      this.setState({
        currencyTo: text,
        currToValid: true
      }, this.validateForm);
    } else {
      errors.currencyFrom = 'Please reselect a currency to convert to.';
      this.validateForm();
    }
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
    const { currencyFrom } = this.state;

    fetch(`https://api.fixer.io/latest?base=${currencyFrom}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(json => {
        fx.base = currencyFrom;
        fx.rates = json.rates;
      })
      .then(this.converter)
      .catch(error => {
        console.error(error);
      });
  };

  converter = () => {
    const { currencyFrom, currencyTo, amountToConvert } = this.state;
    let rate = fx(amountToConvert).from(currencyFrom).to(currencyTo);
    this.setState({conversionResult: rate.toFixed(4)})
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
  };

  render() {
    return (
      <Segment>
        <Form name="currencyConverter"
              onSubmit={this.calculateCurrencyAmt}>
          <Form.Group widths="equal">
            <Form.Select inline fluid label="From"
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
            <p><strong>Result:</strong> {this.state.conversionResult}</p>
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