import React from 'react';
import { useSelector } from 'react-redux';
import './styles/Blog.scss';

const RateBlog = () => {
    const blog = useSelector(state => state.blogs.blog);

    return (
        <div className="rate__blog">
            <div className="rate__blog__card">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
            </div>
        </div>
    );
};

export default RateBlog;