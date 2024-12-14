import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logOut: () => {},
  userData:"",
  storeUserData:()=>{}
});


function AuthContextProvider({children}){
    const [authToken,setAuthToken]= useState()
    const [userData,setUserData]= useState("")

    function storeUserData(userEmail){
        setUserData(userEmail)
    }
    function authenticate(token){
        setAuthToken(token)
    }

    function logOut(){
        setAuthToken(null)
        setUserData(null)
    }

    const value =
    {
        token:authToken,
        isAuthenticated:!!authToken,
        authenticate:authenticate,
        logOut:logOut,
        userData:userData,
        storeUserData:storeUserData
    }
    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthContextProvider