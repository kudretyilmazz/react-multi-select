// Import React
import { useRef } from "react";

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
	onReachEnd?: () => void;
	loading?: boolean;
	topOffset?: number;
}

export default function MultiSelectDropdown(props: IMultiSelectDropdownProps) {
	// Props Destruction
	const {
		isVisible,
		renderItem,
		handleSelect,
		getIsSelected,
		data,
		activeOption,
		onReachEnd,
		loading,
		topOffset = 0,
	} = props;

	// Variables
	const ref = useRef<HTMLDivElement>(null);

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

	// Handle Reach End
	const handleScroll = () => {
		if (ref?.current && onReachEnd) {
			const bottom =
				ref?.current?.scrollHeight - ref?.current?.scrollTop === ref?.current?.clientHeight;
			bottom && onReachEnd();
		}
	};

	return (
		<div
			ref={ref}
			onScroll={handleScroll}
			className={clsx("dropdown", isVisible && "opened")}
			style={{ top: topOffset + 4 }}
		>
			{generateDropdownItems()}
			{data?.length === 0 && !loading && (
				<p className="not-found">Aramanıza göre bir eşleşme bulunamadı</p>
			)}
		</div>
	);
}
