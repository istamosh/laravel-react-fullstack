import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

interface StateContextType {
    user: object;
    token: string | null;
    setUser: Dispatch<SetStateAction<object>>;
    setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
    user: {},
    token: null,
    setUser: () => {}, // initialize function
    setToken: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState({});
    // const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    // temporary token for testing
    const [token, _setToken] = useState<string | null>("123");

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
