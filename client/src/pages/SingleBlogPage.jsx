import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BLOG, mockGetBlogs } from '../utils/graphqlQueries';
import BlogPost from '../components/BlogPost';

const SingleBlogPage = ({ blogId }) => {
  const { loading, error, data } = useQuery(GET_BLOG, {
    variables: { id: blogId }, // Pass the blog ID to the query
  });
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (data) {
      setBlog(data.getBlog);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {blog ? (
        <BlogPost
          title={blog.title}
          content={blog.content}
          playlistUrl={blog.playlistUrl}
        />
      ) : (
        <p>No blog found</p>
      )}
    </div>
  );
};

export default SingleBlogPage;