import React, { Component } from 'react';
import './LocationSearchBox.css';

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.renderCondition = this.renderCondition.bind(this);
    this.toggleFilter= this.toggleFilter.bind(this);
  }

  handleChange(e){
    this.props.handleChange(e);
  }

  clearSearch(){
    this.props.clearSearch();
  }

  renderCondition(option){
    let result = option.suggestion;
    if(!result){
      return null;
    }
    return (
          <button type='button'
                  className='btn location-search-btn'
                  onClick={this.toggleFilter.bind(this, option, true)}
                  title={option.name}>
            <span>{result.geographyLabel} , {result.stateLabel}</span>
            <span>{result.typeLabel} {result.type}</span>
          </button>);
  }

  toggleFilter(option){
    this.props.clearSearch();
    let optionWithId = {
      id: option.suggestion.code
    }
    this.props.toggleFilter(optionWithId, this.props.allowMultiple);
  }

  render(){
    return (
      <div>
        <form>
            <i className="fa fa-search search-icon" aria-hidden="true"></i>
            <input className='form-control'
                   type="text"
                   value={this.props.searchText}
                   onChange={this.handleChange}
                   />
            {this.props.searchText.length > 0 &&
              <button type='button' className='btn btn-clear-search' onClick={this.clearSearch}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>}
          </form>
          <div className='filtered-options'>
            {this.props.searchText.length > 0 && this.props.options.map((option, i)=>
                <div key={i}>{this.renderCondition(option, true)}</div>
            )}
          </div>
        </div>);
  }
}

LocationSearchBox.propTypes = {options: React.PropTypes.array,
                               toggleFilter: React.PropTypes.func,
                               searchText:React.PropTypes.string,
                               clearSearch: React.PropTypes.func,
                               handleChange: React.PropTypes.func,
                               allowMultiple: React.PropTypes.bool};
LocationSearchBox.defaultProps = {options: [], allowMultiple: false};

export default LocationSearchBox;
