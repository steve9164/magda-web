import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <div className='search'>
        {this.props.children}
      </div>
    );
  }
}
export default Search;
