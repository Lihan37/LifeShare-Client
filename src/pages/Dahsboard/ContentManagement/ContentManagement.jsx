import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/useAxiosSecure/UseAxiosSecure';
import AddBlogForm from './AddBlogForm';
import BlogList from './BlogList';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: blogs, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div>
            <div className="text-right">
                <button className='btn'>Add Blog</button>
            </div>
            <AddBlogForm />
            <Link to='/blog'>
                <button><BlogList blogs={blogs} /></button>
            </Link>
        </div>
    );
};

export default ContentManagement;
