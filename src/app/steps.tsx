import { Button } from "@/components/ui/button"
import type { TourStep } from "@/components/ui/tour"
import Link from "next/link"

export const steps = [
  {
    target: "step-1",
    step: (
      <div className="flex flex-col gap-2">
        <p>
          This is the first step of the tour. Go{" "}
          <Link target="_blank" href="https://github.com/NoQuarterTeam/react-tour" className="text-blue-500 hover:underline">
            here
          </Link>{" "}
          to read more about it.
        </p>
      </div>
    ),
  },
  {
    target: "step-2",
    step: (
      <div>
        <p>This is the second step of the tour.</p>
      </div>
    ),
  },
  {
    target: "step-3",
    step: (
      <div>
        <p>This is the third step of the tour.</p>
        <Button size="sm" variant="outline">
          Some action
        </Button>
      </div>
    ),
  },
  {
    target: "step-4",
    step: (
      <div>
        <p>This is the fourth step of the tour.</p>
      </div>
    ),
  },
  {
    target: "step-5",
    step: (
      <div>
        <p>This is the fifth step of the tour.</p>
      </div>
    ),
  },
  {
    target: "step-6",
    step: (
      <div>
        <p>This is the sixth step of the tour.</p>
        <p>Targets can be anything.</p>
      </div>
    ),
  },
] as TourStep[]
