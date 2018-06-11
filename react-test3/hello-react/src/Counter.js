import React, { Component } from 'react';

const Problematic = () => {
    throw new Error('버그가 나타났다 !');
    return (
        <div>

        </div>
    )
}

class Counter extends Component {
    state = {
        number: 0,
        error: false
    }

    constructor(props) {
        super(props);
        console.log('countructor');
    }

    componentWillMount() {
        console.log('compoenentWillMount (deprecated)');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldCompoenentUpdate');
        if( nextState.number % 5 === 0 ) return false;
        return true;
    }

    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    handleIncrease = () => {
        this.setState({
            number: this.state.number + 1
        })
    }

    handleDecrease = () => {
        this.setState({
            number: this.state.number - 1
        })
    }

    componentDidCatch(error, info) {
        this.setState({
            error:true
        })
    }

    render(){
        if(this.state.error) return (<h1>에러발생</h1>);
        return (
            <div>
                <h1>카운터</h1>
                <div>값: {this.state.number}</div>
                {this.state.number === 4 && <Problematic /> }
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        )
    }
}

export default Counter;