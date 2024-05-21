// Import React
import { useCallback } from "react";

// Import Components
import Input from "@/components/input/input";

// Import Utilty
import clsx from "clsx";

// Import Assets
import ChevronDown from "@/assets/images/chevron_down.svg";
import Close from "@/assets/images/close.svg";

interface IMultiSelectInputContainerProps {
	isFocused: boolean;
	value: string[];
	data: Record<string, any>[];
	labelKey: string;
	valueKey: string;
	handleFocus: () => void;
	handleRemove: (item: Record<string, any>, index?: number) => void;
	onSearch: (search: string) => void;
}

function MultiSelectInputContainer(props: IMultiSelectInputContainerProps) {
	// Props Destruction
	const { isFocused, value, labelKey, data, valueKey, handleFocus, handleRemove, onSearch } = props;

	// Functions
	const getSelectedRecords = useCallback(() => {
		return value.map(item => data.find(dataItem => dataItem[valueKey] === item)).filter(Boolean);
	}, [value, data, valueKey]);

	const InputSelectedItems = () => {
		const selectedItems = getSelectedRecords();
		return selectedItems.map((item, index) => (
			<div
				key={"selected_input_item_" + index}
				className="selected-input-item"
				onClick={() => item && handleRemove(item, index)}
			>
				{item?.[labelKey]}
				<img src={Close} className="icon" />
			</div>
		));
	};

	return (
		<div className="input-container">
			<InputSelectedItems />
			<Input onChange={e => onSearch(e.target.value)} className="input" onFocus={handleFocus} />
			<img
				src={ChevronDown}
				className={clsx("chevron-down", isFocused && "active")}
				onFocus={handleFocus}
			/>
		</div>
	);
}

export default MultiSelectInputContainer;
