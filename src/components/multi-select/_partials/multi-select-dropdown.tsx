// Import Components
import Checkbox from "@/components/checkbox/checkbox";

// Import Utilty
import clsx from "clsx";

interface IMultiSelectDropdownProps {
	isVisible: boolean;
	renderItem: (item: Record<string, any>) => JSX.Element;
	data: Record<string, any>[];
	handleSelect: (item: Record<string, any>, index?: number) => void;
	getIsSelected: (item: Record<string, any>) => boolean;
	activeOption: number;
}

export default function MultiSelectDropdown(props: IMultiSelectDropdownProps) {
	// Props Destruction
	const { isVisible, renderItem, handleSelect, getIsSelected, data, activeOption } = props;

	// Functions
	const generateDropdownItems = () => {
		return data.map((item, index) => {
			const isSelected = getIsSelected(item);
			return (
				<div
					id={"dropdown_option_" + index}
					key={"dropdown_option_" + index}
					className={clsx(
						"dropdown-option",
						isSelected && "selected",
						activeOption === index && "active-option"
					)}
					onClick={() => handleSelect(item, index)}
					aria-activedescendant={activeOption === index ? "active" : ""}
					aria-flowto={activeOption === index ? "active" : ""}
				>
					<div className="checkbox-area">
						<Checkbox checked={isSelected} />
					</div>
					<div className="inner">{renderItem(item)}</div>
				</div>
			);
		});
	};

	return <div className={clsx("dropdown", isVisible && "opened")}>{generateDropdownItems()}</div>;
}
