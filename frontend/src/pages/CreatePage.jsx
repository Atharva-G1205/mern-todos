import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content ,setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = new useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.dismiss();
      toast.error('All fields must be entered');
      return; 
    }
    
    setLoading(true);
    try {
      await api.post('/notes', {title, content});

      toast.success('Note created successfully');
      navigate('/');
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to create note");
      if (error.response.status == 429) {
        toast.dismiss();
        toast.error('Slow down! Too many requests', {duration: 3000, icon: "❗"});
      } else {
        console.log('Failed to create note');
      }
    } finally {
      setLoading(false);
    }

  }

  return (    
    <div className='min-h-screen bg-base-300'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={`/`} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            Back to notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text font-bold text-lg'>Title</span>
                  </label>
                  <input 
                    type="text"
                    placeholder='Enter title'
                    className="input input-bordered  focus:outline-none focus:ring-0 focus:border-primary transition duration-300"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}/>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold text-lg">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered focus:outline-none focus:ring-0 focus:border-primary focus:bg-base-100 transition duration-300 h-32 text-[16px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button 
                    type='submit'
                    className='btn btn-primary'
                    disabled={loading}>
                      {loading ? 'Creating' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
