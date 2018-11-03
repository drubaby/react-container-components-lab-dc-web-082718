import React, { Component } from "react";
import "isomorphic-fetch";
import MovieReviews from "./MovieReviews";

const NYT_API_KEY = "f98593a095b44546bf4073744b540da0";
const URL =
  "https://api.nytimes.com/svc/movies/v2/reviews/search.json?" +
  `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here
class SearchableMovieReviewsContainer extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      searchTerm: ""
    };
  }

  handleSearchInputChange = event =>
    this.setState({ searchTerm: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    console.log(`searched ${this.state.searchTerm}`);
    fetch(URL.concat(this.state.searchTerm))
      .then(r => r.json())
      .then(response => this.setState( { reviews: response.results }));
  }

  render() {
    return (
      <div className="searchable-movie-reviews">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleSearchInputChange} type="text" />
          <button type="submit">Search</button>
        </form>
        { this.state.reviews.length > 0 ? <h2>Movie Review By Search:</h2> : <h2> No search results yet </h2> }
        <MovieReviews reviews={this.state.reviews} />
      </div>
    );
  }
}
export default SearchableMovieReviewsContainer;
