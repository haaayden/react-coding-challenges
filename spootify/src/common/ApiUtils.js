import config from '../config'

const fetchSpotifyApi = (path) => {
  return fetch(
    config.api.baseUrl + path,
    { headers: { Authorization: 'Bearer ' + config.api.clientSecret } }
  ).then(res => res.json())
}

export {
  fetchSpotifyApi,
};
