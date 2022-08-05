import React from "react";

type ButtonProps = {

	type?: "button" | "submit" | "reset";
	fullWidth?: boolean;
	onClick?: (evt:React.MouseEvent<HTMLElement>) => void;
	children?: React.ReactNode;
	disabled?: boolean;

};

const Button = (props:ButtonProps) => {

	const fank:string = "fank";
	const test = `${fank}`;
	let style = `${props.fullWidth && "w-full"} py-2 px-4 rounded-md`;

	if (props.disabled) {

		style += " text-gray-500 bg-gray-300 cursor-not-allowed";

	} else {

		style += " text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

	}

	return (
		<button
			type={props.type || "submit"}
			onClick={props.onClick || undefined}
			disabled={props.disabled}
			className={style}
		>
			{props.children}
		</button>
	);
};

export default Button;
