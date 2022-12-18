# Amorey Clothing

## Table of Contents
- [Description](#description)
- [Key Technologies](#key-technologies)
- [Installation](#installation)
- [Features](#features)
- [Reliability](#reliability)
- [Testing](#testing)
- [Team Members](#team-members)

## Description
CCT Engineering was engaged by Amorey Clothing to modernize the front-end design of their ecommerce site, working with their existing back-end and digital visual assets via an API. This repo is a demo of our work completed for the client. Features demonstrated include an expandable image gallery with pan/zoom capability, light/dark mode toggling, carousel of items related to the current product to increase sales yield, adding user ability to add favorite products to a "Your Outfit" section for improved consumer engagement, and a product ratings and reviews section featuring product-specific characteristics based on aggregated user data such as size, fit, and comfort.
## Key Technologies
- [React](https://github.com/facebook/react/)
- [Webpack](https://www.npmjs.com/package/webpack)
- [Babel](https://www.npmjs.com/package/@babel/core)
- [Axios](https://www.npmjs.com/package/axios)
- [ExpressJS](https://www.npmjs.com/package/express)
- [Jest](https://www.npmjs.com/package/jest)
- [React Testing Library](https://github.com/testing-library/react-testing-library)
- HTML5 & CSS3
## Installation
1. In your terminal, first run `npm install` to install all project dependencies to your local workspace
1. Next, make a copy of the "example.env" file and name it `.env`. Place this file into the project's root directory
1. After you have made the `.env` file, you will need to create or use an already created API token from github. This token must have the following scopes: read:org, user, read:user, user:email, user:follow
1. Once you have an api token, paste it over the "mysecretpasscode" text within `.env` and save your file
  - Additionally, in the `.env` file, you can update `WEBPACK_MODE` from `development` to `production` once you are ready to deploy the application for users
1. Finally, in order to run the application, in your terminal run the command `node server/index.js`

## Features
### Overview:
![Demo of Overview Section](/client/src/assets/README-OverviewScreenCap.gif)
- Wide-format image gallery using server-side image manipulation to intelligently focus on photo subject.
- Full screen expanded-view for viewing high-res versions of product images, with 2.5x zoom capability.
- Flexible thumbnail side-scroller allows user to quickly toggle through all available product style photos.
- View average star rating across all user reviews for product.
- Navigate styles for a particular product using the Style Select thumbnails
- User can toggle between light and dark modes for the site.
### Related Items:
![Demo of Overview Section](/client/src/assets/README-RelatedOutfit.gif)
- Nagivate through all the various related products using the carousel arrows.
- Change the current product to keep your shopping experience going, with the click of an image.
- Compare related products with the star icon, to see which features best suit your needs.
### Your Outfit:
- Nagivate through all your favorite products that you have saved using the carousel arrows.
- Save all your favorite products in "Your Outfit" using the "+ Add Current to Outfit" or heart icon above, and it will persist the next time you visit.
- Remove anything in your "Your Outfit" using the "X" icon, if you are having second thoughts about a product.
### Ratings & Reviews:
![Demo of Ratings & Reviews Section](/client/src/assets/README-RatingsReviewsScreenCap.gif)
- Displays product analytics including product rating, customer recommendation, and product characteristic ratings
- Displays amount of reviews with each rating amount in the form of a graph
- Users can interact with the rating graph to filter reviews down based on selected ratings
- Displays the two most current reviews posted about a product based on relevance, helpfulness, or newest.
- Ability to display additional reviews incrementing by two at a time
- Ability to filter reviews down using an input query based on text matching within the review entry
- Users can rate reviews as helpful to increase a review's relevenace or report reviews to remove them entirely
- Users can add their own review to the product with the option to attach photos

## Reliability
Due to request limitations of the current api, user's should refrain from excessive server requests within a short time span to avoid temporarily getting timed out by the server

## Testing
Testing libraries include React Test Library and Jest. This application comes with several tests already setup and can be run using `npm test`. This script will generate a report showing what parts of the application are currently covered in our testing implementation. Any future testing files should be stored in `/spec/src` and can you use `../mock/testData.jsx` if additional testing data is needed.

## Team Members
- [Chad Fusco](https://www.linkedin.com/in/chadfusco/) (Overview)
- Christopher Wong (Related Items & Your Outfit)
- Thomas Saldana (Ratings & Review)