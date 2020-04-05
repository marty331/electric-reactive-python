import React, { Component } from 'react';
// import { PythonShell } from 'python-shell';



class Calc extends Component {

    constructor(props) {
    super(props);
    this.state = {
        value: '5',
        result_val: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
        event.preventDefault()
      this.setState({value: event.target.value})

    }
  handleSubmit(event) {
    event.preventDefault();
    const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
        });
        fetch('http://127.0.0.1:5001/calc',{
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: JSON.stringify({'data': this.state.value}),
        })
          .then((response) => {
              // if (!response.ok){
              //    throw new Error('Network response was not ok');
              // }
              console.log("resonse ", response)
              return response.json()
          })
          .then((data) => {
            console.log(data);
            var amt = data["calculated_amount"]
              console.log("amt = ", amt)
            this.setState({result_val: amt})
          })
        .catch(err => console.log('Error, with message:', err));
  }
    render() {
        const { value, result_val } = this.state;
        return (
            <>
            <h1>Hello Calculator!</h1>
            <p>Enter an integer to double</p>
            <form onSubmit={this.handleSubmit}>
                <input id="formula" value={value} onChange={this.handleChange}></input>
                <input type="submit" value="Submit" />
            </form>
            <h4 id="result" >Result: {result_val}</h4>
            </>
        );
    }
}

export default Calc;