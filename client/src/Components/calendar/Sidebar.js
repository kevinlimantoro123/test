import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <aside className='border p-5 w-64'>
            <CreateEventButton />
            <SmallCalendar />
            <div>
                <button
                    className="cursor-pointer text-gray-600 mx-2 absolute bottom-0 left-0 pl-3 pb-3"
                    onClick={() => navigate("/dashboard")}
                >
                    <span className="material-icons-outlined text-3xl">
                        home
                    </span>
                </button>
            </div>
        </aside>
    )
}