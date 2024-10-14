import React, { useEffect, useState } from 'react';
import { fetchSpotifyPlaylist } from '../services/spotifyService';

const BlogPost = ({ title, content, playlistUrl }) => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const data = await fetchSpotifyPlaylist(playlistUrl);
        setPlaylist(data);
      } catch (error) {
        console.error('Error loading playlist:', error);
        // Set some dummy data if the playlist can't load yet
        setPlaylist({
          id: 'placeholder',
          name: 'Sample Playlist',
          tracks: {
            items: [
              { track: { name: 'Sample Track 1', artists: [{ name: 'Sample Artist' }] } },
              { track: { name: 'Sample Track 2', artists: [{ name: 'Sample Artist 2' }] } },
            ]
          }
        });
      }
    };
    loadPlaylist();
  }, [playlistUrl]);

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      {playlist ? (
        <div>
          <h3>Playlist: {playlist.name}</h3>
          <ul>
            {playlist.tracks.items.map((item, index) => (
              <li key={index}>{item.track.name} by {item.track.artists.map(artist => artist.name).join(', ')}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading playlist...</p>
      )}
    </div>
  );
};

export default BlogPost;