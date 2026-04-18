"use client";

import { useState } from "react";
import TermsContent from "@/assets/terms.mdx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { PORTAL_CONFIG } from "@/lib/config";

function MdxComponents() {
	return (
		<div className="prose prose-sm max-w-none [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-3 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-4 [&_h2]:mb-2 [&_p]:text-muted-foreground [&_p]:mb-2 [&_ul]:text-muted-foreground [&_ul]:mb-2 [&_li]:mb-1 [&_strong]:text-foreground [&_hr]:border-border [&_hr]:my-4">
			<TermsContent />
		</div>
	);
}

export default function PortalPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitError, setSubmitError] = useState("");
	const [loading, setLoading] = useState(false);

	function validate(): boolean {
		const newErrors: Record<string, string> = {};

		if (!email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!password.trim()) {
			newErrors.password = "WiFi password is required";
		}

		if (!termsAccepted) {
			newErrors.terms = "You must accept the terms and conditions";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitError("");

		if (!validate()) return;

		setLoading(true);

		try {
			const params = new URLSearchParams(window.location.search);
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.trim(),
					password,
					ap: params.get("ap"),
					ssid: params.get("ssid"),
					mac: params.get("mac"),
					ip: params.get("ip"),
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				setSubmitError(data.error || "Authentication failed");
				return;
			}

			window.location.href = "/welcome";
		} catch {
			setSubmitError("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center p-6">
			<Card className="w-full max-w-sm overflow-hidden border-0 p-0 shadow-xl">
				<div className="relative h-48 w-full">
					<img
						src="/hero.jpg"
						alt="Welcome"
						className="h-full w-full object-cover object-[center_60%]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
					<div className="absolute top-4 left-5">
						<h1
							className="text-[2.5rem] font-extrabold drop-shadow-none text-white leading-none"
							style={{ WebkitTextStroke: "1px #6D5740" }}
						>
							37 Kings
							<span className="block text-[1.75rem] font-semibold mt-1">
								Guest WiFi
							</span>
						</h1>
					</div>
					<div className="absolute bottom-0 left-0 right-0">
						<div className="w-full rounded-t-[20px] bg-card pb-1 pt-2"></div>
					</div>
				</div>

				<CardContent className="px-5 pb-5 pt-0">
					<form onSubmit={handleSubmit}>
						<FieldGroup className="gap-3">
							<Field className="gap-1">
								<FieldLabel htmlFor="email">Email address</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
								/>
								<div className="min-h-5">
									{errors.email && (
										<span className="text-sm text-red-500">{errors.email}</span>
									)}
								</div>
							</Field>

							<Field className="gap-1">
								<FieldLabel htmlFor="password">WiFi password</FieldLabel>
								<Input
									id="password"
									type="password"
									placeholder="Enter guest password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="min-h-5">
									{errors.password && (
										<span className="text-sm text-red-500">
											{errors.password}
										</span>
									)}
								</div>
							</Field>

							<Field className="gap-1">
								<div className="flex pl-2 items-start pt-1">
									<Checkbox
										id="terms"
										checked={termsAccepted}
										onCheckedChange={(checked) =>
											setTermsAccepted(checked === true)
										}
										className="mt-0.5 "
									/>
									<label
										htmlFor="terms"
										className="text-sm pl-2 leading-snug cursor-pointer ml-1"
										style={{ fontFamily: "'Space Grotesk', sans-serif" }}
									>
										I accept the{" "}
										<Dialog>
											<DialogTrigger
												className="text-sm text-primary underline underline-offset-2 hover:text-[#8E725D] transition-colors"
												style={{ fontFamily: "'Space Grotesk', sans-serif" }}
											>
												terms & conditions
											</DialogTrigger>
											<DialogContent
												showCloseButton={false}
												className="px-4 py-0"
											>
												<DialogClose className="absolute top-2 right-2 z-10 p-1 hover:bg-secondary rounded-full">
													<XIcon className="size-4" />
													<span className="sr-only">Close</span>
												</DialogClose>
												<div className="max-h-[min(70vh,400px)] overflow-y-auto py-3 pr-2">
													<MdxComponents />
												</div>
											</DialogContent>
										</Dialog>
									</label>
								</div>
								<div className="min-h-5">
									{errors.terms && (
										<span className="text-sm text-red-500">{errors.terms}</span>
									)}
								</div>
							</Field>

							{		/*
	      {submitError && {/*(
		<Alert variant="destructive">
		  <AlertDescription>{submitError}</AlertDescription>
		</Alert>
	      )}
*/}
							<Button
								type="submit"
								className="w-full text-base py-3 rounded-[10px]"
								disabled={loading}
							>
								{loading ? "Connecting..." : "Connect"}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
