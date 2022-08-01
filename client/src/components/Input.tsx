import React, { useEffect, useReducer } from "react";
import Validator, { ValidationRule } from "../util/Validator";

type InputProps = {
	name: string;
	value?: string;
	type?: string;
	label?: string;
	placeholder?: string;
	validator?: ValidationRule;
	errorMessage?: string;
	onChange?: (name: string, isValid: boolean) => void;
};

enum InputActionType {
	CHANGE = "CHANGE",
	BLUR = "BLUR",
}

interface InputState {
	value?: string;
	isValid?: boolean;
	isTouched: boolean;
}

interface InputAction {
	type: InputActionType;
	value?: string;
	validator?: ValidationRule;
}

const inputReducer = (state: InputState, action: InputAction): InputState => {
	switch (action.type) {
		case InputActionType.CHANGE:
			return {
				...state,
				value: action.value,
				isValid:
					action.validator && action.value !== undefined
						? Validator.validate(action.value, action.validator)
						: undefined,
			};
		case InputActionType.BLUR:
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = (props: InputProps) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.value || "",
		isValid: false,
		isTouched: false,
	});

	useEffect(() => {
		if (props.onChange && inputState.isValid !== undefined) {
			props.onChange(props.name, inputState.isValid);
		}
	}, [props.name, props.onChange, inputState.isValid]);

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: InputActionType.CHANGE,
			value: e.target.value,
			validator: props.validator,
		});
	};

	const blurHandler = () => {
		dispatch({
			type: InputActionType.BLUR,
		});
	};

	let style = "";

	if (props.label) {
		style +=
			" mt-1 shadow-sm flex-1 block w-full rounded sm:text-sm border-gray-300";
	} else {
		style +=
			"block px-4 py-3 border rounded border-gray-200 sm:text-sm w-full bg-gray-50";
	}

	if (props.validator && !inputState.isValid && inputState.isTouched) {
		style += " border-red-600 focus:ring-red-500 focus:border-red-500";
	} else {
		style += " focus:ring-indigo-500 focus:border-indigo-500";
	}

	return (
		<div className="mb-5">
			{props.label && (
				<label
					htmlFor={props.label.toLowerCase()}
					className="block text-sm font-medium text-gray-700"
				>
					{props.label}
				</label>
			)}

			<input
				value={inputState.value}
				type={props.type || "text"}
				placeholder={props.placeholder ? props.placeholder : undefined}
				className={style}
				onChange={changeHandler}
				onBlur={blurHandler}
				required={props.validator?.required}
			/>

			{!inputState.isValid && inputState.isTouched && props.errorMessage && (
				<div className="mt-2 text-red-600 text-sm">{props.errorMessage}</div>
			)}
		</div>
	);
};

export default Input;
