import { createContext, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

//los datos vienen de mirar el reducer de mas abajo
type BudgetContextProps = {
    state: BudgetState
    dispatch: React.ActionDispatch<[action: BudgetActions]>,
    gastado: number,
    disponible: number

}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {
    
    
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    //esto viene del tracker
    const gastado = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0),[state.expenses])

    const disponible = state.budget - gastado

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                disponible,
                gastado
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}