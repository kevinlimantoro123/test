import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function EventModel() {
  const {setShowEventModel, daySelected, selectedEvent, setSelectedEvent} = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : "blue"
  );
  const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
    };
    if (selectedEvent) {
      try {
        const event_id = Number(selectedEvent.id);
        const res = await fetch("http://localhost:5000/calendar/events/" + event_id, {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        await res.json();
        setSelectedEvent(null);
        setShowEventModel(false);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      try {
        const res = await fetch("http://localhost:5000/calendar/events", {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        await res.json();
        setSelectedEvent(null);
        setShowEventModel(false);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function handleDelete() {
    try {
      const event_id = Number(selectedEvent.id);
      const res = await fetch("http://localhost:5000/calendar/events/" + event_id, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      await res.json()
      setSelectedEvent(null);
      setShowEventModel(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {handleDelete()}}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => {
                setShowEventModel(false);
                setSelectedEvent(null);
              }}>
              <span className="material-icons-outlined text-gray-400 cursor-pointer">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="title"
              placeholder="Description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !title? true : false
            }
            className={!title
              ? "bg-gray-300 px-6 py-2 rounded text-white" 
              : "bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
