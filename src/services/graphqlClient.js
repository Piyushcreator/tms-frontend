const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export async function gqlRequest(query, variables = {}, token) {
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ query, variables })
    });

    const json = await res.json();

    if (!res.ok || json.errors?.length) {
        const msg = json.errors?.[0]?.message || `Request failed (${res.status})`;
        throw new Error(msg);
    }

    return json.data;
}
