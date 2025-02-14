import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: "add-filter-category", payload: {id: e.target.value}})
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar gastos</label>
                    <select 
                        id="category"
                        className="bg-slate-200 p-3 flex-1 rounded"
                        onChange={handleChange}
                    >
                        <option value=""> -- Todas las categorias -- </option>
                        {categories.map(category => (
                            <option
                                value={category.id}
                                key={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
