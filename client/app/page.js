import Link from 'next/link'

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className=' flex  gap-4  justify-center items-center justify-items-center p-8 bg-slate-50 shadow-lg'>
      <Link href="/user/signin" className="bg-pink-500 text-center hover:bg-pink-700 text-white font-bold py-2 px-4 rounded  w-28 md:w-32">
        User
      </Link>
      <Link href="/admin/signin" className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-28 md:w-32">
        Admin
      </Link>
      </div>
    </div>
  );
};

export default Home;
