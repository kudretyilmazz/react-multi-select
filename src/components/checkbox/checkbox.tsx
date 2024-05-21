// Import React
import type { InputHTMLAttributes } from "react";

// Import Styles
import "@/assets/styles/components/checkbox.scss";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox(props: ICheckboxProps) {
	return <input {...props} type="checkbox" className="checkbox" />;
}
