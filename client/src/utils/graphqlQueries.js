// src/utils/graphqlQueries.js

// Mock function to simulate fetching blogs
export const mockGetBlogs = () => {
    return [
      {
        id: '1',
        title: 'Sample Blog 1',
        content: 'This is some sample content for blog 1.',
        playlistUrl: 'placeholder_playlist_id_1',
      },
      {
        id: '2',
        title: 'Sample Blog 2',
        content: 'This is some sample content for blog 2.',
        playlistUrl: 'placeholder_playlist_id_2',
      }
    ];
  };// src/utils/graphqlQueries.js
  import { gql } from '@apollo/client';
  
  // Ensure that the GET_BLOG query is defined and exported
  export const GET_BLOG = gql`
    query GetBlog($id: ID!) {
      getBlog(id: $id) {
        id
        title
        content
        playlistUrl
      }
    }
  `;