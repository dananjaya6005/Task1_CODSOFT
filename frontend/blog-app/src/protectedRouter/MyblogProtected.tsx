
import MyBlogs from '../screens/MyBlogs/MyBlogs'
import { useUser } from '@clerk/clerk-react'
import AcessErr from './AcessErr';

export default function MyblogProtected() {

    const { isSignedIn } = useUser();
  return (
    isSignedIn ? <MyBlogs/> : <AcessErr/>
    
  )
}
