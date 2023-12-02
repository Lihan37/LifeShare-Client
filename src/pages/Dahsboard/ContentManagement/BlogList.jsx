import React, { useEffect, useState } from 'react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('blogs.json');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="grid m-5 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={blog.thumbnail} alt={blog.title} className="object-cover h-48 w-full" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{blog.title}</h2>
            <p>{blog.content}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-primary">Publish</button>
              <button className="btn btn-primary">Unpublish</button>
              <button className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
