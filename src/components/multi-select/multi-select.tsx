// Import React
import { useState, useEffect, useCallback } from "react";

// Import Hooks
import useOutsideClick from "@/hooks/use-click-outside";

// Import Partials
import MultiSelectInputContainer from "./_partials/multi-select-input-container";
import MultiSelectDropdown from "./_partials/multi-select-dropdown";

// Import Styles
import "@/assets/styles/components/multi-select.scss";

interface IMultiSelectProps {
	labelKey: string;
	valueKey: string;
	data: Record<string, any>[];
	renderItem: (item: Record<string, any>) => JSX.Element;
	onSearch: (search: string) => void;
	loading?: boolean;
	onReachEnd?: () => void;
}

export default function MultiSelect(props: IMultiSelectProps) {
	// Props Destruction
	const { data = [], renderItem, valueKey, labelKey, onSearch, loading, onReachEnd } = props;

	// States
	const [isFocused, setIsFocused] = useState(false);
	const [value, setValue] = useState<string[]>([]);
	const [activeOption, setActiveOption] = useState(0);

	// Variables
	const ref = useOutsideClick(() => setIsFocused(false));

	// Functions
	const handleFocus = () => setIsFocused(true);

	const handleSelect = useCallback(
		(item: Record<string, any>, optionIndex?: number) => {
			const itemValue = item?.[valueKey];
			const index = value.indexOf(itemValue);
			if (index === -1) {
				setValue([...value, itemValue]);
			} else {
				const newValue = [...value];
				newValue.splice(index, 1);
				setValue(newValue);
			}

			if (optionIndex && optionIndex >= 0 && activeOption !== optionIndex) {
				setActiveOption(optionIndex);
			}
		},
		[activeOption, value, valueKey]
	);

	const getIsSelected = (item: Record<string, any>) => {
		return value.includes(item?.[valueKey]);
	};

	const keyDownHandler = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowUp":
					activeOption > 0 && setActiveOption(prev => prev - 1);
					break;
				case "ArrowDown":
					activeOption < data.length - 1 && setActiveOption(prev => prev + 1);
					break;
				case "Enter":
					handleSelect(data[activeOption]);
					break;
				case "Escape":
					setIsFocused(false);
					break;
			}

			if (event.key !== "Enter") {
				document.getElementById("dropdown_option_" + activeOption)?.scrollIntoView({
					behavior: "smooth",
					block: event.key === "ArrowUp" ? "end" : "start",
					inline: "nearest",
				});
			}
		},
		[activeOption, data, handleSelect]
	);

	// useEffect
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("keydown", keyDownHandler, true);
		}

		return () => {
			window.removeEventListener("keydown", keyDownHandler, true);
		};
	}, [keyDownHandler]);

	return (
		<div className="multi-select" onFocus={handleFocus} ref={ref}>
			<MultiSelectInputContainer
				isFocused={isFocused}
				value={value}
				labelKey={labelKey}
				valueKey={valueKey}
				data={data}
				handleFocus={handleFocus}
				handleRemove={handleSelect}
				onSearch={onSearch}
				loading={loading}
			/>
			<MultiSelectDropdown
				isVisible={isFocused}
				data={data}
				renderItem={renderItem}
				handleSelect={handleSelect}
				getIsSelected={getIsSelected}
				activeOption={activeOption}
				onReachEnd={onReachEnd}
				loading={loading}
			/>
		</div>
	);
}
