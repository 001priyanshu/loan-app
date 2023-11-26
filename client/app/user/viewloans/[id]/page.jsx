"use client"
import React, { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '@/actions/authContext';
import Link from 'next/link';

const Page = ({ params }) => {
    const [repayments, setRepayments] = useState([]);
    const { getRepaymentsByLoanId, makeRepayment } = useContext(AuthContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [remainingBalance, setRemainingBalance] = useState(0);
    const modalRef = useRef(null);   /*  jjjjjjj */

    async function fetchRepayments() {
        const res = await getRepaymentsByLoanId(params.id);
        setRepayments(res);
    }
    useEffect(() => {
        fetchRepayments();
    }, [params.id]);

    const hasPendingRepayments = repayments.some((repayment) => repayment.status === 'PENDING');



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}/${mm}/${yy}`;
    };

    const openModal = () => {
        if (hasPendingRepayments) {
            setIsModalOpen(true);
        }
    };

    useEffect(() => {
        const pendingRepaymentAmounts = repayments
            .filter((repayment) => repayment.status === 'PENDING')
            .map((repayment) => parseFloat(repayment.amount));

        const balance = pendingRepaymentAmounts.reduce((acc, amount) => acc + amount, 0);
        setRemainingBalance(balance);
    }, [repayments]);

    const closeModal = () => {
        setIsModalOpen(false);
        setPaymentAmount('');
    };

    const handlePaymentSubmit = async () => {
        const isValidAmount = repayments.some((repayment) => parseFloat(paymentAmount) >= repayment.amount);

        if (isValidAmount) {
            const res = await makeRepayment({ amount: paymentAmount, loanId: params.id });
            fetchRepayments()
            closeModal();
        } else {
            console.log('Invalid payment amount.');
        }
    };

    return (
        <div className="p-4 w-screen mt-12">
            <Link className='font-bold text-xl text-pink-300' href={'/user/dashboard'}>LOAN-APP</Link>
            <h1 className='text-center font-bold text-xl'>Balance Sheet</h1>
            <div className='w-full  flex justify-center '>
                <table className="mt-4 w-2/3 border-collapse border-2 shadow bg-gray-100 p-16">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">To Pay</th>
                            <th className="border px-4 py-2">Deadline</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repayments.map((repayment, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">{repayment.totalAmount}</td>
                                <td className="border px-4 py-2 text-center">{repayment.amount}</td>
                                <td className="border px-4 py-2 text-center">{formatDate(repayment.date)}</td>
                                <td className={`border px-4 py-2 text-center ${repayment.status === 'PENDING' ? 'text-red-500' : 'text-green-500'}`}>
                                    {repayment.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h1 className='text-center my-4'>Remaining Amount: ₹{remainingBalance.toFixed(2)}</h1>
            {hasPendingRepayments && (
                <div className='text-center'>
                    <button
                        className="bg-pink-500 hover:scale-105 transition ease-in-out transform-slow hover:bg-pink-700 text-center text-white font-bold py-2 px-4 rounded shadow"
                        onClick={openModal}
                    >
                        Repay
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="modal-bg absolute inset-0 bg-black opacity-50"></div>
                    
                        <div className="modal relative flex  flex-col justify-center items-center bg-white p-4  shadow-lg h-80 w-80 rounded-full" ref={modalRef}>
                            
                            <h2 className="text-lg font-bold mb-4 text-center">Make Repayment</h2>
                            <label className="block mb-2 text-center">
                                Repayment Amount
                                <input
                                    type="number"
                                    className="border rounded py-2 px-3 w-full"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                />
                            </label>
                            <button
                                className="bg-pink-500 hover:bg-pink-700 w-max text-white font-bold py-2 px-4 rounded shadow mt-2"
                                onClick={handlePaymentSubmit}
                            >
                                Do Repay
                            </button>
                            <span className="modal-close absolute bottom-0 mb-8 cursor-pointer" onClick={closeModal}>
                                &times;
                                close
                            </span>
                        </div>
                    </div>
                
            )}
        </div>
    );
};

export default Page;

