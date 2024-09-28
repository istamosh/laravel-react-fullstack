import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import axiosClient from "../axios-client";

interface User {
    id: number | null;
    name: string;
    is_admin: boolean;
}

interface StateContextType {
    user: User;
    token: string | null;
    notification: string | null;
    setUser: Dispatch<SetStateAction<User>>;
    setToken: (token: string | null) => void;
    setNotification: (message: string) => void;
    refreshUser: () => void; // for admin
}

const StateContext = createContext<StateContextType>({
    user: {
        id: null,
        name: "",
        is_admin: false,
    },
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    refreshUser: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<User>({
        id: null,
        name: "",
        is_admin: false,
    });
    const [notification, _setNotification] = useState<string | null>("");

    // this will save localStorage for keeping the user session
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem("ACCESS_TOKEN")
    );

    useEffect(() => {
        if (token) {
            refreshUser();
        }
    }, [token]);

    const setToken = (token: string | null) => {
        _setToken(token);
        token
            ? localStorage.setItem("ACCESS_TOKEN", token)
            : localStorage.removeItem("ACCESS_TOKEN");
    };

    // this will show notification message for 5 seconds
    const setNotification = (message: string) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    const refreshUser = () => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
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
                refreshUser,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
