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

export function useTour(props: UseTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(props.isOpen ? 0 : null)
  const arrowRef = useRef(null)

  const { elements, refs, floatingStyles, context } = useFloating({
    middleware: [offset(10), shift(), autoPlacement(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  const isEnabled = currentStepIndex !== null
  const currentStep = isEnabled ? props.steps[currentStepIndex] : undefined
  const target = currentStep?.target

  useEffect(() => {
    if (props.isOpen) {
      setCurrentStepIndex(0)
    } else {
      setCurrentStepIndex(null)
    }
  }, [props.isOpen])

  const start = useCallback(() => {
    setCurrentStepIndex(0)
  }, [])

  const end = useCallback(() => {
    setCurrentStepIndex(null)
    props.onClose?.()
  }, [props.onClose])

  useEffect(() => {
    if (!isEnabled || !target) return
    const targetElement = document.querySelector(`.${target}`)

    if (targetElement instanceof HTMLElement) {
      refs.setReference(targetElement)
      try {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
      } catch (error) {
        console.warn("Failed to scroll to target element:", error)
      }
    } else {
      console.warn(`Tour target not found: ${target}`)
      end()
    }
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") end()
    }
    document.addEventListener("keydown", listener)
    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [end, refs, target, isEnabled])

  const nextStep = useCallback(() => {
    if (currentStepIndex !== null && currentStepIndex < props.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      end()
      props.onFinish?.()
    }
  }, [currentStepIndex, props.steps.length, end, props.onFinish])

  const prevStep = useCallback(() => {
    if (currentStepIndex !== null && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }, [currentStepIndex])

  return {
    arrowRef,
    context,
    currentStep,
    currentStepIndex: currentStepIndex ?? 0,
    currentTarget: elements.reference,
    end,
    floatingProps: { ref: refs.setFloating, style: floatingStyles },
    isEnabled,
    isLastStep: currentStepIndex === (props.steps.length ?? 0) - 1,
    nextStep,
    prevStep,
    refs,
    start,
    steps: props.steps,
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
        if (!event.defaultPrevented) tour?.start()
      }}
    />
  )
}

const TourContext = createContext<ReturnType<typeof useTour> | null>(null)

export function Tour({ children, steps, onFinish, isOpen, onClose }: { children: React.ReactNode } & UseTourProps) {
  const tour = useTour(useMemo(() => ({ steps, onFinish, isOpen, onClose }), [steps, onFinish, isOpen, onClose]))
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
    <FloatingOverlay className="z-9997" onClick={tour.end} lockScroll={false}>
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
    <Card className={cn("max-w-sm z-9998", className)} {...tour.floatingProps}>
      {children}
    </Card>
  )
}

export function TourStep({ className }: { className?: string }) {
  const tour = useTourContext()
  if (!tour.currentStep) return null
  return <CardContent className={cn("p-4", className)}>{tour.currentStep.step}</CardContent>
}

export function TourFooter() {
  const tour = useTourContext()
  return (
    <CardFooter className="flex items-center justify-between p-3">
      <div className="flex-1">
        <Button size="sm" variant="secondary" onClick={tour.prevStep} disabled={tour.currentStepIndex === 0}>
          Previous
        </Button>
      </div>
      <div className="flex flex-1 justify-center gap-1">
        {tour.steps.map(({ target }, index) => (
          <div
            key={`${target}-${index}`}
            className={`w-2 h-2 rounded-full ${index === tour.currentStepIndex ? "bg-primary" : "bg-muted"}`}
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
