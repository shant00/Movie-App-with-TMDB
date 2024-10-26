# Movie App with TMDB

This is a Movie App built with Next.js that uses the TMDB API to fetch and display movie information. The app includes features such as authentication, a watchlist, and theme toggling.

## Features

- **Authentication**: Users can log in and log out. With Credential (Username: admin@admin.com,Password: Admin@123)
- **Watchlist**: Users can add movies to their watchlist (Protected).
- **Movie Details**: Users can show movie details with cast and banner also suggested list
- **Theme Toggle**: Users can switch between light and dark themes.
- **Responsive Design**: The app is designed to be responsive and works well on both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node (v20)
- npm or yarn

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/shant00/Movie-App-with-TMDB.git
    cd Movie-App-with-TMDB
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add your TMDB API key:

    ```env
    NEXT_PUBLIC_TMDB_API_KEY=
    JWT_SECRET=
    NEXT_PUBLIC_TMDB_API_BASE_URL=
    JWT_EXPIRY=
    ```

### Running the App

To run the app in development mode:

```sh
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

### Building for Production
To build the app for production:

```sh
npm run dev
# or
yarn dev
```
To start the production server:
```sh
npm start
# or
yarn start
```

Find On: https://movie-app-with-tmdb.vercel.app/
