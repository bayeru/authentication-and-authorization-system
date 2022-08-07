import React from "react";

type AuthContextProviderProps = {
	children?: React.ReactNode;
};

type AuthContextProps = {

	token: string | null;
	login: (id: string, token: string) => void;
	logout: () => void;

};


export const AuthContext = React.createContext<AuthContextProps>({
	token: null,
	login: (id: string, token: string) => {},
	logout: () => {},
});

export const AuthContextProvider = (props: AuthContextProviderProps) => {
	const [token, setToken] = React.useState<string | null>(null);

	const login = (id:string, token: string | null) => {
		setToken(token);
	};

	const logout = () => {
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ token: token, login: login, logout: logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
