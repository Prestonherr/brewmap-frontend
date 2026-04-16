# BrewMap ☕️🗺️

BrewMap is a coffee shop finder application that helps users explore local coffee culture. It now includes a minimal backend so users can register, log in, and persistently save favorite coffee shops. The frontend continues to use OpenStreetMap services for discovery while the backend provides user accounts and saved-shop storage.

## 🌐 Deployment

Try the application: [BrewMap](https://brewmap.root.sx/)

## Backend

Link to backend: [Backend Repo](https://github.com/Prestonherr/brewmap-backend)

## ✨ Features

- **City-based Search**: Enter any city name to find coffee shops
- **Customizable Radius**: Search within 1 to 25 miles
- **Real-time Results**: Fetches live data from OpenStreetMap (Nominatim + Overpass)
- **Distance Display**: Shows distance from city center for each coffee shop
- **User Accounts (Backend)**: Register and log in to a persistent account
- **Saved Favorites (Backend)**: Save coffee shops to your account so they persist across sessions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Multi-page Navigation**: Home, About, and Profile pages
- **Error Handling**: User-friendly error messages and loading states

## 🛠️ Technologies & Languages

- **React 18.3** - Modern UI library for building interactive user interfaces
- **Vite 5.3** - Next-generation frontend build tool for fast development
- **React Router DOM 7.10** - Client-side routing for single-page applications

### Styling

- **CSS3** - Custom styling with modern features (Grid, Flexbox, CSS Variables)
- **Normalize.css 8.0** - CSS reset for consistent cross-browser styling
- **BEM Methodology** - Block Element Modifier naming convention for maintainable CSS

### Development Tools

- **ESLint 8.57** - JavaScript/React linting with recommended rules
- **Prettier 3.2** - Code formatting for consistent style
- **React Hooks** - Modern React state and lifecycle management

### APIs & Backend

BrewMap uses OpenStreetMap services for discovery and a small custom backend for user data:

- **Nominatim API** (Geocoding): Converts city names to latitude/longitude coordinates
- **Overpass API** (Data Query): Queries OpenStreetMap for coffee shops and cafes
- **Backend API (local / custom REST)**: Provides endpoints for user registration, authentication, and saving/deleting coffee shops. The backend persists saved shops per user in a MongoDB database.

## 🔮 Future Enhancements

Planned features include:

- Displaying reviews and photos on coffeeshop cards
- Being able to rate coffeeshops
- A map displaying search results

## 👤 Author

Developed by Preston Herr
