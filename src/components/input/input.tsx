// Import React
import type { InputHTMLAttributes } from "react";

// Import Utilty
import clsx from "clsx";

// Import Styles
import "@/assets/styles/components/input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
	// Props Destruction
	const { className, ...rest } = props;

	return <input {...rest} className={clsx("input", className)} />;
}
