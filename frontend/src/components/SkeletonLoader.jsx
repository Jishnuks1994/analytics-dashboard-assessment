import React from "react";

const SkeletonLoader = ({ rows = 5, cols = 4 }) => {
    return (
        <div className="animate-pulse space-y-3">
            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 p-2 gap-2">
                {[...Array(cols)].map((_, i) => (
                    <div
                        key={i}
                        className="h-20 bg-gray-200 rounded-lg"
                    ></div>
                ))}
            </div>

            {/* Charts & Table placeholders */}
            <div className="grid sm:grid-cols-2 p-2 gap-2">
                <div className="space-y-4">
                    <div className="h-60 bg-gray-200 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-40 bg-gray-200 rounded-lg"></div>
                        <div className="h-40 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
                <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
