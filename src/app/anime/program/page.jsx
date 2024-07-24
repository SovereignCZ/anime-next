import React from 'react';
import "./program.scss";

const days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
const quarterHours = Array.from({ length: 96 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const programs = [
    { day: 'Pondělí', start: '10:15', duration: 45, title: 'Ranní show', image: 'image1.jpg' },
    { day: 'Pondělí', start: '10:30', duration: 60, title: 'Dopolední seriál', image: 'image2.jpg' },
    { day: 'Pondělí', start: '10:45', duration: 30, title: 'Krátký film', image: 'image3.jpg' },
    { day: 'Úterý', start: '14:30', duration: 60, title: 'Odpolední film', image: 'image4.jpg' },
    // Přidejte další pořady zde
];

const getTimeIndex = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 4 + Math.floor(minute / 15);
};

const getDurationBlocks = (duration) => {
    return Math.ceil(duration / 15);
};

const colorClasses = [
    'bg-blue-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
];

const Page = async () => {
    const getOverlappingOffset = (day, startIndex) => {
        const overlappingPrograms = programs.filter(p => p.day === day && getTimeIndex(p.start) <= startIndex && getTimeIndex(p.start) + getDurationBlocks(p.duration) > startIndex);
        return overlappingPrograms.length;
    };

    const getColorClass = (offset) => {
        return colorClasses[offset % colorClasses.length];
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-8 gap-4">
                <div className="col-span-1">
                    <div className="grid grid-rows-96 gap-2">
                        <div className="h-[2rem] flex items-center justify-center bg-gray-100"></div>
                        {quarterHours.map((time, index) => (
                            <div key={index}
                                 className="h-[2rem] flex items-center justify-center bg-gray-100">{time}</div>
                        ))}
                    </div>
                </div>
                {days.map((day) => (
                    <div key={day} className="col-span-1 relative">
                        <div className="text-center font-bold mb-2">{day}</div>
                        <div className="grid grid-rows-96 gap-2 relative">
                            {programs.filter(p => p.day === day).map(p => {
                                const startIndex = getTimeIndex(p.start);
                                const overlapOffset = getOverlappingOffset(p.day, startIndex) - 1;
                                return (
                                    <div
                                        key={p.title}
                                        className={`absolute p-2 ${getColorClass(overlapOffset)} hover:z-10 w-full`}
                                        style={{
                                            top: `${startIndex * 3}rem`,
                                            height: `${getDurationBlocks(p.duration) * 2}rem`,
                                            left: `${overlapOffset * .5}rem`,
                                        }}
                                    >
                                        <img src={p.image} alt={p.title} className="h-8 w-8 mr-2 inline-block" />
                                        <span>{p.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;