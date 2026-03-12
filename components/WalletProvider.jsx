// For mainnet
const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);

// For devnet (current)
const endpoint = useMemo(() => clusterApiUrl('devnet'), []);