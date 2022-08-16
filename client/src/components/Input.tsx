import React, { useEffect, useReducer, useCallback } from "react";
import Validator, { ValidationRule } from "../util/Validator";

interface InputProps {
	name: string;
	value?: string;
	initialValue?: string;
	type?: string;
	label?: string;
	disabled?: boolean;
	valid?: boolean;
	initialValid?: boolean;
	placeholder?: string;
	validator?: ValidationRule;
	errorMessage?: string;
	onChange?: (name: string, value: string, isValid: boolean) => void;
};

enum InputActionType {
	CHANGE = "CHANGE",
	BLUR = "BLUR",
	SET = "SET",
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

interface InputSetAction {
	type: InputActionType.SET;
	state: InputState;
}

const inputReducer = (state: InputState, action: InputAction | InputSetAction): InputState => {
	switch (action.type) {
		case InputActionType.SET:
			const inputSetAction: InputSetAction = action as InputSetAction;
			return inputSetAction.state;
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
		value: props.initialValue || "",
		isValid: props.initialValid || false,
		isTouched: false,
	});

	useEffect(() => {
		if (props.onChange) {
			props.onChange(props.name, inputState.value || "", inputState.isValid || false);
		}

		if (props.initialValue && !inputState.isTouched) {
			dispatch({
				type: InputActionType.SET,
				state: {
					value: props.initialValue,
					isValid: props.initialValid || true,
					isTouched: true,
				},
			});
		}
	}, [
		props.name,
		props.onChange,
		props.initialValue,
		inputState.value,
		inputState.isValid,
		inputState.isTouched,
	]);

	const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: InputActionType.CHANGE,
			value: e.target.value,
			validator: props.validator,
		});
	}, []);

	const blurHandler = () => {
		dispatch({
			type: InputActionType.BLUR,
		});
	};

	let style = "";

	if (props.label) {
		style += " mt-1 shadow-sm flex-1 block w-full rounded sm:text-sm border-gray-300";
	} else {
		style += "block px-4 py-3 border rounded border-gray-200 sm:text-sm w-full bg-gray-50";
	}

	if (props.validator && !inputState.isValid && inputState.isTouched) {
		style += " border-red-600 focus:ring-red-500 focus:border-red-500";
	} else {
		style += " focus:ring-indigo-500 focus:border-indigo-500";
	}

	if (props.disabled) {
		style += " bg-gray-200";
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
				disabled={props.disabled}
			/>

			{!inputState.isValid && inputState.isTouched && props.errorMessage && (
				<div className="mt-2 text-red-600 text-sm">{props.errorMessage}</div>
			)}
		</div>
	);
};

export default Input;
