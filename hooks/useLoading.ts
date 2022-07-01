import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => {
    setLoading(prevState => !prevState);
  };
  return {
    data: {
      loading
    },
    events: {
      toggleLoading
    }
  };
};

export default useLoading;
