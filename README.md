# Share My Cart
https://share-my-cart.netlify.app/

Share my cart is an app that allows users to quickly and easily share their extra items before they purchase to make use of the discount, or after purchase, to reduce waste and also save money by not having to throw away items that you couldn't finish before the expiry date.


Tech stack used:
- Sass and React for styling and front-end 
- NodeJS and express for backend server
- MySQL for database
- OAuth2.0 and Google Identity service for authentication
- Stripe for payment


# Getting Started
1. git clone both the server and the client repository to your local machine
2. on both side run npm install
3. on another terminal, login to your mysql account
4. create a database called share_my_cart
5. put your database information in the environment variable template format
6. on server side terminal, run npx knex migrate:latest and npx knex seed:run
7. on server side, run node --watch index.js 
8. on client side, run npm start
