import {useNavigate } from "react-router-dom";

export default function StartPage() {

  const navigate = useNavigate();

  return (
    <div className='chakra-petch-regular flex items-center justify-center h-screen'>
      <div className='relative group shadow-2xl border border-white-700 w-100 flex flex-col items-center justify-center p-10'>
        <h1 className="text-center text-2xl font-bold">Welcome to ABomma</h1>
        <p className='text-center pt-5'>&copy; 2024 ABHI</p>
        <button onClick={()=>navigate('/home')} className='mt-5 px-4 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700'>
          Enter
        </button>
      </div>
    </div>
  );
}
