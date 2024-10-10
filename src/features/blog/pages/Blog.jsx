import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import CustomLoader from '../../../common/components/CustomLoader';
import './styles/Blog.scss';
import { useGetBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } from '../services/blogApi';
import { saveBlog } from '../slices/blogSlice';
import toast from "react-hot-toast";
import { isEmptyOrWhiteSpace } from '../../../common/utils/helpers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [formInputs, setFormInputs] = useState({
        title: '',
        content: ''
    });
    const { isLoading, isSuccess, isError, data, error, refetch } = useGetBlogsQuery();
    const [postBlog, postBlogProps] = usePostBlogMutation();
    const [updateBlog, updateBlogProps] = useUpdateBlogMutation();
    const [deleteBlog, deleteBlogProps] = useDeleteBlogMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isDisabled = isEmptyOrWhiteSpace(formInputs.title) || isEmptyOrWhiteSpace(formInputs.content);

    const handleChange = e => {
        setFormInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async () => {
        if (formInputs.id) {
            await updateBlog(formInputs);
        } else {
            await postBlog(formInputs);
        }
    };

    const handleModify = data => {
        setFormInputs(prevState => ({
            ...prevState,
            id: data.id,
            title: data.title,
            content: data.content
        }));
    };

    const handleDelete = async id => {
        setFormInputs(prevState => ({
            ...prevState,
            id: id
        }));
        await deleteBlog(id);
    };

    const handleRate = data => {
        dispatch(saveBlog(data));
        navigate('/rate');
    };

    useEffect(() => {
        const dataError = postBlogProps.isError || updateBlogProps.isError || deleteBlogProps.isError;
        const dataSuccess = postBlogProps.isSuccess || updateBlogProps.isSuccess || deleteBlogProps.isSuccess;
        const errorDescription = postBlogProps.error?.data.description || updateBlogProps.error?.data.description || deleteBlogProps.error?.data.description;
        const successDescription = postBlogProps.data?.description || updateBlogProps.data?.description || deleteBlogProps.data?.description;

        if (dataError) {
            toast.error(errorDescription);
        }

        if (dataSuccess) {
            toast.success(successDescription);
            setFormInputs({ title: '', content: '', id: '' });
        }
    }, [postBlogProps, updateBlogProps, deleteBlogProps]);

    return (
        <div className="blog">
            <div className="blog__layout">
                <div>
                    <h2 className="blog__heading">Blog Posts</h2>
                    <div className="blog__form">
                        <Form className="blog__form__area" onSubmit={handleSubmit}>
                            <Form.Input fluid label='Title' name="title" placeholder='Enter the title' value={formInputs.title} onChange={handleChange} />
                            <Form.TextArea label='Content' name="content" placeholder='Put your content here...' value={formInputs.content} onChange={handleChange} />

                            {formInputs.id ?
                                <Form.Button primary fluid className="blog__form__area__button" disabled={isDisabled} loading={updateBlogProps.isLoading}>Update Blog</Form.Button>
                                :
                                <Form.Button primary fluid className="blog__form__area__button" disabled={isDisabled} loading={postBlogProps.isLoading}>Create Blog</Form.Button>
                            }
                        </Form>
                    </div>
                </div>
            </div>

            <div className="blog__view__area">
                <div>
                    {isLoading &&
                        <CustomLoader />
                    }

                    {isError &&
                        <p>{error.message}</p>
                    }

                    {isSuccess && data.data.map(blog =>
                        <div key={blog.id} className="blog__view__area__data">
                            <h4>{blog.title}</h4>
                            <p>{blog.content}</p>

                            <div>
                                <Button secondary loading={deleteBlogProps.isLoading && formInputs.id === blog.id} onClick={() => handleDelete(blog.id)}>Delete</Button>
                                <Button primary onClick={() => handleModify({ id: blog.id, title: blog.title, content: blog.content })}>Modify</Button>
                                <Button primary onClick={() => handleRate({ id: blog.id, title: blog.title, content: blog.content })}>Rate</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Blog;
