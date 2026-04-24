// TypeScript declarations for @zumer/orbit web components
// These are custom HTML elements — React needs explicit JSX types for them.

declare namespace JSX {
  interface IntrinsicElements {
    'o-progress': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        value?: number | string;
        max?: number | string;
        shape?: 'circle' | 'circle-a' | 'circle-b' | 'arrow' | 'bullet' | 'rounded' | 'slash' | 'backslash' | 'zigzag' | 'none';
      },
      HTMLElement
    >;
    'o-arc': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
