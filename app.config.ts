export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate',
      success: 'emerald'
    },
    container: {
      base: 'w-full max-w-7xl mx-auto px-0 sm:px-0 lg:px-0',
    },
    button: {
      slots: {
        base: 'font-medium'
      }
    },
    drawer: {
      slots: {
        content: 'fixed max-w-4xl px-6 mx-auto lg:mb-6 flex',
      },
    },
    accordion: {
      slots: {
        root: 'w-full',
        item: 'border-b border-default last:border-b-0',
        header: 'flex',
        body: 'text-md text-muted pb-3.5',
        label: 'text-start text-lg md:text-xl lg:text-2xl font-bold break-words'
      },
    },
  },
})
