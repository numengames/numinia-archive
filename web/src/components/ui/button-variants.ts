// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-accent text-background shadow hover:bg-accent/90",
				secondary:
					"bg-card text-foreground border border-border hover:bg-card-hover",
				ghost: "hover:bg-accent/10 hover:text-accent",
				outline:
					"border border-border bg-background hover:bg-accent/10 hover:text-accent",
				brand:
					"border border-accent/50 bg-accent/10 text-accent shadow-accent-sm hover:bg-accent/20 hover:border-accent",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-[6px] px-3",
				lg: "h-12 rounded-[8px] px-8 text-base",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
