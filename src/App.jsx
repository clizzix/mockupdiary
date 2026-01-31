import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';

const App = () => {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('DiaryEntries');
        return saved ? JSON.parse(saved) : [];
    });
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('profile');
        return saved ? JSON.parse(saved) : {};
    });

    const handleAddEntry = (newEntry) => {
        const updatedEntries = [newEntry, ...entries];

        setEntries(updatedEntries);

        localStorage.setItem('DiaryEntries', JSON.stringify(updatedEntries));
    };

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
        localStorage.setItem('profile', JSON.stringify(newProfile));
    };

    const handleDeleteEntry = (id) => {
        const updatedEntries = entries.filter((entry) => entry.id !== id);
        setEntries(updatedEntries);
        localStorage.setItem('DiaryEntries', JSON.stringify(updatedEntries));
    };

    const updateEntry = (updatedEntry) => {
        const updatedEntries = entries.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry,
        );
        setEntries(updatedEntries);
        localStorage.setItem('DiaryEntries', JSON.stringify(updatedEntries));
    };

    return (
        <div>
            <Header profile={profile} onUpdateProfile={updateProfile} />
            <div className="mt-8 flex flex-col gap-8">
                <Hero profile={profile} onAddEntry={handleAddEntry} />
                <div className="flex flex-wrap mx-auto">
                    <div className="m-8 flex flex-row flex-wrap justify-center gap-4">
                        {entries.map((entry) => (
                            <Card
                                key={entry.id}
                                entry={entry}
                                onDelete={handleDeleteEntry}
                                onUpdate={updateEntry}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
