import React, { useCallback, useReducer } from "react";

enum FormActionType {
	CHANGE = "CHANGE",
	SUBMIT = "SUBMIT",
	SET = "SET",
}

interface FormState {
	inputs: {
		[name: string]: {
			value: string;
			isValid: boolean;
		};
	};

	isValid: boolean;
}

interface FormAction {
	type: FormActionType;
	name: string;
	value: string;
	isValid: boolean;
}

interface SetFormAction {
	type: FormActionType.SET;
	state: FormState;
}

const formReducer = (state: FormState, action: FormAction | SetFormAction): FormState => {
	switch (action.type) {
		case FormActionType.SET:
			const formAction: SetFormAction = action as SetFormAction;
			return formAction.state;

		case FormActionType.CHANGE:
			let formIsValid: boolean = true;

			for (const inputName in state.inputs) {
				if (inputName === action.name) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputName].isValid;
				}
			}

			return {
				...state,
				inputs: {
					...state.inputs,
					[action.name]: {
						value: action.value,
						isValid: action.isValid,
					},
				},

				isValid: formIsValid,
			};

		case FormActionType.SUBMIT:
			return {
				...state,
				isValid: action.isValid,
			};
		default:
			return state;
	}
};

const useForm = (
	initialState: FormState
): [
	formState: FormState,
	changeHandler: (name: string, value: string, isValid: boolean) => void,
	setHandler: (state: FormState) => void
] => {
	const [formState, dispatch] = useReducer(formReducer, initialState);

	const changeHandler = useCallback((name: string, value: string, isValid: boolean) => {
		dispatch({
			type: FormActionType.CHANGE,
			name: name,
			value: value,
			isValid: isValid,
		});
	}, []);

	const setData = useCallback((state: FormState) => {
		dispatch({
			type: FormActionType.SET,
			state: state,
		});
	}, []);

	return [formState, changeHandler, setData];
};

export default useForm;
