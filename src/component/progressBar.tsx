import React from 'react';

interface ProgressBarProps {
  width: number; 
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ width }) => {
  return (
    <div className="w-full my-4"> {/* Ensure the container uses full width */}
      <div className="flex mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5"> {/* Use w-full to allow expansion */}
          <div
            className="h-2.5 bg-blue-600 rounded-full"
            style={{ width: `${width}%` }} // Ensure width is a string with a '%' sign
          />
        </div>
      </div>
    </div>
  );
};
