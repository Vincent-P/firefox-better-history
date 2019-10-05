import React from 'react';

class MonthVue extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    { this.props.date.format("MMMM, YYYY") }
                </h1>
            </div>
        );
    }
}

export default MonthVue;
