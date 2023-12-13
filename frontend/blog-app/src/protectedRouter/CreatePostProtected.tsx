
import { useUser } from '@clerk/clerk-react'
import AcessErr from './AcessErr';
import Features from '../screens/Features/Features';

export default function CreatePostProtected() {
    const { isSignedIn } = useUser();
  return (
            isSignedIn ? ( <Features/> ) : ( <>
 <div className='flex justify-center mt-4'>
    <h2 className='text-gray-700'>You can't Publish Blog Post without Sign In !</h2>
 </div>
<AcessErr/>
            
            </>  )
  )
}
