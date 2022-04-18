import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import {fetchSpotifyApi} from '../../../common/ApiUtils'

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async componentDidMount() {
    // Start all requests in parallel and update state as they complete
    await Promise.all([
      // Docs: https://developer.spotify.com/console/get-new-releases/
      fetchSpotifyApi('/browse/new-releases').then(({albums}) =>
        this.setState({newReleases: albums.items})
      ),
      // Docs: https://developer.spotify.com/console/get-featured-playlists/
      fetchSpotifyApi('/browse/featured-playlists').then(({playlists}) =>
        this.setState({playlists: playlists.items})
      ),
      // Docs: https://developer.spotify.com/console/get-browse-categories/
      fetchSpotifyApi('/browse/categories').then(({categories}) =>
        this.setState({categories: categories.items})
      )
    ])
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
