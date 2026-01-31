import React, { useState, useEffect } from 'react';

const EntryModal = ({ onAddEntry, onUpdateEntry, entryToEdit }) => {
    const [formData, setFormData] = useState({
        img: '',
        title: '',
        date: '',
        text: '',
    });

    useEffect(() => {
        if (entryToEdit) {
            setFormData({
                img: entryToEdit.img,
                title: entryToEdit.title,
                date: entryToEdit.date,
                text: entryToEdit.text,
            });
        }
    }, [entryToEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const { img, title, date, text } = formData;

        if (!img || !title || !date || !text) {
            alert('Please fill out all fields.');
            return;
        }

        const existingEntries =
            JSON.parse(localStorage.getItem('DiaryEntries')) || [];

        const alreadyExists = existingEntries.find(
            (entry) => entry.date === date && entry.id !== entryToEdit?.id,
        );

        if (alreadyExists) {
            alert(
                "You've already written an entry for this date. Maybe edit the existing one?",
            );
            return;
        }

        if (onUpdateEntry) {
            const updatedEntry = {
                ...entryToEdit,
                ...formData,
            };
            onUpdateEntry(updatedEntry);
        } else {
            const newEntry = {
                ...formData,
                id: crypto.randomUUID(),
                createdAt: Date.now(),
            };

            onAddEntry(newEntry);
            setFormData({ img: '', title: '', date: '', text: '' });
        }

        e.target.closest('dialog').close();
    };

    return (
        <div className="modal-box">
            <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col justify-center items-center gap-4"
            >
                <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={(e) => e.currentTarget.closest('dialog').close()}
                >
                    ✕
                </button>
                <input
                    type="text"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    placeholder="i.e. https://images.pexels.com/photos/60778/pexels-photo-60778.jpeg"
                    className="input bg-white text-black"
                />

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="input bg-white text-black"
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input bg-white text-black [color-scheme:light]"
                />
                <textarea
                    className="textarea bg-white text-black"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="What's on your mind today?..."
                    rows="10"
                ></textarea>
                <button className="btn bg-blue-600 hover:bg-blue-700 w-fit self-end">
                    Save
                </button>
            </form>
        </div>
    );
};

export default EntryModal;
