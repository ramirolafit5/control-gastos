export type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: Value
}

//ahora queremos otro type igual pero sin id
export type DraftExpense = Omit<Expense, 'id'>

//Esto viene de donde sacamos el DATE
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];