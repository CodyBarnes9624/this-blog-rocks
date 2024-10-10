// components/CreatePlaylist.jsx
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// Define the GraphQL mutation for adding a playlist
const ADD_PLAYLIST = gql`
  mutation AddPlaylist($title: String!, $description: String!, $multimedia: [String], $user: ID!) {
    addPlaylist(title: $title, description: $description, multimedia: $multimedia, user: $user) {
      id
      title
      description
      multimedia
    }
  }
`;

// CreatePlaylist component takes userId as a prop to associate the playlist with a user
const CreatePlaylist = ({ userId }) => {
  // State variables to hold form inputs
  const [title, setTitle] = useState(''); // State for playlist title
  const [description, setDescription] = useState(''); // State for playlist description
  const [multimedia, setMultimedia] = useState([]); // State for multimedia URLs
  const [addPlaylist] = useMutation(ADD_PLAYLIST); // Hook to run the ADD_PLAYLIST mutation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await addPlaylist({ variables: { title, description, multimedia, user: userId } });
    // Reset form or redirect could be implemented here after successful playlist creation
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for playlist title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state on change
        placeholder="Playlist Title"
        required // Make this field required
      />
      {/* Textarea for playlist description */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state on change
        placeholder="Description"
        required // Make this field required
      />
      {/* Input field for multimedia URLs; allow multiple inputs separated by commas */}
      <input
        type="text"
        value={multimedia}
        onChange={(e) => setMultimedia(e.target.value.split(','))} // Split input string by commas
        placeholder="Multimedia URLs (comma separated)"
      />
      {/* Submit button to create the playlist */}
      <button type="submit">Create Playlist</button>
    </form>
  );
};

export default CreatePlaylist; // Export the CreatePlaylist component

