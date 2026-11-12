import { Languages, Moon, Sun } from "lucide-react";
import styled from "styled-components";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { getMessages } from "../data/dictionary/messages";
import { setColorMode, setLocale } from "../lib/redux/slices/preferences-slice";

const Controls = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

interface PreferencesControlsProps {
	className?: string;
}

export function PreferencesControls({ className }: PreferencesControlsProps) {
	const dispatch = useAppDispatch();
	const locale = useAppSelector((state) => state.preferences.locale);
	const colorMode = useAppSelector((state) => state.preferences.colorMode);
	const messages = getMessages(locale);

	const toggleLocale = () =>
		dispatch(setLocale(locale === "fa" ? "en" : "fa"));

	const toggleColorMode = () =>
		dispatch(setColorMode(colorMode === "light" ? "dark" : "light"));

	return (
		<Controls className={className}>
			<Button
				type="button"
				variant="outline"
				aria-label={messages.switchLanguage}
				onClick={toggleLocale}
			>
				<Languages size={16} aria-hidden="true" />
				{locale === "fa"
					? messages.languageEnglish
					: messages.languagePersian}
			</Button>

			<Button
				type="button"
				variant="outline"
				aria-label={messages.toggleTheme}
				onClick={toggleColorMode}
			>
				{colorMode === "light" ? (
					<Moon size={16} aria-hidden="true" />
				) : (
					<Sun size={16} aria-hidden="true" />
				)}
				{colorMode === "light"
					? messages.darkMode
					: messages.lightMode}
			</Button>
		</Controls>
	);
}
