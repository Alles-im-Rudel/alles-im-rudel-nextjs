const mkStorage = () => {
    const data = new Map();

    return {
        getItem: (k: string) => data.get(k) ?? null,
        setItem: (k: string, v: string) => data.set(k, String(v)),
        removeItem: (k: string) => data.delete(k),
    };
};

export const localStorage =
    typeof window === "undefined" ? mkStorage() : window.localStorage;
export const sessionStorage =
    typeof window === "undefined" ? mkStorage() : window.sessionStorage;

class StorageHandler {
    private storage: { removeItem: (k: any) => boolean; getItem: (k: any) => any; setItem: (k: any, v: any) => Map<any, any> } | Storage;
    constructor(storage = localStorage) {
        this.storage = storage;
    }

    /**
     * Parses the return value as boolean.
     * @param {*} key
     */
    getBoolean(key: string) {
        return this.storage.getItem(key) === "true";
    }

    /**
     * Return the value for the given key as int.
     * @param {*} key
     * @param {*} fallbackValue
     */
    getInt(key: string, fallbackValue:any = null) {
        const data = this.get(key);
        if (data === null) {
            return fallbackValue;
        }
        return parseInt(data);
    }

    /**
     * Return the value for the given key as json.
     * @param {*} key
     * @param {*} fallbackValue
     */
    getJson(key: string, fallbackValue:any = null) {
        const data = this.get(key);
        if (data === null) {
            return fallbackValue;
        }
        if (!data.includes("{") && !data.includes("[")) {
            console.log("Invalid json in local storage", key, data);
        }
        return JSON.parse(data);
    }

    /**
     * Returns the value for the given key.
     * @param {*} key
     * @param {*} fallbackValue
     */
    get(key: string, fallbackValue:any = null ) {
        const data = this.storage.getItem(key);
        if (data === "null") {
            return null;
        }
        if (!data) {
            return fallbackValue;
        }
        return data;
    }

    /**
     * Sets the given value to the given key.
     * @param {*} key
     * @param {*} value
     */
    set(key: string, value: any) {
        this.storage.setItem(key, value);
    }

    /**
     * Sets the given value stringified to the given key.
     * @param {*} key
     * @param {*} value
     */
    setJson(key: string, value: JSON) {
        this.set(key, JSON.stringify(value));
    }

    /**
     * Removes the item with the given key.
     * @param {*} key
     */
    remove(key: string) {
        this.storage.removeItem(key);
    }
}

export default StorageHandler;

export const storageLocal = new StorageHandler();
export const storageSession = new StorageHandler(sessionStorage);
