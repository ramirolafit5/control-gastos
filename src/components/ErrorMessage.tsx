import { ReactNode } from "react"

// Otra opcion aca es sacar el type y pasar solamente en el parametro "PropsWithChildren" y tambien funciona

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
        {children}
    </p>
  )
}
