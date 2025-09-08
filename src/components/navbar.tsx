"use client"

import { Button } from "@/components/ui/button"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const closeBtnRef = useRef<HTMLButtonElement | null>(null)
	const panelRef = useRef<HTMLDivElement | null>(null)
	const lastFocusedRef = useRef<HTMLElement | null>(null)
	const reduceMotion = useReducedMotion()

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0, y: -16 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: reduceMotion ? 0 : 0.5,
				ease: "easeOut",
				when: "beforeChildren",
				staggerChildren: reduceMotion ? 0 : 0.05,
			},
		},
	} as const

	const itemVariants = {
		hidden: { opacity: 0, y: -8 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeOut" },
		},
	} as const

	// Header background on scroll
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	// Lock body scroll and manage focus when mobile menu is open
	useEffect(() => {
		if (menuOpen) {
			lastFocusedRef.current = document.activeElement as HTMLElement
			const originalOverflow = document.body.style.overflow
			document.body.style.overflow = "hidden"
			// Focus close button for accessibility
			const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0)
			return () => {
				document.body.style.overflow = originalOverflow
				window.clearTimeout(id)
			}
		} else {
			// Restore focus
			lastFocusedRef.current?.focus?.()
		}
	}, [menuOpen])

	// Close on ESC key
	useEffect(() => {
		if (!menuOpen) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false)
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [menuOpen])

	// Simple focus trap within the panel when open
	const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== "Tab" || !panelRef.current) return
		const focusable = panelRef.current.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
		)
		if (focusable.length === 0) return
		const first = focusable[0]
		const last = focusable[focusable.length - 1]
		const active = document.activeElement as HTMLElement | null
		if (e.shiftKey) {
			if (active === first || !panelRef.current.contains(active)) {
				e.preventDefault()
				last.focus()
			}
		} else {
			if (active === last) {
				e.preventDefault()
				first.focus()
			}
		}
	}

	const closeMenu = () => setMenuOpen(false)
	const openMenu = () => setMenuOpen(true)

	return (
		<>
			{/* subtle top gradient under header */}
			<div
				className={`fixed inset-x-0 top-0 h-40 pointer-events-none transition-all duration-300 ${
					scrolled
						? "bg-gradient-to-b from-white/90 via-white/60 to-transparent z-0"
						: "bg-gradient-to-b from-[rgba(255,255,255,0.66)] to-[rgba(255,255,255,0)] z-0"
				}`}
			/>

			<header className="relative z-30 w-full">
				<motion.div
					className="mx-auto flex max-w-[1265px] items-center justify-between px-4 py-4 xl:px-0"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.6 }}
				>
					{/* Logo */}
					<motion.div variants={itemVariants} className="flex items-center">
						<Link href="/#home" className="flex items-center" aria-label="Go to home">
							<Image
								src="/images/bei-capelli-logo.png"
								alt="Bei Capelli Logo"
								width={120}
								height={28}
								className="h-auto w-[110px] sm:w-[120px] object-contain"
								priority
							/>
						</Link>
					</motion.div>

					{/* Desktop navigation (visible at xl and up) */}
					<nav className="hidden xl:flex items-center gap-7 lg:gap-9">
						{[
							{ href: "/#home", label: "Home" },
							{ href: "/#team-members", label: "Team Members" },
							{ href: "/#services", label: "Services" },
							{ href: "/#results", label: "Results" },
							{ href: "/#products", label: "Products" },
							{ href: "/#reviews", label: "Reviews" },
							{ href: "/#contact", label: "Contact" },
						].map((item) => (
							<motion.div key={item.href} variants={itemVariants}>
								<Link href={item.href} className="text-black hover:text-gray-600 transition-colors">
									{item.label}
								</Link>
							</motion.div>
						))}
					</nav>

					{/* Desktop CTA (visible at xl and up) */}
					<motion.div className="hidden xl:block" variants={itemVariants}>
						<Button
							variant="outline"
							className="border-black text-black bg-[#E6E4E1] hover:bg-black hover:text-white transition-colors rounded-none px-5 py-3"
						>
							Book now
						</Button>
					</motion.div>

					{/* Mobile hamburger (visible until xl) */}
					<div className="xl:hidden">
						<Button
							type="button"
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							aria-expanded={menuOpen}
							aria-controls="mobile-menu"
							onClick={menuOpen ? closeMenu : openMenu}
							variant="outline"
							size="icon"
							className="size-10 rounded-md border-black/10 bg-white/70 text-black shadow-sm backdrop-blur-sm transition hover:bg-white focus:ring-black/40"
						>
							<span className="sr-only">Menu</span>
							<svg
								className={`h-6 w-6 transition-transform duration-300 ${menuOpen ? "rotate-90" : "rotate-0"}`}
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								{menuOpen ? (
									<path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
								) : (
									<>
										<path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
										<path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
										<path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
									</>
								)}
							</svg>
						</Button>
					</div>
				</motion.div>
			</header>

			{/* Mobile full-screen menu overlay */}
			<div
				className={`fixed inset-0 z-40 xl:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
				aria-hidden={!menuOpen}
			>
				{/* Backdrop */}
				<div
					className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
						menuOpen ? "opacity-100" : "opacity-0"
					}`}
					onClick={closeMenu}
				/>

				{/* Slide-in panel (covers screen) */}
				<div
					id="mobile-menu"
					role="dialog"
					aria-modal="true"
					aria-labelledby="mobile-menu-title"
					ref={panelRef}
					onKeyDown={handlePanelKeyDown}
					className={`absolute inset-y-0 right-0 left-0 bg-white shadow-xl transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none motion-reduce:duration-0 ${
						menuOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className="flex h-full flex-col">
						{/* Top bar with logo */}
						<div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
							<Link href="/#home" className="flex items-center" aria-label="Go to home" onClick={closeMenu}>
								<Image
									src="/images/bei-capelli-logo.png"
									alt="Bei Capelli Logo"
									width={110}
									height={26}
									className="h-auto w-[110px] object-contain"
								/>
							</Link>
							<Button
								asChild
								variant="outline"
								size="icon"
								className="size-10 rounded-md border-black/10 bg-white text-black shadow-sm transition hover:bg-gray-50 focus:ring-black/40"
							>
								<button
									ref={closeBtnRef}
									type="button"
									onClick={closeMenu}
									aria-label="Close menu"
								>
									<svg
										className="h-5 w-5"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
									</svg>
								</button>
							</Button>
						</div>

						{/* Centered Links */}
						<nav className="flex-1 px-6 py-6 flex ">
							<div className="w-full">
							<ul className="space-y-6 text-xl text-center">
								<li>
									<Link
										href="/#home"
										className="block py-2 text-gray-900 hover:text-gray-600"
										onClick={closeMenu}
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href="/#team-members"
										className="block py-2 text-gray-900 hover:text-gray-600"
										onClick={closeMenu}
									>
										Team Members
									</Link>
								</li>
								<li>
									<Link
										href="/#services"
										className="block py-2 text-gray-900 hover:text-gray-600"
										onClick={closeMenu}
									>
										Services
									</Link>
								</li>
								<li>
									<Link
										href="/#results"
										className="block py-2 text-gray-900 hover:text-gray-600"
										onClick={closeMenu}
									>
										Results
									</Link>
								</li>
								<li>
									<Link
										href="/#products"
										className="block py-2 text-gray-900 hover:text-gray-600"
										onClick={closeMenu}
									>
										Products
									</Link>
								</li>
								<li>
									<Link
										href="/#reviews"
										className="block py-2 text-gray-900 hover:text-gray-600"
										onClick={closeMenu}
									>
										Reviews
									</Link>
								</li>
								<li>
									<Link
										href="/#contact"
										className="block py-2 text-gray-900 hover:text-gray-600"
										onClick={closeMenu}
									>
										Contact
									</Link>
								</li>
							</ul>
							<div className="mt-6 flex justify-center">
								<Button
									onClick={closeMenu}
									variant="outline"
									className="border-black text-black bg-[#E6E4E1] hover:bg-black hover:text-white transition-colors rounded-none px-5 py-3"
								>
									Book now
								</Button>
							</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	)
}
