// eslint.config.ts
import { createConfigForNuxt } from '@nuxt/eslint-config'
import type { Linter } from 'eslint'

// You can define custom options for the Nuxt config if needed
const nuxtConfigOptions = {
  features: {
    stylistic: true, // Example: enable stylistic rules
  },
  // Add other options here
}

// Your custom ESLint rules can be defined separately
const customRules: Linter.FlatConfig[] = [
  {
    // These rules will be appended to the Nuxt config
    rules: {
      'no-console': 'warn',
      // Add any other custom rules here
    },
  },
]

// The createConfigForNuxt function returns a chainable composer instance
export default createConfigForNuxt(nuxtConfigOptions)
  .append(...customRules)