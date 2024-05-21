// Import Query Client
import type { QueryClientConfig } from "@tanstack/react-query";

const MINUTE = 1000 * 60;

const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: MINUTE * 10,
			gcTime: MINUTE * 12,
			retry: 1,
		},
	},
};

export default queryClientConfig;
