import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await fetch('https://b8a12-server-side-lihan37.vercel.app/blogs');
        if (response.ok) {
          const blogs = await response.json();
          const publishedBlogs = blogs.filter(blog => blog.status === 'published');
          setPublishedBlogs(publishedBlogs);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchPublishedBlogs();
  }, []);

  return (
    <div className='mx-5 my-5'>
      <h2 className="text-2xl font-bold mb-4">Published blogs</h2>
      <div className="grid mx-auto gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {publishedBlogs.map(blog => (
          <div key={blog._id} className="card bg-base-100 border border-gray-300 rounded-md shadow-md">
            <figure>
              <img src={blog.thumbnail} alt={blog.title} className="object-cover h-48 w-full rounded-t-md" />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
