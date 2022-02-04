import algoliasearch from "algoliasearch";

const ALGOLIA_APP_ID = "EPJ1R7ZVE7";
const ALGOLIA_API_KEY = "fd65f8f4df8d45a8a146cf40155032ba";

export const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY, {
  protocol: "https:",
});
export const algolia = client.initIndex("nft");
