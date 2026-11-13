import { useLayoutEffect, useRef } from "react";

const countDigits = (s: string) => (s.match(/[\d.]/g) ?? []).length;

export function useCaretRestore(display: string) {
	const ref = useRef<HTMLInputElement>(null);
	const pending = useRef<number | null>(null);

	const capture = (el: HTMLInputElement) => {
		pending.current = countDigits(
			el.value.slice(0, el.selectionStart ?? 0),
		);
	};

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el || pending.current === null) return;
		let seen = 0;
		let pos = 0;
		while (pos < display.length && seen < pending.current) {
			if (/[\d.]/.test(display[pos])) seen++;
			pos++;
		}
		el.setSelectionRange(pos, pos);
		pending.current = null;
	}, [display]);

	return { ref, capture };
}
