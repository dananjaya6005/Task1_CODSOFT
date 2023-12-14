import { Link } from "react-router-dom"
import { Post } from "../screens/Home/Home"

export default function PostCard(props : Post) {
  return (
    <>
    <Link to={`/blog/${props._id}`}>
    <div>
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden relative bg-slate-900 ">
            <div className="flex items-end justify-end h-56 w-full bg-cover" >
                <img className='opacity-50 hover:opacity-70 duration-500 '
                 src={props.imageURL} alt="blog"/>
            </div>
            <div className="px-5 py-3  absolute  bottom-0 left-0 ">
                <h3 className="text-gray-200 text-lg uppercase">{props.title}</h3>
                <span className="text-gray-300 mt-2">{props.author}</span>
            </div>
        </div>
    </div>
    </Link>
    </>
  )
}
