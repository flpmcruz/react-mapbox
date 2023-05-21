import { ChangeEvent, useContext, useRef, useState } from "react"

import { PlacesContext } from "../context"
import { SearchResults } from "."

export const SearchBar = () => {
    const [show, setShow] = useState(true)
    const [query, setQuery] = useState('')

    const { searchPlacesByTerm } = useContext(PlacesContext)
    const deboundRef = useRef<number>()

    const onQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)

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
            {show && <SearchResults />}

            {query.length > 0 && (
                <p
                    className="text-primary query"
                    onClick={() => setShow(!show)}
                >
                    {show ? "Hide" : "Show"}
                </p>
            )}
        </div>
    )
}
