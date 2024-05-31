import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";

export default function Day({day, rowIdx}) {
    
    const [ dayEvents, setDayEvents ] = useState([]);
    const { setDaySelected, setShowEventModel, savedEvents, setSelectedEvent } = useContext(GlobalContext);

    useEffect(() => {
        const events = savedEvents.filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === day.format("DD-MM-YYYY"));
        setDayEvents(events)
    }, [savedEvents, day]);

    function getCurrentDayClass() {
        return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
            ? "bg-blue-600 text-white rounded-full w-7"
            : "";
    }

    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div className="flex-1 cursor-pointer" onClick={() => {
                setDaySelected(day);
                setShowEventModel(true);
            }}>
                {dayEvents.map((event, id) => (
                    <div 
                        key={id}
                        onClick={() => setSelectedEvent(event)}
                        className={`bg-${event.label}-500 p-1 mr-1 ml-1 text-white text-sm rounded mb-1 truncate`}>
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    )
}