// Import React
import { useState, useMemo } from "react";

// Import Domain
import { useCharacters } from "@/domain/rickandmorty/queries";

// Import Components
import MultiSelect from "@/components/multi-select/multi-select";

// Import Utilty
import DOMPurify from "dompurify";

// Import Styles
import "@/assets/styles/views/app.scss";

function App() {
	// States
	const [search, setSearch] = useState("");

	// Variables
	const characters = useCharacters(search);
	const data = useMemo(() => {
		if (Array.isArray(characters.data?.pages)) {
			return characters.data?.pages?.reduce((acc, page) => {
				if (Array.isArray(page.results)) {
					return [...acc, ...page.results];
				}
				return acc;
			}, []);
		}
		return [];
	}, [characters.data]);

	// Functions
	const fetchNextPage = () => {
		if (!characters.isFetching && characters.hasNextPage) {
			characters.fetchNextPage();
		}
	};
	const handleSearch = (searchText: string) => {
		setSearch(searchText);
	};

	const makeBold = (text: string) => {
		if (search.trim() !== "") {
			const regex = new RegExp(search, "gi");
			return text.replace(regex, match => "<i>" + match + "</i>");
		}
		return text;
	};

	// Seçeneklerin listelenmesini özelleştirebilmek adına renderItem fonksiyonu kullanılır.
	const renderItem = (item: Record<string, any>) => {
		return (
			<div className="render-item">
				<img src={item.image} alt={item.name} className="avatar" />
				<div className="info">
					<h3
						className="name"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(makeBold(item.name)),
						}}
					/>
					<p className="episodes">{item.episode?.length + " Episodes"}</p>
				</div>
			</div>
		);
	};
	return (
		<div className="app">
			<div className="app-select-wrapper">
				<MultiSelect
					data={data}
					loading={characters.isFetching && characters.hasNextPage}
					renderItem={renderItem}
					valueKey="id"
					labelKey="name"
					onSearch={handleSearch}
					onReachEnd={fetchNextPage}
				/>
			</div>
		</div>
	);
}

export default App;
