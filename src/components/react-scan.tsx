"use client"
// react-scan must be imported before react
import { useEffect } from "react"
// leave gap below

import { scan } from "react-scan"

export function ReactScan() {
  useEffect(() => {
    scan({ enabled: true })
  }, [])

  return <></>
}
