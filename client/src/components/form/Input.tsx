import React from "react";

type InputProps = {

	type?: string;
	placeholder: string;
	
};

const Input = (props: InputProps) => {
	return (
		<div className="mb-5">
			<input
				type={props.type || "text"}
				placeholder={props.placeholder}
				className="block px-4 py-3 border rounded border-gray-200 sm:text-sm w-full bg-gray-50"
			/>
		</div>
	);
};

export default Input;
