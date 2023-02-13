import axios from "axios";
import { createContext, useEffect, useState } from "react";

// const [isLoggedin, setIsLoggedin] = useState(
//   !!sessionStorage.getItem("JWTtoken")
// );
// const [currentUser, setCurrentUser] = useState(null);

// useEffect(() => {
//   if (!isLoggedin) {
//     return;
//   }
//   const token = sessionStorage.getItem("JWTtoken");
//   const autoLogin = async () => {
//     const { data } = await axios.get("http://localhost:8080/user/autologin", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setCurrentUser(data.user);
//   };
//   autoLogin();
// }, [isLoggedin]);

// export const UserContext = createContext({
//   isLoggedin: isLoggedin,
//   setIsLoggedin: setIsLoggedin,
//   currentUser: currentUser,
//   setCurrentUser: setCurrentUser,
// });

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

  const getUserWithToken = async () => {
    const token = sessionStorage.getItem("JWTtoken");
    const { data } = await axios.get("http://localhost:8080/user/autologin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCurrentUser(data.user);
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
