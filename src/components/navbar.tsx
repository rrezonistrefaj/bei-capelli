import { Button } from "@/components/ui/button"
import React from "react"

export default function Navbar() {
	return (
		<header className="flex items-center justify-between py-6 max-w-[1265px] mx-auto">
			<div className="text-xl font-medium tracking-wider text-black">BEI CAPELLI</div>

			<nav className="hidden md:flex items-center space-x-8">
				<a href="#" className="text-black hover:text-gray-600 transition-colors">
					Home
				</a>
				<a href="#" className="text-black hover:text-gray-600 transition-colors">
					Team Members
				</a>
				<a href="#" className="text-black hover:text-gray-600 transition-colors">
					Services
				</a>
				<a href="#" className="text-black hover:text-gray-600 transition-colors">
					Results
				</a>
				<a href="#" className="text-black hover:text-gray-600 transition-colors">
					Products
				</a>
				<a href="#" className="text-black hover:text-gray-600 transition-colors">
					Reviews
				</a>
				<a href="#" className="text-black hover:text-gray-600 transition-colors">
					Contact
				</a>
			</nav>

			<Button
				variant="outline"
				className="border-black text-black hover:bg-black hover:text-white transition-colors bg-transparent rounded-none"
			>
				Book now
			</Button>
		</header>
	)
}
