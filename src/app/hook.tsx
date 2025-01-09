"use client"

import { Button } from "@/components/ui/button"
import { useTour } from "@/components/ui/tour"
import { WandSparklesIcon } from "lucide-react"
import { steps } from "./steps"

export function Hook() {
  const tour = useTour({ steps })

  return (
    <div>
      <Button className="flex-grow-0" onClick={tour.start}>
        <span>Start Tour (Hook)</span>
        <WandSparklesIcon />
      </Button>

      {tour.isEnabled && (
        <>
          <div className="inset-0 fixed bg-black/50" onClick={tour.end} onKeyDown={tour.end} />
          <div {...tour.floatingProps} className="p-2 max-w-sm rounded bg-white shadow-md">
            {tour.currentStep.step}
            <div className="flex justify-between">
              <button type="button" onClick={tour.prevStep} disabled={tour.currentStepIndex === 0}>
                Previous
              </button>
              <button type="button" onClick={tour.nextStep}>
                {tour.isLastStep ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
