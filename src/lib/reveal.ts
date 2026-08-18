import type { Action } from 'svelte/action';

/**
 * use:reveal — fades/slides an element in once it scrolls into view.
 * Pair with the `.reveal` class from layout.css for the hidden/visible states.
 */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, params) => {
	const delay = params?.delay ?? 0;
	node.style.transitionDelay = `${delay}ms`;

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
