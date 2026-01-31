import React from 'react';
import EntryModal from './EntryModal';

const Hero = ({ onAddEntry, profile }) => {
    return (
        <div className="flex flex-wrap justify-evenly items-center gap-8">
            <div className="flex flex-col justify-evenly items-center gap-8">
                <h2 className="text-[clamp(2rem,12vw,4rem)] font-bold">
                    Welcome,{' '}
                    <span className="text-accent font-bold text-[clamp(2rem,12vw,4rem)]">
                        {profile.name}
                    </span>
                    ...
                </h2>
                <p className="font-semibold">What's on your mind today?</p>
                <button
                    className="btn btn-outline btn-primary hover:bg-hover"
                    onClick={() =>
                        document.getElementById('my_modal_3').showModal()
                    }
                >
                    Add Entry
                </button>
                <dialog id="my_modal_3" className="modal">
                    <EntryModal onAddEntry={onAddEntry} />
                </dialog>
            </div>
            <div className="space-y-8 flex flex-col justify-center items-center">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-48 rounded-full ring-2 ring-offset-2">
                        <img src={profile.img} />
                    </div>
                </div>
                {profile.status && (
                    <div className="chat-bubble italic bg-white text-black text-sm text-center">
                        "{profile.status}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
