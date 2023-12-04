import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const ContentManagement = () => {
    return (
        <div>
            <h2 className="text-4xl text-center">All Blogs</h2>
            <div className="flex justify-between px-10">
                
                
                    <h2 className="w-3/4 mt-4 text-xl">
                        Please click on the  button to create a blog <FaArrowRight></FaArrowRight>
                    </h2>
                    <Link to='/dashboard/content-management/add-blog'>
                        <button className="btn btn-primary">
                            Add Blog
                        </button>
                    </Link>
                
            </div>
        </div>
    );
};

export default ContentManagement;