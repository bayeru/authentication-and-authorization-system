import React, { useCallback, useReducer } from "react";

enum FormActionType {
	CHANGE = "CHANGE",
	SUBMIT = "SUBMIT",
}

interface FormState {
	inputs: {
		[name: string]: {
			isValid: boolean;
		};
	};

	isValid: boolean;
}

interface FormAction {
	type: FormActionType;
	name: string;
	isValid: boolean;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
	switch (action.type) {
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

const useForm = (initialState: FormState):[formState:FormState, changeHandler:(name:string, isValid:boolean) => void] => {

	const [formState, dispatch] = useReducer(formReducer, initialState);

	const changeHandler = useCallback((name: string, isValid: boolean) => {
		dispatch({
			type: FormActionType.CHANGE,
			name: name,
			isValid: isValid,
		});
	}, []);

	return [formState, changeHandler];

};

export default useForm;
