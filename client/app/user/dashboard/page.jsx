// components/CenteredLinks.js

import Link from 'next/link';

const CenteredLinks = () => {
  return (
    <div className="flex  items-center justify-center min-h-screen">
      <div className="bg-white rounded shadow-lg p-8 flex gap-4" >
        <Link legacyBehavior href="/user/createloan" >
          <a className=" text-center text-xl px-4 h-36 w-36 py-2 mb-4 bg-blue-500 text-white rounded-[200px]   shadow-md flex items-center " >
            <div className='h-28 w-36 rounded-[800px] border-4 flex items-center hover:text-white hover:bg-blue-600'>  Create Loan</div>
           
          </a>
        </Link>
        <Link legacyBehavior href="/user/viewloans" >
        <a className=" text-center text-xl px-4 h-36 w-36 py-2 mb-4 bg-pink-500 text-white rounded-[200px]   shadow-md flex items-center " >
            <div className='h-28 w-36 rounded-[800px] border-4 flex flex-col  justify-center items-center hover:text-white hover:bg-pink-600 '><span>View</span> <span>Loans</span></div>
           
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CenteredLinks;
