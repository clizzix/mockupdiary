import React, { useState, useMemo } from 'react';
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

    // Search Logic
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // CRUD Logic
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

    // Timeline structure by .sort() method
    const groupedEntries = useMemo(() => {
        let filteredEntries = entries;
        if (searchTerm) {
            filteredEntries = entries.filter((entry) => {
                const term = searchTerm.toLowerCase();
                const entryDate = new Date(entry.date);
                const month = entryDate
                    .toLocaleString('default', { month: 'long' })
                    .toLowerCase();
                const year = entryDate.getFullYear().toString();
                return (
                    entry.title.toLowerCase().includes(term) ||
                    entry.date.includes(term) ||
                    month.includes(term) ||
                    year.includes(term)
                );
            });
        }

        const sortedEntries = [...filteredEntries].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
        );

        const groups = [];

        // Date destructuring
        sortedEntries.forEach((entry) => {
            const [yearStr, monthStr, dayStr] = entry.date.split('-');
            const date = new Date(yearStr, monthStr - 1, dayStr);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });

            let yearGroup = groups.find((g) => g.year === year);
            if (!yearGroup) {
                yearGroup = { year, months: [] };
                groups.push(yearGroup);
            }

            let monthGroup = yearGroup.months.find((m) => m.name === month);
            if (!monthGroup) {
                monthGroup = { name: month, entries: [] };
                yearGroup.months.push(monthGroup);
            }

            monthGroup.entries.push(entry);
        });

        return groups;
    }, [entries, searchTerm]);

    return (
        <div>
            <Header
                profile={profile}
                onUpdateProfile={updateProfile}
                handleSearch={handleSearch}
            />
            <div className="mt-8 flex flex-col gap-8">
                <Hero profile={profile} onAddEntry={handleAddEntry} />
                <div className="flex flex-col gap-8 mx-auto w-full max-w-7xl px-8 mb-8">
                    {groupedEntries.map((yearGroup) => (
                        <div
                            key={yearGroup.year}
                            className="flex flex-col gap-4"
                        >
                            <h2 className="text-4xl font-bold opacity-50 border-b-2 border-base-300 pb-2">
                                {yearGroup.year}
                            </h2>
                            {yearGroup.months.map((monthGroup) => (
                                <div
                                    key={monthGroup.name}
                                    className="flex flex-col gap-4"
                                >
                                    <h3 className="text-2xl font-semibold text-accent">
                                        {monthGroup.name}
                                    </h3>
                                    <div className="flex flex-row flex-wrap gap-4">
                                        {monthGroup.entries.map((entry) => (
                                            <Card
                                                key={entry.id}
                                                entry={entry}
                                                onDelete={handleDeleteEntry}
                                                onUpdate={updateEntry}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
