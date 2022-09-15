import {useSelector} from 'react-redux';
import Loading from './Loading/loading.jsx';
import Navbar from './Navbar/Navbar';
import PostList from './PostList/PostList';


const Home = () => {

    
    // const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);

    // useEffect(() => {
    //     dispatch(getPosts());
    // },[posts.length]);
    
    return ( 
        <div>
        {(posts.length===0)?(<Loading />):(
            <>
            <Navbar />
            <div className="mt-20">
            <PostList />
            </div>
            </>
            
        )}
       
        
        </div>
     );
}
 
export default Home;