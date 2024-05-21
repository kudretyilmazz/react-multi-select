// Import Query Client
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCharacters = (search: string) => {
	return useInfiniteQuery({
		queryKey: ["RICK_AND_MORTY.USE_CHARACTERS", search],
		queryFn: async ({ pageParam }) => {
			const searchParam = search ? "&name=" + search : "";
			const list = await fetch(
				`https://rickandmortyapi.com/api/character?page=${pageParam}${searchParam}`
			);
			return list.json();
		},

		initialPageParam: 1,
		getNextPageParam: lastPage => {
			if (lastPage?.info?.next) {
				const param = new URL(lastPage.info.next).searchParams.get("page");
				return Number(param) || 2;
			}
		},
	});
};
