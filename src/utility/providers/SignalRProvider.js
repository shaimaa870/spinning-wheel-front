import React from 'react'
import { useSelector } from 'react-redux';
import { useSignalR } from '../hooks/useSignalR';


export const SignalProvider = React.createContext();

function SignalRProvider({ children, ...props }) {

    const { startHub, onReceiveNotify ,closeHub} = useSignalR();
    const {
        user
    } = useSelector(state => state.auth)
    React.useEffect(() => {
        if (user) {
            const token = localStorage.getItem("jwtToken");
            startHub(token);
            onReceiveNotify();
            return;
        }
        closeHub();
    }, [user])


    return (
        <SignalProvider.Provider
            value={{ ...props, startHub: startHub, onReceiveNotify: onReceiveNotify }}
        >
            {children}
        </SignalProvider.Provider>
    )
}

export default SignalRProvider
