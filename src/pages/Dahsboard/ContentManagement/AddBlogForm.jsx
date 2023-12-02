import React, { useState } from 'react';
import JoditEditor from 'jodit-react';

const AddBlogForm = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Implement the logic to create a new blog
    // Send a request to your backend to store the new blog
    // Redirect to the blog management page after successful creation
  };

  return (
    <div>
      <h2 className='text-4xl'>Add Blog here</h2>
      <form className='mt-5' onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    <br />
        <label>Thumbnail Image:</label>
        <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
<br />
        <label>Content:</label>
        <JoditEditor value={content} onChange={(value) => setContent(value)} />

        <button className='btn mt-5' type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
