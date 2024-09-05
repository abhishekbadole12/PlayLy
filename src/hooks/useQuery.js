import { useLocation } from "react-router-dom";

export default useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
