"use client"

import { Popover } from "@/components/ui/popover"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type Theme = "system" | "light" | "dark"
interface ContextValue {
	theme: Theme
	changeTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ContextValue>({
	theme: "system",
	changeTheme: () => { }
})

interface ProviderProps {
	children: ReactNode
}

const ThemeProvider = ({ children }: ProviderProps) => {
	const [theme, setTheme] = useState<Theme>("system")

	// применяем тему
	const applyTheme = (theme: Theme) => {
		if (typeof window === "undefined") return
		const element = document.documentElement
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

		switch (theme) {
			case "light":
				element.classList.remove("dark")
				break
			case "dark":
				element.classList.add("dark")
				break
			case "system":
			default:
				prefersDark
					? element.classList.add("dark")
					: element.classList.remove("dark")
				break
		}
	}

	// при загрузке — применить system
	useEffect(() => {
		applyTheme(theme)
	}, [theme])

	// слушать изменения системной темы (если выбрана system)
	useEffect(() => {
		if (theme !== "system") return

		const media = window.matchMedia("(prefers-color-scheme: dark)")
		const handler = () => applyTheme("system")
		media.addEventListener("change", handler)
		return () => media.removeEventListener("change", handler)
	}, [theme])

	const changeTheme = (theme: Theme) => setTheme(theme)

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
