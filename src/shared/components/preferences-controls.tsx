import { Languages, Moon, Sun } from "lucide-react";
import styled from "styled-components";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { getMessages } from "../data/dictionary/messages";
import { setColorMode, setLocale } from "../lib/redux/slices/preferences-slice";

const Controls = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	margin-bottom: 24px;
`;

export function PreferencesControls() {
	const dispatch = useAppDispatch();
	const locale = useAppSelector((state) => state.preferences.locale);
	const colorMode = useAppSelector((state) => state.preferences.colorMode);
	const messages = getMessages(locale);

	return (
		<Controls>
			<Button
				type="button"
				variant="outline"
				aria-label={messages.switchLanguage}
				onClick={() =>
					dispatch(setLocale(locale === "fa" ? "en" : "fa"))
				}
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
				onClick={() =>
					dispatch(
						setColorMode(
							colorMode === "light" ? "dark" : "light",
						),
					)
				}
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
