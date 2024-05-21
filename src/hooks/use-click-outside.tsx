// Import React
import { useEffect, useRef } from "react";

export default function useOutsideClick(callback: () => void): React.RefObject<HTMLDivElement> {
	// Variables
	const ref = useRef<HTMLDivElement>(null);

	// useEffect
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("mouseup", handleClickOutside);
		document.addEventListener("touchend", handleClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
			document.removeEventListener("touchend", handleClickOutside);
		};
	}, [callback]);

	return ref;
}
