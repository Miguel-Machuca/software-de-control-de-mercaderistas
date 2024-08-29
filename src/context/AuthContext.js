import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from "../config/FirebaseConfig";



function getCurrentUser(){
    return auth.currentUser;
}

export{ getCurrentUser }

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('There in not auth provider')
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const signup = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password).then((userFirebase) => {
            return userFirebase;
        });
               
    }

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return <authContext.Provider value={{signup, login, user, logout}}>
        {children}
    </authContext.Provider>;
}