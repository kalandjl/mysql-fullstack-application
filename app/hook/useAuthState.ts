import { getJwtToken } from "../lib/jwt";

const useAuthState = (bool: boolean) => {


  const jwt = getJwtToken()
  return [jwt ?? false]
};

export default useAuthState;