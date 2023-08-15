import { useEffect, useState } from "react";
import { getJwtToken } from "../lib/jwt";

const useAuthState = () => {

  const [state, setState] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      
      const jwt = getJwtToken()

      setState(jwt != undefined)
    }, 5000)
  
    return () => clearInterval(intervalId); //This is important
   
  }, [useState])

  return [state]
};

export default useAuthState;