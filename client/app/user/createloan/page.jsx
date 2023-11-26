"use client"
import { useState,useContext } from 'react';
import AuthContext from '@/actions/authContext';
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'

const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [term, setTerm] = useState('');
    const [installments, setInstallments] = useState([]);
    const [showPayments, setShowPayments] = useState(false);
    const {createLoan,user} = useContext(AuthContext);
    const [loading,setLoading] = useState(false)
    const router = useRouter();

    const handleApply = async ()=>{
        try{
            setLoading(true);
           const response = await createLoan({amount:loanAmount,term,repayments:installments,userId:user._id});
           router.push('/user/dashboard');
           setLoading(false);
        }
        catch{
            
        }
    }


    const calculateInstallments = () => {
        if (!loanAmount || !term) {
            return;
        }

        const loanAmountFloat = parseFloat(loanAmount);
        const termInt = parseInt(term);
        const weeklyInstallment = Math.floor(loanAmountFloat / termInt);

        const remainingAmount = loanAmountFloat - weeklyInstallment * termInt;
        const currentDate = new Date();
        const installmentsData = [];

        for (let i = 1; i <= termInt; i++) {
            const installment = {
                date: new Date(currentDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
                amount: (weeklyInstallment + (i <= remainingAmount ? 1 : 0)).toFixed(2),
            };
            installmentsData.push(installment);
        }

        setInstallments(installmentsData);
        setShowPayments(true);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2); 

        return `${day}/${month}/${year}`;
    };

    if(loading){
        return <Loader color="rgba(0,0,0,0.6)" />
    }

    return (
        <div className='h-screen '>
            <div className="flex items-center justify-center flex-col lg:flex-row  mt-8  h-3/4 ">
                {/* <div> */}
                <div className="border p-4  shadow-md items-center flex flex-col mx-8  md:h-full  md:w-2/5 lg:w-1/4 lg:h-4/5 rounded-full m-8 justify-center ">
                    <div className="mb-4">
                        <label className="block mb-2 text-center">Loan Amount</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-center">Term (in weeks)</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                        onClick={calculateInstallments}
                    >
                        Schedule
                    </button>
                </div>
        {/* </div> */}

                <div className=" p-4 border shadow-lg w-2/3 lg:w-1/3">
                    <h2 className="text-2xl mb-4 ">Scheduled Repayments</h2>
                    {showPayments ? (
                        <div className="h-[300px] text-center overflow-y-auto">
                            <ul>
                                {installments.map((installment, index) => (
                                    <li
                                        key={index}
                                        className="border p-2 mb-2 rounded shadow-md"
                                    >
                                        {`Week ${index + 1}: ${formatDate(installment.date)} - ₹${installment.amount}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>
                          
                        </p>
                    )}
                </div>
            </div>
                <button onClick={handleApply} className="cursor-pointer hover:scale-110 w-40 h-10 mx-auto bg-pink-500 flex items-center justify-center text-white my-12 mb-12">Apply</button>
        </div>

    );
};

export default LoanCalculator;
