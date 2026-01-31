import React, { useState, useEffect } from 'react';

const ProfileModal = ({ currentProfile, onUpdateProfile }) => {
    const [profile, setProfile] = useState({
        img: 'https://pngtree.com/so/avatar-placeholder',
        name: '',
        status: '',
        bio: '',
    });

    useEffect(() => {
        if (currentProfile && Object.keys(currentProfile).length > 0) {
            setProfile(currentProfile);
        }
    }, [currentProfile]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { img, name, status, bio } = profile;
        if (!img || !name || !status || !bio) {
            alert('Please fill out all fields.');
            return;
        }

        onUpdateProfile(profile);

        console.log('Profile saved successfully', profile);
        alert('Profile updated successfully!');
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
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 ">
                        <img src={profile.img || undefined} />
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center gap-2">
                    <label htmlFor="img">Profile Picture</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={profile.img}
                        onChange={handleChange}
                        placeholder="Insert a URL to update your picture"
                        className="input bg-white text-black"
                    />
                </div>
                <div className="flex flex-col w-full justify-center items-center gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        placeholder="Username"
                        className="input bg-white text-black"
                    />
                </div>
                <div className="flex flex-col w-full justify-center items-center gap-2">
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={profile.status}
                        onChange={handleChange}
                        placeholder="Status"
                        className="input bg-white text-black"
                    />
                </div>
                <div className="flex flex-col w-full justify-center items-center gap-2">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        className="textarea bg-white text-black"
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        placeholder="Tell your friends about yourself!..."
                        rows="10"
                    ></textarea>
                </div>
                <button className="btn bg-blue-600 hover:bg-blue-700 w-fit self-end">
                    Save
                </button>
            </form>
        </div>
    );
};

export default ProfileModal;
