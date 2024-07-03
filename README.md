<h1>Real Time Chat App</h1>
    <p>This is a real-time chat application built using the MERN stack, Socket.io, TailwindCSS, and Daisy UI.</p>

   <h2>Features</h2>
    <ul>
        <li><strong>Tech Stack:</strong> MERN (MongoDB, Express, React, Node.js) + Socket.io + TailwindCSS + Daisy UI</li>
        <li><strong>Authentication & Authorization:</strong> Implemented using JWT (JSON Web Token)</li>
        <li><strong>Real-time Messaging:</strong> Enabled by Socket.io for instant communication</li>
        <li><strong>Online User Status:</strong> Managed with Socket.io and React Context to show active users</li>
        <li><strong>Global State Management:</strong> Utilizes Zustand for efficient state management</li>
        <li><strong>Error Handling:</strong> Comprehensive error handling on both the server and frontend sides</li>
    </ul>

   <h2>Getting Started</h2>

  <h3>Prerequisites</h3>
    <ul>
        <li>Node.js</li>
        <li>MongoDB</li>
        <li>npm or yarn</li>
    </ul>

   <h3>Installation</h3>
    <ol>
        <li><strong>Clone the repository:</strong>
            <pre><code>git clone https://github.com/KerollosGeorge/Chat_App.git
cd realtime-chat-app
            </code></pre>
        </li>
        <li><strong>Install server dependencies:</strong>
            <pre><code>
npm install
            </code></pre>
        </li>
        <li><strong>Install frontend dependencies:</strong>
            <pre><code>cd ../frontend
npm install
            </code></pre>
        </li>
        <li><strong>Configure environment variables:</strong>
            <p>Create a <code>.env</code> file in the <code>server</code> directory and add the following:</p>
            <pre><code>MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
            </code></pre>
        </li>
    </ol>

   <h3>Running the Application</h3>
    <ol>
        <li><strong>Start the server:</strong>
            <pre><code>
npm start
            </code></pre>
        </li>
        <li><strong>Start the frontend:</strong>
            <pre><code>cd ../frontend
npm run dev
            </code></pre>
        </li>
        <li><strong>Access the application:</strong>
            <p>Open your browser and go to <code>http://localhost:3000</code></p>
        </li>
    </ol>

  <h2>Technologies Used</h2>
    <ul>
        <li><strong>MongoDB:</strong> NoSQL database for storing user and chat data</li>
        <li><strong>Express:</strong> Web framework for Node.js</li>
        <li><strong>React:</strong> Frontend library for building user interfaces</li>
        <li><strong>Node.js:</strong> JavaScript runtime environment</li>
        <li><strong>Socket.io:</strong> Library for real-time web applications</li>
        <li><strong>TailwindCSS:</strong> Utility-first CSS framework</li>
        <li><strong>Daisy UI:</strong> Components library for TailwindCSS</li>
        <li><strong>JWT:</strong> JSON Web Token for secure authentication</li>
        <li><strong>Zustand:</strong> State management library for React</li>
    </ul>

  <h2>Contributing</h2>
    <p>Contributions are welcome! Please open an issue or submit a pull request.</p>
 
