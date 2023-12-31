# E-Commerce Project

## Setup Instructions

1. **Clone the Project:**
   ```bash
        git clone git@github.com:vaibhav1me/E-Commerce-MERN.git
        cd frontend
        npm install
        cd ../server
        npm install
   ```
- Make sure you have nodemon installed, you can install it via the following command in terminal
```bash
    npm install -g nodemon
```
- Create a .env file inside server directory

  ```.env
      MONGO_URI = "Your MONGO_URI string here"
      JWT_SECRET = "Your JWT Secret Here"
      PORT = 3000 or any other port that you want
  ```

- Create a .env file inside frontend directory
    - Here replace PORT by the port number on which your server is running

```.env
    VITE_BACKEND_URI = " http://localhost:PORT"  
```

- Go to index.js file in server directory and write the following code

  ```js
  const Product = require("./models/Product"); //added line
  const Category = require("./models/Category"); //added line
  const { products, categories } = require("./demo_data"); //added line

  /* ------Rest index.js code-----*/
  await connectDb(process.env.MONGO_URI);
  await Product.create(products); //added line
  await Category.create(categories); //added line

  /* ------Rest index.js code-----*/
  ```

- Now in terminal make sure you are in server directory and run the following command

```bash
    npm start
```

- Verify that demo data has been added to your mongo database
- Now remove the added lines from index.js file to avoid duplicating data many times
- You can also delete demo_data.js file in server directory. It is no longer needed if data has been added successfully to database
- Now open a new terminal and got to frontend directory
```bash
    cd frontend
```

- Now run the following command
```bash
    npm run dev
```

- Now go to the frontend URL provided by vite and you are good to go and start using the web app
