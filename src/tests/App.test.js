import React from 'react';
import ReactDOM from "react-dom/client";
import { shallow, render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store'
import App from '../App';

describe('Testing The Rendering Of App Component', () => {
   it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.createRoot(div)
        .render(
            <Provider store={store}>
                <App />
            </Provider>
        );
   });

    // it('<App /> Component', () => {
    //     const wrapper = mount(
    //         <Provider store={store}>
    //             <App />
    //         </Provider>
    //     );
    // })
});

// describe('Snapshot Testing', () => {
//     it('renders correctly', () => {
//         const wrapper = shallow(
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         );
//         expect(wrapper).toMatchSnapshot();
//     });
// });

