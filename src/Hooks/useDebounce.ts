import { useRef } from "react";

export const useDebounce = <TArgs extends unknown[]>(
	callback: (...args: TArgs) => void,
	delay: number = 300,
) => {
	const currentTimer = useRef<ReturnType<typeof setTimeout>>(null);

	return (...args: TArgs) => {
		if (currentTimer.current) clearTimeout(currentTimer.current);

		setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
