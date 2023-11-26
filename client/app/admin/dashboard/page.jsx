// components/CenteredLinks.js

import Link from 'next/link';

const CenteredLinks = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded shadow-lg p-8">
        <Link legacyBehavior href="/admin/requests" >
          <a className="block text-center text-xl px-4 py-2  bg-pink-500 text-white rounded-md hover:bg-pink-600 hover:text-white shadow-md">
            View Loans
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CenteredLinks;
