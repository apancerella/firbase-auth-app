import React, { createContext, useEffect, useState } from 'react';
import { auth, generateUserDocument } from '../firebase/firebase';

export const UserContext = createContext({ user: null });
const UserProvider = (props) => {
    const [user, setUser] = useState({});

    useEffect(async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            setUser(user);
        })
    }, []);

    return(
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
};
export default UserProvider;