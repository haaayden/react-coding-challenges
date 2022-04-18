export default {
  api: {
    baseUrl: 'https://api.spotify.com/v1',
    authUrl: 'https://accounts.spotify.com/api/token',
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    // Put secret in `spootify\.env` file using Get Token from doc page e.g.:
    // https://developer.spotify.com/console/get-new-releases/
    clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
  }
}
