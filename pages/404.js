import React from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
    const router = useRouter();
    return (
        <div>
            <img alt="" src="https://i.ibb.co/W5wdZS0/3804918.jpg"
                style={{ marginTop: 50, display: 'inline-block', maxWidth: '100%', width: 560 }} />

            <button onClick={() => router.push('/')} className='bg-red-500 mt-10 py-2 px-6 rounded-xl block mx-auto text-white text-lg'>
                Go back to home
            </button>
        </div>
    );
};

export default NotFound;