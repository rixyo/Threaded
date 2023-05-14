import React from 'react';
import EmptyState from '../components/EmptyState';

type TeamsProps = {
    
};

const Teams:React.FC<TeamsProps> = () => {
    
    return (
        <div className='hidden lg:block lg:pl-80 h-full'>
            <EmptyState/>
        </div>
    )
}
export default Teams;