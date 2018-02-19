import React , {Component} from 'react';


class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleStockChange = this.handleStockChange.bind(this);
    }

    handleFilterTextChange(e){
        this.props.onFilterText(e.target.value);
    }

    handleStockChange(e){
        this.props.onInStockChange(e.target.checked);
    }

    render(){

        return (
            <form>
                <input type="text" placeholder="Search..." 
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input type="checkbox" value="on" 
                        checked={this.props.inStockOnly}
                        onChange={this.handleFilterTextChange}
                    /> Only show products in stock
                </p>
            </form>
        )
    }
}

export default SearchBar;