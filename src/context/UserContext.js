import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext({
  isLoggedin: false,
  setIsLoggedin: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

function UserContextProvider(props) {
  const [isLoggedin, setIsLoggedin] = useState(
    !!sessionStorage.getItem("JWTtoken")
  );
  const [currentUser, setCurrentUser] = useState(null);
  const url = process.env.REACT_APP_API;

  const getUserWithToken = async () => {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const { data } = await axios.get(`${url}/user/autologin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedin) {
      return;
    }
    getUserWithToken();
  }, [isLoggedin]);

  return (
    <UserContext.Provider
      value={{
        isLoggedin: isLoggedin,
        setIsLoggedin: setIsLoggedin,
        currentUser: currentUser,
        setCurrentUser: getUserWithToken,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
