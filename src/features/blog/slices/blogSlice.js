import { createSlice } from '@reduxjs/toolkit';

export const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blog: {}
    },
    reducers: {
        saveBlog: (state, action) => {
            state.blog = action.payload
        }
    }
});

export const { saveBlog } = blogSlice.actions;
export default blogSlice.reducer;