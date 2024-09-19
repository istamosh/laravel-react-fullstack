import {
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
    user: User;
    token: string | null;
    setUser: Dispatch<SetStateAction<User>>;
    setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
    user: { name: "" },
    token: null,
    setUser: () => {}, // initialize function
    setToken: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState({
        name: "Test User",
    });

    // this will save localStorage for keeping the user session
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
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
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
