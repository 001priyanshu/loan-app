"use client"
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '@/actions/authContext';

const LoanList = ({ loans, handleAccept, handleReject }) => {
    return (
        <div className="mt-4  flex flex-col items-center bg-gray-50 ">
            <h2 className="text-2xl mb-2 text-center">Loan Status</h2>
            <ul className='w-2/3 md:w-1/2 lg:w-1/3'>
                {loans.map((loan) => (
                    <li
                        key={loan._id}
                        className="bg-white rounded p-4 shadow-md mb-4 flex items-center justify-between sm:m-5 "
                    >
                        <div>
                            <p>
                                <strong>Username:</strong> {loan.userId.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {loan.userId.email}
                            </p>
                            <p>
                                <strong>Amount:</strong> ₹{loan.amount}
                            </p>
                            <p>
                                <strong>Term:</strong> {loan.term} weeks
                            </p>
                        </div>
                        <div>
                            {loan.state === 'PENDING' && (
                                <>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                                        onClick={() => handleAccept(loan._id, "APPROVED")}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleReject(loan._id, "REJECT")}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            {loan.state === 'APPROVED' && (
                                <p className="text-green-500">Approved</p>
                            )}
                            {loan.state === 'PAID' && (
                                <p className="text-blue-500">Paid</p>
                            )}
                            {loan.state === 'REJECT' && (
                                <p className="text-red-500">Rejected</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Page = () => {
    const [loans, setLoans] = useState([]);
    const { getAllLoans, updateLoan } = useContext(AuthContext);

    async function getLoans() {
        const res = await getAllLoans();
        setLoans(res);
    }

    useEffect(() => {

        getLoans();
    }, []);

    const handleAccept = async (loanId, state) => {
        const res = await updateLoan({ loanId, state });
        await getLoans()
    };

    const handleReject =async (loanId,state) => {
        const res = await updateLoan({ loanId, state });
        await getLoans()
    };

    return (
        <div>
            <LoanList loans={loans} handleAccept={handleAccept} handleReject={handleReject} />
        </div>
    );
};

export default Page;
