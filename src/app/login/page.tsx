"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("demo@admin.com");
	const [password, setPassword] = useState("123456");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		setLoading(true);
		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		setLoading(false);

		if (res?.ok) {
			toast.success("Logged in successfully 👌");
			router.push("/dashboard");
		} else {
			toast.error("Login error: Check your credentials");
		}
	};

	const loginAsDemo = async () => {
		setEmail("demo@admin.com");
		setPassword("123456");
		await handleLogin();
	};

	return (
		<div className="flex items-center justify-center min-h-screen px-4">
			<Card className="w-full max-w-md shadow-xl">
				<CardHeader>
					<CardTitle>Login to Admin Dashboard</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading}
						/>
					</div>
					<Button onClick={handleLogin} className="w-full" disabled={loading}>
						{loading ? "Logging in..." : "Log in"}
					</Button>
					<Button
						variant="secondary"
						onClick={loginAsDemo}
						className="w-full"
						disabled={loading}
					>
						Demo Log in
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
