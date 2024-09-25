import { writable, type Writable } from "svelte/store";

export const toggleStore: Writable<boolean> = writable(false);
