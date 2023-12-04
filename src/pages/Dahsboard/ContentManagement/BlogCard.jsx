// BlogCard.js
import React from 'react';

const BlogCard = ({ blog, onPublish, onUnpublish, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl mt-5">
      <figure>
        <img src={blog.thumbnail} alt={blog.title} className="object-cover h-48 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <p>{blog.content}</p>
        {blog.status === 'draft' && (
          <button className='btn' onClick={() => onPublish(blog._id)}>Publish</button>
        )}
        {blog.status === 'published' && (
          <button className='btn' onClick={() => onUnpublish(blog._id)}>Unpublish</button>
        )}
        <button className='btn' onClick={() => onDelete(blog._id)}>Delete</button>
      </div>
    </div>
  );
};

export default BlogCard;
