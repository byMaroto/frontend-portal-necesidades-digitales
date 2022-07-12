import useFetch from "./useFetch";
import { getProfileEndpoint } from "../api";

const useUser = () => {
  const {
    data: user,
    setData: setUser,
    loading,
    error,
  } = useFetch(getProfileEndpoint());

  return { user, setUser, loading, error };
};

export default useUser;
