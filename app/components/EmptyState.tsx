// Date Created: 13/05/2020, 7:09:00 PM
import React from 'react';

type EmptyStateProps = {
    
};

const EmptyState:React.FC<EmptyStateProps> = () => {
    
    return (
        <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100'>
            <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-semibold text-gray-900'>Select a chat or start a conversation</h1>
            </div>
        </div>
    )
}
export default EmptyState;