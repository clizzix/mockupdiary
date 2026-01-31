import React from 'react';
import EntryModal from './EntryModal';

const Card = ({ entry, onDelete, onUpdate }) => {
    const handleDelete = () => {
        onDelete(entry.id);
    };
    return (
        <div className="card bg-base-100 w-full sm:w-96 shadow-md">
            <figure className="h-56">
                <img
                    src={entry.img}
                    alt="Diary Entry Cover"
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-accent font-bold text-xl">
                    {entry.title}
                </h2>
                <p>{entry.date}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-outline btn-primary hover:bg-hover"
                        onClick={() =>
                            document
                                .getElementById(`modal_${entry.id}`)
                                .showModal()
                        }
                    >
                        View Entry
                    </button>
                    <dialog id={`modal_${entry.id}`} className="modal">
                        <div className="modal-box flex flex-col gap-4">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <img src={entry.img} className="rounded-md mt-4" />
                            <h3 className="font-bold text-2xl text-accent">
                                {entry.title}
                            </h3>
                            <h4>{entry.date}</h4>
                            <p>{entry.text}</p>
                            <div className="flex justify-between">
                                <button
                                    className="btn btn-outline btn-primary"
                                    onClick={() => {
                                        document
                                            .getElementById(`modal_${entry.id}`)
                                            .close();
                                        document
                                            .getElementById(
                                                `edit_modal_${entry.id}`,
                                            )
                                            .showModal();
                                    }}
                                >
                                    Edit Entry
                                </button>
                                <button
                                    className="btn bg-red-500"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </dialog>
                    <dialog id={`edit_modal_${entry.id}`} className="modal">
                        <EntryModal
                            entryToEdit={entry}
                            onUpdateEntry={onUpdate}
                        />
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default Card;
