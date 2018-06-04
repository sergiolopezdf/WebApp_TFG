import React from 'react';

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="bodyWrapper">
                <h1>WebApp: a pilot test for a platform to distribute corporative multimedia content</h1>
                <p>
                    This platform contains servers for video, chat, forum and a client to manage all of these
                    resources. It is based on a microservices architecture.
                    Each server is a different service that runs individually.
                </p>
                <h2>

                    Technologíes on webApp
                </h2>

                <ul>
                    <li>React 16.0.0</li>
                    <li>ECMAScript 6 and JSX support</li>
                    <li>React Router v4</li>
                    <li>Latest Webpack (v.3.6.0) and Webpack Dev Server (v.2.8.2) with Scope Hoisting enabled</li>
                    <li>Hot Module Replacement using [react-hot-loader]</li>
                    <li>ES6 linting with continuous linting on file change</li>
                    <li>SASS support</li>
                    <li>Production Config</li>
                    <li>Redux</li>
                    <li>Express</li>

                </ul>


                <h2>
                    Relevant middlewares that have been used to communicate with the rest of the servers
                </h2>

                <ul>

                    <li>Socket IO Client</li>
                    <li>Sequelize (Postgres & SQLite)</li>
                    <li>Passport</li>
                    <li>Cripto JS</li>
                </ul>


                <h2>
                    Technologies on forum server
                </h2>

                <ul>
                    <li>Babel. ECMAScript 6</li>
                    <li>Express</li>
                </ul>

                <h2>
                    Technologies on chat server
                </h2>

                <ul>
                    <li>Socket IO</li>
                </ul>

                <h2>
                    Technologies on video server
                </h2>
                Video server based on HTTP Live Streaming (HLS)
                <ul>
                    <li>HLS Server</li>
                    <li>Babel. ECMAScript 6</li>
                    <li>Express</li>
                </ul>



            </div>
        );

    }
}
