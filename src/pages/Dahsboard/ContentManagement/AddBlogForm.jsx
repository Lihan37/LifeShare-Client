import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import BlogList from './BlogList';
import axios from 'axios';
import UseVolunteer from '../../hooks/UseVolunteer/UseVolunteer';

const AddBlogForm = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [blogStatus, setBlogStatus] = useState('draft');
  const [newlyCreatedBlog, setNewlyCreatedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const token = localStorage.getItem('access-token');
  const [isVolunteer] = UseVolunteer();

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://b8a12-server-side-lihan37.vercel.app/blogs');
      if (response.ok) {
        const fetchedBlogs = await response.json();
        setBlogs(fetchedBlogs);
      } else {
        console.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [newlyCreatedBlog]);

  const showAlert = (title, text, icon) => {
    Swal.fire(title, text, icon);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://b8a12-server-side-lihan37.vercel.app/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          thumbnail,
          content,
        }),
      });

      if (response.ok) {
        const createdBlog = await response.json();
        setNewlyCreatedBlog(createdBlog);
        setBlogStatus('draft');

        fetchBlogs();

        showAlert('Success', 'Blog created successfully!', 'success');
      } else {
        console.error('Failed to create blog');

        showAlert('Error', 'Failed to create blog', 'error');
      }
    } catch (error) {
      console.error('Error creating blog:', error);

      showAlert('Error', 'An error occurred while creating the blog', 'error');
    }
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage);
  
        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
          params: {
            key: '600d5036af985fdac53804b2e2c7d4fb', // Replace with your imgbb API key
          },
        });
  
        if (response.data && response.data.data && response.data.data.url) {
          setThumbnail(response.data.data.url);
        } else {
          console.error('Failed to upload image to imgbb');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  const handlePublish = async (blogId) => {
    try {
      const response = await fetch(`https://b8a12-server-side-lihan37.vercel.app/blogs/${blogId}/publish`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogStatus('published');

        // Update the status of the published blog in the local state
        setBlogs(prevBlogs =>
          prevBlogs.map(blog =>
            blog._id === blogId ? { ...blog, status: 'published' } : blog
          )
        );

        showAlert('Success', 'Blog published successfully!', 'success');
      } else {
        console.error('Failed to publish blog');

        showAlert('Error', 'Failed to publish blog', 'error');
      }
    } catch (error) {
      console.error('Error publishing blog:', error);

      showAlert('Error', 'An error occurred while publishing the blog', 'error');
    }
  };

  const handleUnpublish = async (blogId) => {
    try {
      const response = await fetch(`https://b8a12-server-side-lihan37.vercel.app/blogs/${blogId}/unpublish`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogStatus('draft');

        // Update the status of the unpublished blog in the local state
        setBlogs(prevBlogs =>
          prevBlogs.map(blog =>
            blog._id === blogId ? { ...blog, status: 'draft' } : blog
          )
        );

        showAlert('Success', 'Blog unpublished successfully!', 'success');
      } else {
        console.error('Failed to unpublish blog');

        showAlert('Error', 'Failed to unpublish blog', 'error');
      }
    } catch (error) {
      console.error('Error unpublishing blog:', error);

      showAlert('Error', 'An error occurred while unpublishing the blog', 'error');
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`https://b8a12-server-side-lihan37.vercel.app/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTitle('');
        setThumbnail('');
        setContent('');
        setNewlyCreatedBlog(null);
        setBlogStatus('draft');

        // Remove the deleted blog from the local state
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));

        showAlert('Success', 'Blog deleted successfully!', 'success');
      } else {
        console.error('Failed to delete blog');

        showAlert('Error', 'Failed to delete blog', 'error');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);

      showAlert('Error', 'An error occurred while deleting the blog', 'error');
    }
  };

  return (
    <div>
      <h2 className='text-4xl'>Add Blog here</h2>
      <form className='mt-5' onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-600">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            onChange={handleImageUpload}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <JoditEditor value={content} onChange={(value) => setContent(value)} />

        {newlyCreatedBlog ? (
          <div>
            {!isVolunteer && blogStatus === 'draft' && (
              <button className='btn' onClick={() => handlePublish(newlyCreatedBlog._id)}>Publish</button>
            )}
            {!isVolunteer && blogStatus === 'published' && (
              <button className='btn' onClick={() => handleUnpublish(newlyCreatedBlog._id)}>Unpublish</button>
            )}
            {!isVolunteer && (
              <button className='btn' onClick={() => handleDelete(newlyCreatedBlog._id)}>Delete</button>
            )}
          </div>
        ) : (
          <button className='btn' type="submit">Create</button>
        )}
      </form>

      {/* Display the newly created blog */}
      {newlyCreatedBlog && (
        <div className="card bg-base-100 shadow-xl mt-5">
          <figure>
            <img src={newlyCreatedBlog.thumbnail} alt={newlyCreatedBlog.title} className="object-cover h-48 w-full" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{newlyCreatedBlog.title}</h2>
            <p>{newlyCreatedBlog.content}</p>
          </div>
        </div>
      )}
      {/* Display the list of blogs */}
      <BlogList
        blogs={blogs}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AddBlogForm;
