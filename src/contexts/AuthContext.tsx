import { createContext, Dispatch, ReactNode, SetStateAction, useState, useEffect } from "react";
import { CognitoUser} from 'amazon-cognito-identity-js';
import { useContext } from "react";
import { Auth, Hub } from "aws-amplify";
import { HubCallback } from "@aws-amplify/core";

type UserType = CognitoUser | null | undefined

type AuthContextType ={
    user: UserType,
    userId: string,
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    userId: "",
})



const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<UserType>(undefined)

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true})
            setUser(authUser)
        } catch (e) {
            setUser(null)
        }
    }

    useEffect(() => {
        checkUser()
    }, [])

    useEffect(() => {
       const listener: HubCallback = (data) => {
        const {event} = data.payload;
        if(event === 'signOut'){
            setUser(null)
        }
        if(event === 'signIn'){
            checkUser();
        }
       }
       const hubListener = Hub.listen('auth', listener);
    // When you return a function frm a useEffect, it will be called when the component unmounts
        return () => hubListener();
    }, [])
    return (
        <AuthContext.Provider value={{user, userId: user?.attributes?.sub}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext)