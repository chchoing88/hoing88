import React , {Component} from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleStockChange = this.handleStockChange.bind(this);
    }

    handleFilterTextChange(filterText){
        this.setState({
            "filterText": filterText
        })
    }

    handleStockChange(inStockOnly){
        this.setState({
            "inStockOnly": inStockOnly
        })
    }


    render(){
        return (
            <div>
                <SearchBar 
                    filterText = {this.state.filterText} 
                    inStockOnly = {this.state.inStockOnly}
                    onFilterText = {this.handleFilterTextChange}
                    onInStockChange = {this.handleStockChange}
                />
                <ProductTable 
                    products={this.props.products} 
                    filterText={this.state.filterText} 
                    inStockOnly={this.state.inStockOnly}
                    onFilterText = {this.handleFilterTextChange}
                    onInStockChange = {this.handleStockChange}
                    />
            </div>
        )
    }
}

export default FilterableProductTable;