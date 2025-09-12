import clsx from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to combine class names with clsx and resolve Tailwind conflicts using twMerge.
 * Matches shadcn `cn` helper behavior.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs))
}

export default cn
