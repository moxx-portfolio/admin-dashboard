"use client"

import { useTheme } from "next-themes"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const themes = [
	{ id: "light", label: "Light", icon: Sun },
	{ id: "dark", label: "Dark", icon: Moon },
	{ id: "system", label: "System", icon: Monitor },
] as const

export default function ThemeSwitcherDebug() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (process.env.NODE_ENV !== "development" || !mounted) return null

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="icon" className="w-9 h-9">
						{theme === "light" && <Sun className="w-4 h-4" />}
						{theme === "dark" && <Moon className="w-4 h-4" />}
						{theme === "system" && <Monitor className="w-4 h-4" />}
					</Button>
				</PopoverTrigger>
				<PopoverContent side="top" className="w-36 p-2">
					<div className="grid gap-2">
						{themes.map(({ id, label, icon: Icon }) => (
							<Button
								key={id}
								variant={theme === id ? "default" : "ghost"}
								onClick={() => setTheme(id)}
								className="w-full justify-start gap-2"
							>
								<Icon className="w-4 h-4" />
								{label}
							</Button>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}
