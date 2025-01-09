# React Tour

A simple and customizable tour guide component for React applications, using shadcn/ui and [@floating-ui](https://floating-ui.com/).

## Installation

1. Copy the [`tour.tsx`](src/components/ui/tour.tsx) component into your project's components directory.

2. Install the required dependencies:

```bash
npm install @floating-ui/react @radix-ui/react-slot
```
```bash
pnpm install @floating-ui/react @radix-ui/react-slot
```
```bash
bun install @floating-ui/react @radix-ui/react-slot
```

3. Import the `Tour` component into your project and use it as needed.

```tsx
import { Tour, TourContent, TourOverlay, TourFooter, TourArrow, TourStep, TourTrigger } from "@/components/ui/tour"
import { Button } from "@/components/ui/button"

function App() {
  return (
    <Tour
      steps={[
        { target: "step-1", step: <div>This is step 1</div> },
        { target: "step-2", step: <div>This is step 2</div> },
      ]}
    >
      <TourTrigger asChild>
        <Button>Start Tour</Button>
      </TourTrigger>
      <TourOverlay />
      <TourContent>
        <TourArrow />
        <TourStep />
        <TourFooter />
      </TourContent>
    </Tour>
  )
}
```

If you want to control the tour from outside the component, you can use the `isOpen` prop and the `onClose` callback.

```tsx
import { Tour, TourContent, TourOverlay, TourFooter, TourArrow, TourStep } from "@/components/ui/tour"
import { Button } from "@/components/ui/button"

function App() {
  const [isTourOpen, setIsTourOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsTourOpen(true)}>Start Tour</Button>
      <Tour steps={steps} isOpen={isTourOpen} onClose={() => setIsTourOpen(false)}>
        <TourOverlay />
        <TourContent>
          <TourArrow />
          <TourStep />
          <TourFooter />
        </TourContent>
      </Tour>
    </div>
  )
}
```

4. Add the target class to the elements you want to highlight.

```html
<div className="step-1">This is step 1</div>
<div className="step-2">This is step 2</div>
```

5. Customize the tour component as needed.

The tour component uses shadcn/ui components, but feel free to render whatever you want and style however.
