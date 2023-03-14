import { createContext, Dispatch, ReactNode, SetStateAction, useState, useEffect } from "react";
import { CognitoUser} from 'amazon-cognito-identity-js';
import { useContext } from "react";
import { Auth, Hub } from "aws-amplify";
import { HubCallback } from "@aws-amplify/core";

type UserType = CognitoUser | null | undefined

type AuthContextType ={
    user: UserType,
    setUser: Dispatch<SetStateAction<UserType>>,
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined, 
    setUser: () => {},
})



const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<UserType>(undefined)
    
    useEffect(() => {
        const checkUser = async () => {
            try {
                const authUser = await Auth.currentAuthenticatedUser({bypassCache: true})
                setUser(authUser)
            } catch (e) {
                setUser(null)
            }
        }
        checkUser()
    }, [])

    useEffect(() => {
       const listener: HubCallback = (data) => {
        const {event} = data.payload;
        if(event === 'signOut'){
            setUser(null)
        }
       }
       const hubListener = Hub.listen('auth', listener);
    // When you return a function frm a useEffect, it will be called when the component unmounts
        return () => hubListener();
}, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext)