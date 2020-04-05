import React, { Component } from 'react';


class Server extends Component {
    constructor(props) {
        super(props);
         this.state = {
        value: null,
    };
        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this)
    }

    handleClear(e){
        e.preventDefault()
        this.setState({value: null})
    }


    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
        });
        fetch('http://127.0.0.1:5001/', {
            mode: 'cors',
            headers: myHeaders,
        })
          .then((response) => {
              if (!response.ok){
                 throw new Error('Network response was not ok');
              }
              console.log("resonse ", response)
              return response.json()
          })
          .then((data) => {
            console.log(data);
            this.setState({value: data["message"]})
          })
        .catch(err => console.log('Error, with message:', err));

    }

    render() {
        const {value} = this.state
        return (
            <>
                <h1>Server</h1>
                <button  onClick={this.handleClick}>Go</button>
                <button onClick={this.handleClear}>Clear</button>
                <h2>{value}</h2>

            </>
        )

    }
}

export default Server