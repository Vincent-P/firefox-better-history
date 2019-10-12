import React from 'react';

const Icon = (props) => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const suffix = isDark ? '-light' : '';
    props.src = `/${props.src}${suffix}.svg`;

    return <img {...props}/>;
};

export default Icon;
