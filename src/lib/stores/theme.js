// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
	const { subscribe, set, update } = writable('dark');

	return {
		subscribe,
		toggleTheme: () =>
			update((theme) => {
				const newTheme = theme === 'light' ? 'dark' : 'light';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					document.documentElement.setAttribute('data-theme', newTheme);
				}
				return newTheme;
			}),
		setTheme: (newTheme) => {
			set(newTheme);
			if (browser) {
				localStorage.setItem('theme', newTheme);
				document.documentElement.setAttribute('data-theme', newTheme);
			}
		},
		initialize: () => {
			if (browser) {
				const savedTheme = localStorage.getItem('theme') || 'dark';
				set(savedTheme);
				document.documentElement.setAttribute('data-theme', savedTheme);
			}
		},
		get: () => {
			if (browser) {
				return localStorage.getItem('theme') || 'dark';
			}
			return 'dark'; // Default theme if not in browser
		}
	};
}

export const theme = createThemeStore();
