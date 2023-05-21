import { useContext } from 'react';
import { MapContext } from '../context';

export const ComboStyle = () => {
    const { updateStyle } = useContext(MapContext)
    return (
        <select
            className="form-control"
            onChange={(e) => updateStyle(e.target.value)}
        >
            <option value="streets-v12">streets-v12</option>
            <option value="light-v10">light-v10</option>
            <option value="streets-v11">streets-v11</option>
            <option value="outdoors-v11">outdoors-v11</option>
            <option value="satellite-v9">satellite-v9</option>
            <option value="satellite-streets-v11">satellite-streets-v11</option>
            <option value="navigation-day-v1">navigation-day-v1</option>
        </select>
    )
}
