# Recipe App

A full-stack web application for creating and sharing recipes. Users can register, login, browse existing recipes, and create their own recipes.

## Features
- User authentication (register/login)
- View all recipes
- Create new recipes
- Responsive design

## Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- JWT Authentication
- Bcrypt.js

### DevOps
- Docker
- Docker Compose

## Installation

### Prerequisites
- Node.js
- npm or yarn
- Docker and Docker Compose (optional)

### Local Setup
1. Clone the repository
    ```bash
    git clone <repository-url>
    cd recipe-app
    ```

2. Install backend dependencies
    ```bash
    cd Backend
    npm install
    ```

3. Install frontend dependencies
    ```bash
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the `Backend` directory with the following content:
    ```
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

5. Start the backend
    ```bash
    cd ../Backend
    npm start
    ```

6. Start the frontend
    ```bash
    cd ../frontend
    npm run dev
    ```

7. Open your browser at [http://localhost:5173](http://localhost:5173)

### Docker Setup
1. Make sure Docker and Docker Compose are installed.

2. Update the API URL in `config.js`:
    - Uncomment `const API_URL = 'http://backend:5000/api'`
    - Comment out `const API_URL = 'http://localhost:5000/api'`

3. Run the application:
    ```bash
    docker-compose up --build
    ```

4. Access the application at [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Recipes
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create a new recipe (requires authentication)

## License
MIT License
