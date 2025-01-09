import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Tour, TourContent, TourFooter, TourStep, TourTrigger } from "@/components/ui/tour"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react"

const steps = [
  {
    target: "step-1",
    step: (
      <div className="flex flex-col gap-2">
        <p>
          This is the first step of the tour. Go{" "}
          <Link href="/" className="text-blue-500 hover:underline">
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
      </div>
    ),
  },
] as TourStep[]

export default function Page() {
  return (
    <div className="flex gap-4 flex-col pt-20 max-w-3xl mx-auto h-[2000px]">
      <h1 className="text-4xl font-bold">Welcome to React Tour</h1>
      <div>
        <Tour steps={steps}>
          <TourTrigger asChild>
            <Button variant="outline" className="flex-grow-0">
              Start Tour
            </Button>
          </TourTrigger>
          <TourContent>
            <TourStep />
            <TourFooter />
          </TourContent>
        </Tour>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="step-1">
          <CardHeader>
            <CardTitle>Step 1</CardTitle>
            <CardDescription>This is the first step of the tour</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the first step of the tour</p>
          </CardContent>
        </Card>
        <Card className="step-2">
          <CardHeader>
            <CardTitle>Step 2</CardTitle>
            <CardDescription>This is the second step of the tour</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the second step of the tour</p>
          </CardContent>
        </Card>
        <Card className="step-3">
          <CardHeader>
            <CardTitle>Step 3</CardTitle>
            <CardDescription>This is the third step of the tour</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the third step of the tour</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="step-6">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="pt-[500px]">
        <Card className="step-4">
          <CardHeader>
            <CardTitle>Step 4</CardTitle>
            <CardDescription>This is the fourth step of the tour</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the fourth step of the tour</p>
          </CardContent>
        </Card>
      </div>
      <div className="pt-[500px]">
        <Card className="step-5">
          <CardHeader>
            <CardTitle>Step 5</CardTitle>
            <CardDescription>This is the fifth step of the tour</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the fifth step of the tour</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
