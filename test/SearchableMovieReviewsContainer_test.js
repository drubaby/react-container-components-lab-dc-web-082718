import React from 'react';
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchableMovieReviewsContainer from '../src/components/SearchableMovieReviewsContainer';
import testReviews from './test-reviews';

import { spy, stub, useFakeTimers } from 'sinon'

Enzyme.configure({ adapter: new Adapter() })

const Noop = (props) => { return <p>Noop</p> };

describe('<SearchableMovieReviewsContainer />', () => {
  let wrapper;
  let fetchSpy;

  beforeEach(() => {
    global.fetch = require('node-fetch')

    fetchSpy = spy(global, "fetch")

    wrapper = !SearchableMovieReviewsContainer.prototype ?
      shallow(<Noop />) : shallow(<SearchableMovieReviewsContainer />);
  });

  it('should have state', () => {
    const tryToGetState = () => { wrapper.state(); }
    expect(SearchableMovieReviewsContainer.prototype, 'Component is not yet defined.').to.exist;
    expect(tryToGetState).to.not.throw('Component should be class component.');
  });

  it('should have the state properties "reviews" and "searchTerm"', () => {
    expect(SearchableMovieReviewsContainer.prototype, 'Component is not yet defined.').to.exist;
    expect(wrapper.state()).to.have.all.keys('searchTerm', 'reviews');
  });

  it('should have top-level element with class "searchable-movie-reviews"', () => {
    expect(wrapper.hasClass('searchable-movie-reviews'), 'Missing top-level element with class "searchable-movie-reviews"').to.be.true;
  });

  it('should fetch data from the New York Times API on form submission', () => {
    let form = wrapper.find('form').first()
    form.simulate('submit', { preventDefault: () => {} })
    expect(fetchSpy.callCount > 0, "Fetch was not called").to.equal(true);
    expect(fetchSpy.firstCall.lastArg, "Fetch should have the base URL 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'").to.include('https://api.nytimes.com/svc/movies/v2/reviews/search.json?')
  })

  // it('should render reviews after reviews state updated', () => {
  //   wrapper = !SearchableMovieReviewsContainer.prototype ?
  //     mount(<Noop />) : mount(<SearchableMovieReviewsContainer />);
  //   wrapper.setState({ reviews: testReviews });
  //   wrapper.update();
  //   expect(wrapper.find('.review').length).to.equal(testReviews.length);
  // });
});
