// Import React
import { useCallback, useState, ChangeEvent } from "react";

// Import Components
import Input from "@/components/input/input";
import Spinner from "@/components/spinner/spinner";

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
	loading?: boolean;
}

function MultiSelectInputContainer(props: IMultiSelectInputContainerProps) {
	// Props Destruction
	const {
		isFocused,
		value,
		labelKey,
		data,
		valueKey,
		handleFocus,
		handleRemove,
		onSearch,
		loading,
	} = props;

	// useStates
	const [search, setSearch] = useState("");

	// Functions
	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		onSearch(e.target.value);
	};

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
			<Input value={search} onChange={onChangeSearch} className="input" onFocus={handleFocus} />
			{loading ? (
				<Spinner />
			) : (
				<img
					src={ChevronDown}
					className={clsx("chevron-down", isFocused && "active")}
					onFocus={handleFocus}
				/>
			)}
		</div>
	);
}

export default MultiSelectInputContainer;
