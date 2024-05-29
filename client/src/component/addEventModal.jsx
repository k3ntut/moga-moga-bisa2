import React, { useState } from "react";
import Modal from 'react-modal';
import DateTime from 'react-datetime';

Modal.setAppElement('#root'); // Ensure this is called to handle accessibility

export default function AddEventModal({ isOpen, onClose, onEventAdded }) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdded({
            title, 
            start: new Date(start), // Convert to JavaScript Date object
            end: new Date(end)      // Convert to JavaScript Date object
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <div>
                    <label>Start Date</label>
                    <DateTime 
                        value={start} 
                        onChange={date => setStart(date.toDate())} // Ensure the date is a JavaScript Date object
                    />
                </div>

                <div>
                    <label>End Date</label>
                    <DateTime 
                        value={end} 
                        onChange={date => setEnd(date.toDate())} // Ensure the date is a JavaScript Date object
                    />
                </div>

                <button type="submit">Add Event</button>
            </form>
        </Modal>
    );
}
