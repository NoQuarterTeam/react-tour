# React Tour

A simple and customizable tour guide component for React applications, using tailwindcss, shadcn/ui and [@floating-ui](https://floating-ui.com/).

## Installation

1. Copy the `tour.tsx` component into your project's components directory.

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
import { Tour, TourContent, TourFooter, TourStep, TourTrigger } from "@/components/ui/tour"
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
      <TourContent>
        <TourStep />
        <TourFooter />
      </TourContent>
    </Tour>
  )
}
```

4. Add the target class to the elements you want to highlight.

```tsx
<div className="step-1">This is step 1</div>
<div className="step-2">This is step 2</div>
```
