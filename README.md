# Atelier

# Table of Contents
  Description -
  Installation -
  Features -
  Reliability -
  Testing -
  Team Members -
  Roadmap -

# Description
  - This project is designed to handle different incoming product data from an api and display their contents for an online shopping page. Data is displayed in several ways on the page for the user to interact with including an overview, related items, current outfit, ratings, and reviews.

# Installation
  - In your terminal, first run "npm install" to install all project dependencies to your local workspace
  - Next, make a copy of the "example.env" file and name it ".env". Place this file into the project's root directory
  - After you have made the .env file, you will need to create or use an already created API token from github. This token must have the following scopes: read:org, user, read:user, user:email, user:follow
  - Once you have an api token, paste it over the "mysecretpasscode" text within .env and save your file
  - Additionally, in the .env file, you can update "WEBPACK_MODE" from "development" to "production" once you want to deplot the application for users
  - Finally, in order to run the application, in your terminal run the command "node server/index.js"

# Features
  - Overview:

  - Related Items:
      Nagivate through all the various related products using the carousel arrows. Change the current product to keep your shopping experience going, with the click of an image.Compare related products with the star icon, to see which features best suit your needs.
  - Your Outfit:
      Nagivate through all your favorite products that you have saved using the carousel arrows. Save all your favorite products in "Your Outfit" using the "+ Add Current to Outfit" or heart icon above, and it will persist the next time you visit. Remove anything in your "Your Outfit" using the "X" icon, if you are having second thoughts about a product.
  - Ratings:
      Users can view product analytics including product rating, percent of customers who recommend the product, graph displaying amount of reviews with each rating amount, and ratings of each product characteritic. The star rating graph is interactable and can be used to filter reviews based on selected ratings
  - Reviews:
      Users can read all reviews posted about a product and can sort them based on relevance, helpfulness, or newest. Users can also filter searches using an input query, can rate or report reviews, and can add their own review to the product with the option to attach photos

# Reliability
  - Due to request limitations of the current api, user's should refrain from excessive server requests within a short time span to avoid temporarily getting timed out by the server

# Testing
  - Testing libraries include React Test Library and Jest. This application comes with several tests already setup and can be run using "npm test". This script will gerenate a report showing what parts of the application are currently covered in our testing implementation. Any future testing files should be stored in "/spec/src" and can you use "../mock/testData.jsx" if additional testing data is needed.

# Team Members
  - Chad Fusco (Overview)
  - Christopher Wong (Related Items & Your Outfit)
  - Thomas Saldana (Ratings & Review)

# Roadmap