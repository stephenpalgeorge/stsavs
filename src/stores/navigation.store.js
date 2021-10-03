import { writable } from 'svelte/store';

export const selectedDropdown = writable(null);
export const activeNavItem = writable(null);
export const menuPaneOpen = writable(null);