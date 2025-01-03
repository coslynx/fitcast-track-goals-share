import { useState, useEffect, useRef } from 'react';
import { api, handleApiError } from '../services/api';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastUsedUrl = useRef(null);

  useEffect(() => {
    if (!url || typeof url !== 'string') {
      console.error('URL must be a non-empty string');
      return;
    }


      if (data !== null && url === lastUsedUrl.current) {
          setLoading(false);
          return;
      }

      lastUsedUrl.current = url;

    const fetchData = async () => {
        setLoading(true);
        setError(null);
      try {
        const response = await api.get(url);
          if (response && response.data) {
            setData(response.data);
          } else {
            setData(null);
        }
      } catch (err) {
           const apiError = handleApiError(err);
           setError(apiError);
      } finally {
        setLoading(false);
      }
    };

      fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;