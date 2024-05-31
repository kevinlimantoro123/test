import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModel, setShowEventModel] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [savedEvents, setSavedEvents] = useState([]);

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth);
        }
    }, [smallCalendarMonth]);

    async function getAllEvents() {
        try {
            const res = await fetch("http://localhost:5000/calendar", {
              method: "POST",
              headers: { token: localStorage.token },
            });
            const parseRes = await res.json();
            setSavedEvents(parseRes);
          } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getAllEvents();
    }, [showEventModel]);

    return (
        <GlobalContext.Provider value = {{ 
            monthIndex, 
            setMonthIndex, 
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModel, 
            setShowEventModel,
            selectedEvent,
            setSelectedEvent,
            savedEvents }}>
            {props.children}
        </GlobalContext.Provider>
    )
}