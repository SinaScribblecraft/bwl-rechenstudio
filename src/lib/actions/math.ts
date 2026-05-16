import katex from 'katex';

export function math(node: HTMLElement, formula: string) {
	katex.render(formula, node, {
		throwOnError: false,
		displayMode: true
	});

	return {
		update(newFormula: string) {
			katex.render(newFormula, node, {
				throwOnError: false,
				displayMode: true
			});
		}
	};
}
