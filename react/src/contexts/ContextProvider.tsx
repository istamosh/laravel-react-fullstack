import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

interface User {
    name: string;
}

interface StateContextType {
    user: Partial<User>;
    token: string | null;
    notification: string | null;
    setUser: Dispatch<SetStateAction<Partial<User>>>;
    setToken: (token: string | null) => void;
    setNotification: (message: string) => void;
}

const StateContext = createContext<StateContextType>({
    user: {},
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<Partial<User>>({});
    const [notification, _setNotification] = useState<string | null>("");

    // this will show notification message for 5 seconds
    const setNotification = (message: string) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    // this will save localStorage for keeping the user session
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem("ACCESS_TOKEN")
    );
    // const [token, _setToken] = useState<string | null>("123");
    // const [token, _setToken] = useState<string | null>(null);

    const setToken = (token: string | null) => {
        _setToken(token);
        token
            ? localStorage.setItem("ACCESS_TOKEN", token)
            : localStorage.removeItem("ACCESS_TOKEN");
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
