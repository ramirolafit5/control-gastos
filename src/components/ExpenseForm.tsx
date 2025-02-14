import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    const [cantidadEstatica, setCantidadEstatica] = useState(0)

    const { state, dispatch, disponible} = useBudget()

    //en caso de que editingId cambie entonces hace esto..
    useEffect(()=>{
        if (state.editingId) {
            const editarGasto = state.expenses.filter( gastoActual => gastoActual.id === state.editingId)[0]
            setExpense(editarGasto)
            setCantidadEstatica(editarGasto.amount)
        }
    },[state.editingId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name,value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField ? Number(value) : value
        })
    }

    //trae el Value que copiamos desde la pagina donde trajimos el calendario
    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar
        if (Object.values(expense).includes('')){
            setError('Debes completar todos los campos')
            return error
        }

        //validar que no me pase del limite
        if ((expense.amount - cantidadEstatica) > disponible) {
            setError("Rechazado. El gasto supera el dinero disponible");
          
            setTimeout(() => {
              setError("");
            }, 2000);
          
            return error;
        }

        //agrega o actualiza el gasto
        //payload explain --> se crea un nuevo gasto con el id en el que estamos parado y copiamos lo demas como estaba 
        if (state.editingId){
            dispatch({type: "update-expense", payload: {expense: {id: state.editingId, ...expense}}})
            //aca tmb se podria hacer state.editingId = '' <-- para reinicar el modal dsp de editar (alfinal lo hice en reducer)
        } else {
            dispatch({type: "add-expense", payload: {expense}})
        }
        
        //esto seria para reiniciar a 0 el formulario

        /* setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        }) */

        //se puede agregar directamente modal: false en el reducer
        //dispatch({type: "close-modal"})

        setCantidadEstatica(0)
    }

    return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black bord border-b-4 border-blue-500 py-2">
            {state.editingId ? 'Modifica tu gasto' : 'Nuevo gasto'}
        </legend>

        {/* Explicacion:  */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Nombre gasto:
            </label>
            <input 
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Cantidad:
            </label>
            <input 
                type="number"
                id="amount"
                placeholder="Añade la cantidad del gasto: ej. 300"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
                Categoria:
            </label>
            <select 
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value=""> - - Seleccione - - </option>
                {categories.map(category => 
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                )}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Fecha gasto:
            </label>
            
            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />

        </div>

        <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Registrar modificacion' : 'Registrar gasto'}
        />

    </form>
  )
}
