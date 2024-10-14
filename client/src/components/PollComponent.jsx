import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { VOTE_ON_BLOG } from '../utils/graphqlQueries';

const PollComponent = ({ blogId }) => {
  const [vote, setVote] = useState(false);
  const [voteOnBlog] = useMutation(VOTE_ON_BLOG);

  const handleVote = async () => {
    try {
      await voteOnBlog({ variables: { blogId } });
      setVote(true);
    } catch (error) {
      console.error('Error voting on blog', error);
    }
  };

  return (
    <div>
      {vote ? (
        <p>Thanks for voting!</p>
      ) : (
        <button onClick={handleVote}>Vote for this Soundtrack</button>
      )}
    </div>
  );
};

export default PollComponent;