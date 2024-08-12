# SmartMoney

## Overview

**SmartMoney** is an advanced and comprehensive financial management tool meticulously crafted to empower users in taking full control of their financial well-being. With Gemini API integration, SmartMoney stands out as a robust solution that seamlessly integrates sophisticated financial analytics with user-friendly and intuitive interfaces.

<img src="/client/public/Home.jpg" alt="Smart Money">

## Features

- **Health Score Calculator**: We analyse users' financial data and calculate a personalised health score using the Gemini API, providing a clear picture of their financial well-being.

- **Wallet**: Track your daily transactions effortlessly with the Wallet option, and receive personalised recommendations through the Gemini API whenever you update a log.

- **Graphs**: Visualise your daily expenses with interactive graphs right on your dashboard, providing a clear and intuitive overview of your spending patterns.

- **ChatBot**: Ask your financial questions here and engage in intuitive discussions about your financial goals. Receive tailored recommendations to help you make the best decisions for your financial future.

- **Recommendations**: We provide long-term recommendations based on your financial goals and historical data, helping you make informed decisions for sustainable financial growth.

## Comprehensive Financial Management

By bringing all financial elements together in one cohesive platform, SmartMoney provides a truly comprehensive solution for managing and planning personal finances. Users can confidently take control of their financial well-being with SmartMoney, making it an essential tool for anyone looking to optimize their financial future.

## Built With

This section highlights the key frameworks and libraries that were utilized to build and power our project. 

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
- ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![GeminiAPI](https://img.shields.io/badge/GeminiAPI-00DC82?style=for-the-badge&logo=gemini&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
- ![JWS](https://img.shields.io/badge/JWS-F7DF1E?style=for-the-badge&logo=jsonwebtokens&logoColor=white)



## How to Get Started

1. **Prerequisites**: Install Node.js v14.17.0 or higher, npm v7.10.0 or higher, and Git.

2. **Cloning the Repository**:
    ```bash
    git clone https://github.com/legend4137/SmartMoney.git
    cd SmartMoney
    ```
3. **Environment Setup**:
    ```bash
    cp .env.example .env
    # Update .env with the following configuration
    ```
    ### Database Configuration

    Follow these steps to set up the necessary databases and environment variables for the project.

    #### 1. Create a Firebase Database

    1. Log in to the Firebase console.
    2. Create a new project or use an existing one.
    3. Navigate to the **Firestore Database** section.
    4. Create a new database and name it **`formSubmissions`**.
    5. In the Firebase console, go to **Project Settings** > **Service Accounts**.
    6. Click on **Generate new private key** to download a JSON file containing your Firebase credentials.
    7. Place this JSON file in your `.env` file.

    #### 2. Create a MongoDB Database

    1. Set up a MongoDB cluster using MongoDB Atlas or run a local MongoDB server.
    2. Create a database named **`test`**.
    3. Inside the `test` database, create a collection called **`wallets`**.
    4. Obtain your MongoDB connection string (API key).
    5. Add the MongoDB connection string to the `.env` file with the variable name **`MONGODB_KEY`**.

    #### 3. Create a Gemini API Key

    1. Register on the Gemini platform and create a new API key.
    2. Add the Gemini API key to the `.env` file with the variable name **`GEMINI_API_KEY`**.

    #### 4. Setting Up the `.env` File

    1. Create a `.env` file in the **server** folder of your project.
    2. Add the JSON file that you downloaded earlier and the following environment variables to the `.env` file:

        ```bash
        FIREBASE_PRIVATE_KEY=path/to/your/firebase/private/key.json
        MONGODB_KEY=your_mongodb_connection_string
        GEMINI_API_KEY=your_gemini_api_key
        ```

### 5. Final Steps

- Ensure the `.env` file is included in the server folder.
- **Important:** Do not commit the `.env` file to version control to keep your API keys secure.

4. **Installing Dependencies**:
    ```bash
    npm install
    ```
5. **Building the Project**:
    ```bash
    npm run build
    ```
6. **Running the Project**:
    ```bash
    npm start
    # For development:
    npm run dev
    ```
7. **Running Tests**:
    ```bash
    npm test
    ```

#


