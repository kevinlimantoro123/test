import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function CreateEventButton() {
    const { setShowEventModel } = useContext(GlobalContext);

    return (
        <button onClick={() => setShowEventModel(true)} className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
            <span className="">Create</span>
        </button>
    )
}