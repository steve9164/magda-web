import SearchResults from './SearchResults/SearchResults';
import SearchFilters from './SearchFilters/SearchFilters';
import SearchBox from './SearchBox';
import React, { Component } from 'react';
let getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};


class SearchBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
    this.updateSearchText=this.updateSearchText.bind(this);
  }

  componentWillMount(){
    this.doSearch();
  }

  doSearch(){
    getJSON('http://default-environment.mrinzybhbv.us-west-2.elasticbeanstalk.com/search/' + this.props.params.keyword).then((data)=>{
      console.log(data);
    this.setState({
      searchResults: data.dataSets,
    });
    }, (err)=>{console.warn(err)});
  }

  updateSearchText() {
    console.log(this.props.location);
    this.doSearch();
  }

  render() {
    return (
      <div>
        <div className='search-header jumbotron'>
          <SearchBox searchValue={this.props.params.keyword}
                     search={this.updateSearchText}
                     updateSearchText={this.updateSearchText}
                     />
        </div>

        <div className='search-body row'>
          <div className='col-sm-4'>
              <SearchFilters />
          </div>
          <div className='col-sm-8'>
              <SearchResults
                searchResults={this.state.searchResults}
                />
          </div>
        </div>
      </div>
    );
  }
}





export default SearchBody;
