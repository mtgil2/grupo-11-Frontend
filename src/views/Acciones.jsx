import { useEffect } from "react"

export default function Acciones() {

  useEffect(() => {
    console.log("Acciones")
  }, [])

  return (
    <>
      <h2>Acciones compradas</h2>
    </>
  )
}