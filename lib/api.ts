import {storageLocal} from "./StorageHandler";

export enum Endpoint {
    content,
    backend
}

export const apiResolve = (path: string, endpoint: Endpoint) => {
    if (path.startsWith("/")) {
        return new URL("/api"+path, endpoint === Endpoint.content ? process.env.NEXT_PUBLIC_CONTENT_URL : process.env.NEXT_PUBLIC_BACKEND_URL);
    }
    throw new Error("Path paths must start with a slash");
};

export const api = (url: string, endpoint: Endpoint, init: {} = {}) =>
    fetch(apiResolve(url, endpoint),
        {...init}
    );

export const apiFetch = async (
    url: string,
    endpoint: Endpoint = Endpoint.content,
    {headers = {}, ...otherOptions} = {},
) => {
    const options = {
        ...otherOptions,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Accept: "application/json",
            Authorization: {
                toString() {
                    return `Bearer ${storageLocal.get("accessToken", "")}`;
                }
            }
        },
    };
    const response = await api(url, endpoint, options);
    if (response.ok) {
        const data = await response.json();
        return Promise.resolve({response, ...data});
    }
    const data = await response.json();
    return Promise.reject({response, data});
};