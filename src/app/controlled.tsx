"use client"

import { Button } from "@/components/ui/button"
import { Tour, TourOverlay, TourContent, TourArrow, TourStep, TourFooter } from "@/components/ui/tour"
import { WandSparklesIcon } from "lucide-react"
import { steps } from "./steps"
import { useState } from "react"

export function Controlled() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Button className="grow-0" onClick={() => setIsOpen(true)}>
        <span>Start Tour (Controlled)</span>
        <WandSparklesIcon />
      </Button>

      <Tour steps={steps} isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
