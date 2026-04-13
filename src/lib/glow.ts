import type { Action } from 'svelte/action';

/**
 * Svelte action that tracks mouse position relative to the element
 * and sets --start (angle in degrees) and --active (0–1 proximity)
 * CSS custom properties. Pair with the .glow-card / .glow-border CSS.
 */
export const glow: Action<HTMLElement> = (node) => {
	node.style.setProperty('--start', '0');
	node.style.setProperty('--active', '0');

	function onMove(e: PointerEvent) {
		const rect = node.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;

		const angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90;
		const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
		const maxDist = Math.max(rect.width, rect.height) * 1.4;
		const active = Math.max(0, 1 - dist / maxDist);

		node.style.setProperty('--start', String(angle));
		node.style.setProperty('--active', String(active.toFixed(3)));
	}

	window.addEventListener('pointermove', onMove);
	return { destroy: () => window.removeEventListener('pointermove', onMove) };
};
