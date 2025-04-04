import { useRef } from "react"

export const Modal = ({setRef, children}) => {
  const dialog = useRef()
  setRef(dialog.current)
  return (
    <dialog className="backdrop:backdrop-blur backdrop:backdrop-brightness-75 self-center m-auto py-5 px-10 rounded" ref={dialog}>
      {children}          
    </dialog>
  )
}