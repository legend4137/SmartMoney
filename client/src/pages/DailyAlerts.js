import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const MarkdownRenderer = ({ content }) => {
    return (
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    );
  };

export default function DailyAlerts( {refresh} ) {
    const userName = localStorage.getItem("username");
    const [data, setData] = useState(" ");
    const [features, setFeatures] = useState([
        {
            name: 'Alert 1',
            description: 'Loading...',
            icon: CloudArrowUpIcon,
        },
        {
            name: 'Alert 2',
            description: 'Loading...',
            icon: LockClosedIcon,
        },
        {
            name: 'Alert 3',
            description: 'Loading...',
            icon: ArrowPathIcon,
        },
        {
            name: 'Alert 4',
            description: 'Loading...',
            icon: FingerPrintIcon,
        },
    ]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`http://localhost:12000/get_account`, {
                    params: {
                      userName: userName
                    }
                });
                
                if (response.data && response.data.data) {
                    const fetchedData = response.data.data;
                    setData(response.data.data);
                    // Create the recommendations array based on fetched data
                    const recommendations = [
                        fetchedData.dailyrec1 || 'Loading...',
                        fetchedData.dailyrec2 || 'Loading...',
                        fetchedData.dailyrec3 || 'Loading...',
                        fetchedData.dailyrec4 || 'Loading...',
                    ];
                    
                    // Map the recommendations to the features
                    const updatedFeatures = features.map((feature, index) => ({
                        ...feature,
                        description: recommendations[index],
                    }));
                    
                    setFeatures(updatedFeatures);
                } else {
                    console.error("Invalid data structure in response.");
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };
    
        fetchRecommendations();
    }, [userName, refresh, features]);

    return (
        <div className="flex items-center justify-center m-10">
            <div className="bg-slate-700 w-[800px] h-[500px] p-6 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-xl font-semibold leading-6 text-[#fbf778]">Daily Recommendations</h2>
                    <p className="mt-2 text-xl font-bold tracking-tight text-white">
                        Recommendations Based on your Daily Expenditure
                    </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-10">
                            <dt className="text-lg font-semibold leading-6 text-white">
                                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600">
                                    <feature.icon aria-hidden="true" className="h-5 w-5 text-white" />
                                </div>
                                {feature.name}
                            </dt>
                            <dd className="mt-1 text-lg leading-5 text-gray-200"><MarkdownRenderer content={feature.description}/></dd>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
