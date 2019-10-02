import React from 'react';
import logo from './logo.svg';

function App() {
    return (
        <div>
            <header>
                <h1>History</h1>
            </header>
            <p>
                Edit <a>src/App.js</a> and save to reload or not okay it needs to be clicked again.
            </p>
            <div className="toolbar">
                <button className="default-button">Day</button>
                <button className="default-button">Week</button>
                <button className="default-button">Month</button>
                <button className="primary-button">Done</button>
            </div>
            <p>
                <button className="primary-button primary-button--micro">Micro</button>
            </p>
            <p>
                <button className="primary-button primary-button--puffy">Puffy</button>
            </p>
            <p className="secondary-text">
                Edit <code>src/App.js</code> and save to reload or not okay it needs to be clicked again.
            </p>
            <form>
                <label for="name">Name (4 to 8 characters):</label>
                <input className="default-input" type="text" id="name" name="name" placeholder="Placeholder" required/>
            </form>
        </div>
    );
}

export default App;
