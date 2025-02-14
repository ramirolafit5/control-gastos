import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const {state, dispatch, gastado, disponible} = useBudget()

    const canRestartApp = () => useMemo(() => state.expenses.length > 0, [state.expenses])

    const porcentaje = +((gastado / state.budget) * 100).toFixed(2) //solo 2 decimales

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje=== 100 ? '#DC2626' : '#3b82f6',
                        trailColor: '#F5F5F5',
                        textSize: 8,
                        textColor: porcentaje=== 100 ? '#DC2626' : '#3b82f6'
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg disabled:opacity-10"
                    disabled={!canRestartApp}
                    onClick={() => dispatch({type: "reset-app"})}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Disponible"
                    amount={disponible}
                />

                <AmountDisplay
                    label="Gastado"
                    amount={gastado}
                />
            </div>
        </div>
    )
}
