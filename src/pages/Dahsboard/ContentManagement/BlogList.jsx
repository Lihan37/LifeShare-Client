import React from 'react';

const BlogList = ({ blogs, onPublish, onUnpublish, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {blogs.map(blog => (
        <div key={blog._id} className="card bg-base-100 shadow-xl p-4">
          <figure>
            <img src={blog.thumbnail} alt={blog.title} className="object-cover h-48 w-full" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-base max-h-36 overflow-hidden">{blog.content}</p>

            <p className="text-sm font-semibold mt-2">
              Status: {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
            </p>

            <div className="mt-4">
              {blog.status === 'draft' && (
                <button className="btn mr-2" onClick={() => onPublish(blog._id)}>
                  Publish
                </button>
              )}
              {blog.status === 'published' && (
                <button className="btn mr-2" onClick={() => onUnpublish(blog._id)}>
                  Unpublish
                </button>
              )}
              <button className="btn" onClick={() => onDelete(blog._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
