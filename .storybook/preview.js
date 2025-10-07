
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      values: [
        {name: "Dark", value: "var(--main-colour-2)"}
      ],
      default: "Dark",
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;