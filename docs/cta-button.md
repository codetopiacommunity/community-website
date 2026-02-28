# CTA Button Documentation

The `CtaButton` component (`src/components/ui/cta-button.tsx`) provides a highly customizable button component featuring the signature decorative "offset" background typical of the Codetopia design language.

It is completely polymorphic, meaning it can render as a standard `<button>` or as any other component (like a Next.js `<Link>`) while retaining all its complex styling logic.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `className` | `string` | `undefined` | Classes applied directly to the button element (foreground). You can pass standard Tailwind text and background colors here to easily reskin it. |
| `offsetClassName` | `string` | `undefined` | Classes applied to the decorative offset div behind the button. Useful for changing the drop-shadow color or making it hidden on mobile. |
| `wrapperClassName` | `string` | `undefined` | Space-separated CSS classes extending the parent `div` that wraps the offset element and the actual button. |
| `asChild` | `boolean` | `false` | When true, passes the styles to its immediate child rather than rendering a `<button>`. Essential for creating styled text links instead of actual buttons. |

## Usage Examples

### Custom Styled Button
You can quickly apply your own colors to the foreground block and the background offset block.
```tsx
import { CtaButton } from "@/components/ui/cta-button";

<CtaButton 
  className="bg-white text-black hover:bg-zinc-200"
  offsetClassName="bg-zinc-700 hidden sm:block"
>
  JOIN OUR COMMUNITY
</CtaButton>
```

### Using as a Next.js Link
Because this component implements Radix UI's `Slot`, you can pass the `asChild` prop to render it as another component, such as a navigational `Link`, instead of a standard `button` element.
```tsx
import Link from "next/link";
import { CtaButton } from "@/components/ui/cta-button";

<CtaButton 
  asChild 
  className="bg-purple-600 text-white hover:bg-purple-700" 
  offsetClassName="bg-purple-900"
>
  <Link href="/about">
    READ MORE ABOUT US
  </Link>
</CtaButton>
```

### Complex Outlined Buttons
You can use standard Tailwind classes to create borders and outlined variations of the CTA button since it is fully customizable through classes.
```tsx
import { CtaButton } from "@/components/ui/cta-button";

<CtaButton
  className="border-zinc-600 text-white hover:bg-zinc-900 border-[1px] sm:border-2 !bg-transparent border-solid !px-10"
  offsetClassName="border-zinc-600 hidden sm:block"
>
  LEARN MORE
</CtaButton>
```

