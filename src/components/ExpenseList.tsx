import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const {state} = useBudget()

    

    //esto lo creo para el filter y lo uso multiples veces para el recorrido del mismo
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

  return (
    <div className="mt-10 bg-white rounded-lg p-5 shadow-2xl">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos.</p>
                {filteredExpenses.map(expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    
                    />
                ))}
            </>
        )}
    </div>
  )
}
