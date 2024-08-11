import React from 'react';
import './loading.css';  // Import your CSS file

export default function Loading() {
    return (
        <div className="flex justify-center items-center min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex flex-col items-center space-y-2">
                <div role="status">
                    <span className="sr-only">
                        THINKING
                        <div className="dot-animate">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    </span>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Loading your content...</span>
            </div>
        </div>
    );
}