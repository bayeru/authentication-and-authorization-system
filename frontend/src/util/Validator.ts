import React from "react";

export interface ValidationRule {

	email?: boolean;
	required?: boolean;
	minLength?: number;
	maxLength?: number;

}

class Validator {

	static validate(val: string, rule: ValidationRule):boolean {

		if (rule.required) {

			if (val.trim().length === 0) {
				return false;
			}

		}

		if (rule.minLength) {

			if (val.trim().length < rule.minLength) {
				return false;
			}

		}

		if (rule.maxLength) {

			if (val.trim().length > rule.maxLength) {
				return false;
			}

		}

		if (rule.email) {

			const emailRegex = /\S+@\S+\.\S+/;

			if (!emailRegex.test(val.trim())) {

				return false;

			}


		}

		return true;

	}

};

export default Validator;