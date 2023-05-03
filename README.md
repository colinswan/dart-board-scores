# Dartboard Scoreboard

Dartboard Scoreboard is a web application that helps you keep track of your 501 dart game scores. The app allows you to easily manage multiple players and their scores in a user-friendly interface. With a dartboard SVG image that detects where the user clicks, this application provides an interactive way to record your real-world dart scores.

## Features

- Support for up to 6 players
- Interactive dartboard for score input
- Customizable player names
- Easy-to-read scoreboard and ranking table
- Toast popups for special achievements (e.g., 180, Bull's Eye)
- Players must finish on a double or will be "busted" and revert to the last score
- Detects what double the player can finish on and notifies them of the double
- Undo functionality for correcting mistakes
- New game and reset game options
- End game ranking and winner announcement
- Responsive design for use on mobile devices

## Game Rules

This application is designed to follow the rules of the 501 darts game:

1. Each player starts with 501 points.
2. Players take turns throwing three darts at a time, and their score for each round is subtracted from their remaining points.
3. Players must finish the game by hitting a double (an even-numbered score) with their final dart. If they don't, they'll be "busted" and return to their score before the last round.
4. The first player to reach exactly 0 points wins the game. Rankings will be assigned based on the order in which players finish the game.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/get-npm) (v6.0.0 or later)

### Installing

1. Clone the repository:

git clone https://github.com/your-username/your-repo-name.git


2. Navigate to the project directory:

cd your-repo-name


3. Install the project dependencies:

npm install


4. Start the development server:

npm run dev


5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - A build tool and development server
- [Styled-components](https://styled-components.com/) - A CSS-in-JS styling framework

