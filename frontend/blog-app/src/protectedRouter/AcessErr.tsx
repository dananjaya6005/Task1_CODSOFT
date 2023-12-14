
import  logo403 from '../Images/403 Error.png'

export default function AcessErr() {
  return (
    <>
    <div className='min-h-screen'>
        <div className='flex justify-center items-center mt-10 '>
            <img src={logo403} alt="403 Error"
             className="w-1/4 object-cover object-center rounded-lg " />
             <div className='mx-5'>
                <h2 className='text-gray-700 font-bold '>Please Sign In ! </h2>
                <p className='text-xl mt-5'>Sorry 😔 you Dont have Acess this page !</p>
             </div>
        </div>

    </div>
    </>
  )
}
