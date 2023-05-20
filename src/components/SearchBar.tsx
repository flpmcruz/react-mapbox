import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"
import { SearchResults } from "."

export const SearchBar = () => {

    const { searchPlacesByTerm } = useContext(PlacesContext)
    const deboundRef = useRef<number>()

    const onQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {

        if (deboundRef.current) clearTimeout(deboundRef.current)

        deboundRef.current = setTimeout(() =>
            searchPlacesByTerm(e.target.value), 350)
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search..."
                className="form-control"
                onChange={onQueryChanged}
            />

            <SearchResults />
        </div>
    )
}
