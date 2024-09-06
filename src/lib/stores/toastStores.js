import { writable } from 'svelte/store';

const toasts = writable([]);

let idCounter = 0;

export const ToastType = {
	success: 'success',
	warning: 'warning',
	info: 'info',
	error: 'error'
};

/**
 * Adds a new toast notification to the store.
 *
 * @param {string} type - The type of toast notification (e.g. success, warning, error)
 * @param {string} message - The message to display in the toast notification
 * @param {number} [duration=15000] - The duration of the toast notification in milliseconds
 * @return {void}
 */
export function addToast(type, message, duration = 5000) {
	const id = idCounter++;
	const newToast = { id, type, message, duration };
	// @ts-ignore
	toasts.update((t) => [...t, newToast]);
	setTimeout(() => removeToast(id), duration);
}

/**
 * Removes a toast notification from the store based on its ID.
 *
 * @param {number} id - The ID of the toast notification to remove.
 * @return {void} This function does not return anything.
 */
export function removeToast(id) {
	// @ts-ignore
	toasts.update((t) => t.filter((toast) => toast.id !== id));
}

export { toasts };
