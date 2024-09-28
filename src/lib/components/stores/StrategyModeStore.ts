import { writable, type Writable } from "svelte/store";

export const strategyModeStore: Writable<boolean> = writable(false);
