import { useEffect, useState } from "react";
import { useUserTokenContext } from "../contexts/UserTokenContext";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useUserTokenContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const res = await fetch(url, options);

        const body = await res.json();

        if (res.ok) {
          setData(body.data);
          setError("");
        } else {
          throw new Error(body.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, setData, loading, error };
};

export default useFetch;
