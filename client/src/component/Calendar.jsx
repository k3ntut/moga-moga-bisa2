import React, { useState, useRef } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from "./addEventModal"; // Correct capitalization
import axios from 'axios';
import moment from "moment";

export default function Calendar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    const onEventAdded = (event) => {
        console.log("Event to be added:", event);
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    };
    
    async function handleEventAdd(data) {
        try {
            await axios.post("/api/calendar/create-event", data.event);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    }

    async function handleDateSet(data) {
        try {
            const response = await axios.get(`http://localhost:5001/api/calendar/get-events?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`);
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Add Event</button>

            <div style={{ position: 'relative', zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    events = {events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd={(event) => handleEventAdd(event)}
                    datesSet={(date) => handleDateSet(date)} // Correct event name
                />
            </div>

            <AddEventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onEventAdded={event => onEventAdded(event)}
            />
        </section>
    );
}
