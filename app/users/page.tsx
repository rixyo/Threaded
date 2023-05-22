// Date Created: 13/05/2020, 7:09:00 PM
import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {


    return(
        <div className='hidden lg:block lg:pl-80 h-full'>
            <EmptyState/>
        </div>
    )
}
export default page;