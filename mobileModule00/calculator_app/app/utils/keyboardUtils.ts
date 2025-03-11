import {evaluate} from "mathjs";

const handleInput = (input: string, value: string, setValue: any, setResult: any) => {
	if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(input)) {
		value === "0" ? setValue(input) : setValue(value + input);
	} else if (input === "C") {
		value.length > 1 ? setValue(value.slice(0, -1)) : setValue("0");
	} else if (input === "AC") {
		setValue("0");
		setResult("0");
	} else if (["+", "-", "x", "/"].includes(input)) {
		setValue(value + " " + input + " ");
	} else if (input === "=") {
		handleResult(value, setResult);
	}
}

const handleResult = (value: string, setResult: any) => {
	try {
		const exp = value.replaceAll("x", "*");
		setResult(evaluate(exp));
	} catch (e) {
		setResult("error");
	}
}

export default handleInput;