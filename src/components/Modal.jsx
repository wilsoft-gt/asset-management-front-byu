import { useEffect, useRef } from "react"

export const Modal = ({setRef, children}) => {
  const dialog = useRef()
  useEffect(() => {
    setRef(dialog.current)
  })
  return (
    <dialog className="backdrop:backdrop-blur backdrop:backdrop-brightness-75 self-center m-auto py-5 px-10 rounded shadow-md" ref={dialog}>
      {children}          
    </dialog>
  )
}