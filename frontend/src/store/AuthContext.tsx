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

// const getRemainingTime = (expiresAt: number):number => {

// 	const now = new Date().getTime();
// 	return new Date(expiresAt).getTime() - now;

// };

export const AuthContextProvider = (props: AuthContextProviderProps) => {

	const oldToken = JSON.parse(localStorage.getItem("token") as string);	
	const [token, setToken] = React.useState<string | null>(oldToken ? oldToken.token : null);

	const login = (id:string, token: string | null/*, expiresAt:number*/) => {
		setToken(token);
		localStorage.setItem("token", JSON.stringify({token}));
		//const remainingTime = getRemainingTime(expiresAt);
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem("token");
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
