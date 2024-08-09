import { useEffect, useState } from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function DailyAlerts( {refresh} ) {
    const userName = localStorage.getItem("username");
    const [features, setFeatures] = useState([
        {
            name: 'Alert1',
            description: 'Loading...',
            icon: CloudArrowUpIcon,
        },
        {
            name: 'Alert2',
            description: 'Loading...',
            icon: LockClosedIcon,
        },
        {
            name: 'Alert3',
            description: 'Loading...',
            icon: ArrowPathIcon,
        },
        {
            name: 'Alert4',
            description: 'Loading...',
            icon: FingerPrintIcon,
        },
    ]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                console.log('Fetching recommendations for user:', userName); // Debugging
                const response = await fetch(`http://localhost:12000/daily-rec?userName=${userName}`);
                const data = await response.json();
                
                // Check if response has the expected fields
                const recommendations = [
                    data.rec1 || 'Loading...',
                    data.rec2 || 'Loading...',
                    data.rec3 || 'Loading...',
                    data.rec4 || 'Loading...',
                ];

                // Map the recommendations to the features
                const updatedFeatures = features.map((feature, index) => ({
                    ...feature,
                    description: recommendations[index],
                }));

                setFeatures(updatedFeatures);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [userName,refresh]);

    return (
        <div className="flex items-center justify-center m-10">
            <div className="bg-slate-700 w-[600px] h-[400px] p-6 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-sm font-semibold leading-6 text-cyan-500">Daily Recommendations</h2>
                    <p className="mt-2 text-lg font-bold tracking-tight text-white">
                        Recommendations Based on your Daily Expenditure
                    </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-10">
                            <dt className="text-sm font-semibold leading-6 text-white">
                                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600">
                                    <feature.icon aria-hidden="true" className="h-5 w-5 text-white" />
                                </div>
                                {feature.name}
                            </dt>
                            <dd className="mt-1 text-xs leading-5 text-green-500">{feature.description}</dd>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
