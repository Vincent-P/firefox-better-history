import React from 'react';

const Icon = (props) => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const suffix = isDark ? '-light' : '';
    const defaultUrl = `/${props.default}${suffix}.svg`;

    const onError = (event) => {
        event.target.src = defaultUrl;
    };

    props.src = defaultUrl;

    if (props.faviconUrl) {
        const domainNameRegex = new RegExp(/https?:\/\/[^/]*\//g);
        const domainNames = props.faviconUrl.match(domainNameRegex);
        if (domainNames) {
            props.src = `${domainNames[domainNames.length - 1]}favicon.ico`;
        }
    }

    return <img {...props} onError={onError}/>;
};

export default Icon;
