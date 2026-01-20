import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';



const SkeletonLoading = () => {

    return (
        
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
                <Skeleton count={7} />
            </p>
        </SkeletonTheme>
    );
}

export default SkeletonLoading