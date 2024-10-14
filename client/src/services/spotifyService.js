// src/services/spotifyService.js

export const fetchSpotifyPlaylist = async (playlistId) => {
    const token = 'placeholder_spotify_token';  // Replace with actual token later
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Spotify API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error fetching Spotify playlist:', err);
      throw err;
    }
};