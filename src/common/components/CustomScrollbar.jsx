import React, { useEffect } from 'react';

function CustomScrollbar(props) {

    createStyle = () => {
        const styleElement = document.createElement('style');
        const pseudoStyles = document.createTextNode(`
            .dynamic_custom__scroll__bar {
                height: ${props.height || '90vh'};
                overflow-y: auto;
            }
            
            .dynamic_custom__scroll__bar::-webkit-scrollbar {
                width: ${props.scrollbarWidth || '7px'};
                -webkit-appearance: none;
            }

            .dynamic_custom__scroll__bar::-webkit-scrollbar-track {
            }

            .dynamic_custom__scroll__bar::-webkit-scrollbar-thumb {
                border-radius: 10px;
                box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
                background-color: ${props.scrollbarColor || '#ccc'};
            }

            .dynamic_custom__scroll__bar::-webkit-scrollbar-thumb:hover {
                background: ${props.scrollbarHoverColor || props.scrollbarColor || '#ccc'};
                cursor: pointer;
              }
        `);
        styleElement.appendChild(pseudoStyles);
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    };

    useEffect(() => {
        createStyle();
    }, []);
        

    return (
        <section className="dynamic_custom__scroll__bar">
            {props.children}
        </section>
    );
}

// CustomScrollbar.propTypes = {
// 	value: PropTypes.number.isRequired
// };

export default CustomScrollbar;