import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				luxury: {
					gold: 'hsl(var(--luxury-gold))',
					'gold-dark': 'hsl(var(--luxury-gold-dark))',
					platinum: 'hsl(var(--luxury-platinum))',
					charcoal: 'hsl(var(--luxury-charcoal))',
					black: 'hsl(var(--luxury-black))',
					white: 'hsl(var(--luxury-white))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-luxury': 'var(--gradient-luxury)',
				'gradient-premium': 'var(--gradient-premium)',
				'gradient-dark': 'var(--gradient-dark)',
				'gradient-glow': 'var(--gradient-glow)'
			},
			boxShadow: {
				'luxury': 'var(--shadow-luxury)',
				'premium': 'var(--shadow-premium)',
				'glow': 'var(--shadow-glow)'
			},
			fontFamily: {
				'luxury': ['var(--font-luxury)'],
				'elegant': ['var(--font-elegant)']
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'luxury-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--luxury-gold) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--luxury-gold) / 0.6), 0 0 60px hsl(var(--luxury-gold) / 0.4)'
					}
				},
				'elegant-slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'luxury-shimmer': {
					'0%': {
						backgroundPosition: '-200% center'
					},
					'100%': {
						backgroundPosition: '200% center'
					}
				},
				'premium-float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'luxury-glow': 'luxury-glow 3s ease-in-out infinite',
				'elegant-slide-up': 'elegant-slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'luxury-shimmer': 'luxury-shimmer 3s linear infinite',
				'premium-float': 'premium-float 6s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
