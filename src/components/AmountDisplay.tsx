type AmountDisplayProps = {
    //el "?" significa que el valor es opcional
    label?: string
    amount: number
}

export default function AmountDisplay({label, amount}: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
        
        {/* Antes era de esta forma pero nos dejaba el ":" molestando asique lo hicimos de otra {label}: {''} */}
        {label && `${label} : `}
        <span className="font-black text-black">$ {amount}</span>
    </p>
  )
}
