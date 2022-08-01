import React from "react";

type ButtonProps = {

	fullWidth?: boolean;
	onClick?: () => void;
	children?: React.ReactNode	

};

const Button = (props:ButtonProps) => {

	const fank:string = "fank";
	const test = `${fank}`;

	return (
		<button
			type="submit"
			className={`${props.fullWidth && "w-full"} py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 `}
		>
			{props.children}
		</button>
	);
};

export default Button;
