"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FloatingArrow, FloatingOverlay, arrow, autoPlacement, autoUpdate, offset, shift, useFloating } from "@floating-ui/react"
import { Slot } from "@radix-ui/react-slot"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

export interface TourStep {
  target: string
  step: React.ReactNode
}

interface UseTourProps {
  steps: TourStep[]
  onFinish?: () => void
  isOpen?: boolean
  onClose?: () => void
}

export function useTour({ steps, onFinish, isOpen, onClose }: UseTourProps) {
  const [currentStep, setCurrentStep] = useState<number | null>(isOpen ? 0 : null)
  const arrowRef = useRef(null)

  const { elements, refs, floatingStyles, update, context } = useFloating({
    middleware: [offset(10), shift(), autoPlacement(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
    } else {
      setCurrentStep(null)
    }
  }, [isOpen])

  const startTour = useCallback(() => {
    setCurrentStep(0)
  }, [])

  const endTour = useCallback(() => {
    setCurrentStep(null)
    onClose?.()
  }, [onClose])

  useEffect(() => {
    if (currentStep === null || steps.length === 0 || !steps[currentStep]) return
    const target = document.querySelector(`.${steps[currentStep].target}`)

    if (target instanceof HTMLElement) {
      refs.setReference(target)
      update()
      target.scrollIntoView({ behavior: "smooth", block: "center" })
    } else {
      console.warn(`Tour target not found: ${steps[currentStep].target}`)
      endTour()
    }
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") endTour()
    }
    document.addEventListener("keydown", listener)
    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [currentStep, update, endTour, steps, refs])

  const nextStep = useCallback(() => {
    if (currentStep !== null && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      endTour()
      onFinish?.()
    }
  }, [currentStep, steps.length, endTour, onFinish])

  const prevStep = useCallback(() => {
    if (currentStep !== null && currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  return {
    isEnabled: currentStep !== null,
    currentStep: currentStep ?? 0,
    currentTarget: elements.reference,
    steps,
    startTour,
    endTour,
    nextStep,
    prevStep,
    isLastStep: currentStep === steps.length - 1,
    floatingProps: { ref: refs.setFloating, style: floatingStyles },
    refs,
    arrowRef,
    context,
    step: steps[currentStep ?? 0]!,
  }
}

export function TourTrigger({
  asChild,
  ...props
}: { children: React.ReactNode; asChild?: boolean } & React.ComponentProps<"button">) {
  const tour = useTourContext()
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      {...props}
      onClick={(event) => {
        if (!event.defaultPrevented) {
          tour?.startTour()
        }
      }}
    />
  )
}

const TourContext = createContext<ReturnType<typeof useTour> | null>(null)

export function Tour({
  children,
  steps,
  onFinish,
  isEnabled,
  onClose,
}: {
  children: React.ReactNode
  steps: TourStep[]
  onFinish?: () => void
  isEnabled?: boolean
  onClose?: () => void
}) {
  const tour = useTour(useMemo(() => ({ steps, onFinish, isEnabled, onClose }), [steps, onFinish, isEnabled, onClose]))
  return <TourContext.Provider value={tour}>{children}</TourContext.Provider>
}

export function useTourContext() {
  const tour = useContext(TourContext)
  if (!tour) throw new Error("useTourContext must be used within a Tour component")
  return tour
}

export function TourOverlay() {
  const tour = useTourContext()
  if (!tour.isEnabled) return null
  const rect = tour.currentTarget?.getBoundingClientRect()
  return (
    <FloatingOverlay className="z-[9997]" onClick={tour.endTour} lockScroll>
      <div
        className="absolute bg-transparent rounded"
        style={{
          top: (rect?.top ?? 0) - 4,
          left: (rect?.left ?? 0) - 4,
          width: (rect?.width ?? 0) + 8,
          height: (rect?.height ?? 0) + 8,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
        }}
      />
    </FloatingOverlay>
  )
}

export function TourArrow({ className }: { className?: string }) {
  const tour = useTourContext()
  return (
    <FloatingArrow
      ref={tour.arrowRef}
      context={tour.context}
      className={cn("fill-popover [&>path:first-of-type]:stroke-border [&>path:last-of-type]:stroke-border", className)}
    />
  )
}

export function TourContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const tour = useTourContext()
  if (!tour.isEnabled) return null
  return (
    <Card className={cn("max-w-sm z-[9998]", className)} {...tour.floatingProps}>
      {children}
    </Card>
  )
}

export function TourStep({ className }: { className?: string }) {
  const tour = useTourContext()
  return <CardContent className={cn("p-4", className)}>{tour.step.step}</CardContent>
}

export function TourFooter() {
  const tour = useTourContext()
  return (
    <CardFooter className="flex items-center justify-between p-3">
      <div className="flex-1">
        <Button size="sm" variant="secondary" onClick={tour.prevStep} disabled={tour.currentStep === 0}>
          Previous
        </Button>
      </div>
      <div className="flex flex-1 justify-center gap-1">
        {tour.steps.map(({ target }, index) => (
          <div
            key={`${target}-${index}`}
            className={`w-2 h-2 rounded-full ${index === tour.currentStep ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
      <div className="flex-1 flex justify-end">
        <Button size="sm" onClick={tour.nextStep}>
          {tour.isLastStep ? "Finish" : "Next"}
        </Button>
      </div>
    </CardFooter>
  )
}
