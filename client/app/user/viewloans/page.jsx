"use client"
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '@/actions/authContext';
import Link from 'next/link'


const page = () => {
    const [loans, setLoans] = useState([]);
    const { getLoansByUserId } = useContext(AuthContext);

    let user;

    if (typeof localStorage !== 'undefined') {
        user = JSON.parse(localStorage.getItem('user'));
    }

    async function getLoans() {
        const res = await getLoansByUserId(user._id);
        console.log(res);
        setLoans(res);
    }

    useEffect(() => {
        getLoans();
    }, []);
    return (
        <div className='mt-12  w-screen flex justify-items-center  justify-center'>
            <div className='w-full sm:w-4/5 lg:w-1/2 border-2 bg-gray-200 p-4 md:p-8 shadow-lg'>


                <h2 className="text-lg md:text-2xl mb-4 text-center">My Loans</h2>
                <ul>
                    {loans.map((loan) => (
                        <li
                            key={loan._id}
                            className="bg-white rounded p-4 shadow-md mb-4 flex flex-col gap-4 sm:flex-row items-center justify-between "
                        >
                            <div>
                                <p>
                                    <strong>Amount:</strong> ₹{loan.amount}
                                </p>
                            </div>
                            <div className=''>
                                <p>
                                    <strong>Term:</strong> {loan.term} weeks
                                </p>
                            </div>
                            <div className='text-center'>
                                {loan.state === 'PENDING' && (
                                    <>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            disabled={true}
                                        >
                                            PENDING
                                        </button>

                                    </>
                                )}
                                {loan.state === 'APPROVED' && (
                                    <Link href={`/user/viewloans/${loan._id}`} className="text-white px-2 py-1 rounded cursor-pointer bg-pink-500">APPROVED</Link>
                                )}
                                <div className=''>

                                    {loan.state === 'PAID' && (
                                        <p className="text-blue-500 pl-20    text-center">PAID</p>
                                    )}
                                </div>
                                {loan.state === 'REJECT' && (
                                    <p className="text-white px-2 py-1 rounded  bg-red-500">REJECTED</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul></div>
        </div>
    )
}

export default page