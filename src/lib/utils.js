import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';

/**
 * Conditionally joins class names and returns a merged string of class names.
 *
 * @param {...string|string[]} inputs - Variable number of class names or arrays of class names.
 * @return {string} A merged string of class names.
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}


/**
 * Generates an animation configuration for flying and scaling an element.
 *
 * @param {HTMLElement} node - The element to animate.
 * @param {Object} [params={ y: -8, x: 0, start: 0.95, duration: 150 }] - Animation parameters.
 * @param {number} [params.y=-8] - The vertical offset of the animation.
 * @param {number} [params.x=0] - The horizontal offset of the animation.
 * @param {number} [params.start=0.95] - The starting scale of the animation.
 * @param {number} [params.duration=150] - The duration of the animation.
 * @return {Object} An animation configuration object.
 */
export const flyAndScale = (
	node,
	params = { y: -8, x: 0, start: 0.95, duration: 150 }
) => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	// @ts-ignore
	const scaleConversion = (valueA, scaleA, scaleB) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	// @ts-ignore
	const styleToString = (style) => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		// @ts-ignore
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

/**
 * Converts a string to camel case.
 *
 * @param {string} str - The string to convert.
 * @return {string} The converted string in camel case.
 */
const toCamelCase = (str) => {
	return str.replace(/([-_][a-z])/g, (group) =>
		group.toUpperCase().replace('-', '').replace('_', '')
	);
}

/**
 * Recursively converts an object's keys to camel case.
 *
 * @param {object} obj - The object to convert.
 * @return {object} A new object with camel case keys.
 */
export const keysToCamelCase = (obj) => {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(keysToCamelCase);
	}

	const result = {};
	for (const [key, value] of Object.entries(obj)) {
		const camelKey = toCamelCase(key);
		// @ts-ignore
		result[camelKey] = keysToCamelCase(value);
	}

	return result;
}
