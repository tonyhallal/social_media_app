# SOCIAL MEDIA APP

    Welcome the Social Media App Backend Repository. This repository contains the backend code the social media
    web application. It is built using Node.js, Express, socket.io, Express-validators, dotenv and mysql2.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Getting Started

    The following steps are taken to run the backend:

1. Clone the GitHub repository to your local development environment:

    ```bash 
    git clone https://github.com/tonyhallal/social_media_app.git
    ```

2. to install all the dependencies, RUN:

    ```bash
    npm install
    ```

3. to listen to the API on port 3001, RUN:

    ```bash
    npm run dev
    ```


## Project Structure

1. services: this directory contains all the logic for interaction with the database.
2. controllers: this directory handles validation on incoming requests and delegates to the services
3. routes: this directory defines the endpoints for communication with the API and maps a function to each endpoint.
4. validators: this directory contains the validation logic for incoming requests. They are used by the controller for validation
5. sockets: this directory handles realtime logic for messaging
6. index.js: this is the entry point for the API
