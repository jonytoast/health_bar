# Recipe Health Guru

![License Badge](https://img.shields.io/badge/license-MIT%20license-blue)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribution](#contributing)
- [Credits](#credits)
- [Questions](#questions)


## Description

Recipe Health Guru is a social network where users can look for recipes taking into account the ingredients they have at home. Members can utilize the search bar on the dashboard to find nutritional data about ingredients. Recipes that contain the ingredient will populate the page. Authorized users will be able to comment on the recipies. The movitation for development was to create an accessible, functional application where users can post as well as find delicious recipes that fit into their specific diet (low calorie, high protein, vegan, etc).


This App also uses the is-vegan package to inform users if the food ingredient they search for is vegan, as well as the node-fetch library so the API fetch request from the users' food ingredient searches takes place on the backend. The FDC API guide can be found at: https://fdc.nal.usda.gov/api-guide.html

This App is responsive and can be browsed smoothly on both large and small viewports.

## Installation

To run this app locally, download the repository from GitHub using the following command in your CLI:

```
git clone git@github.com:jonytoast/health_bar.git
```
Then, in the root of the directory, open an integrated terminal and run the following two commands: 
```
npm install
npm staty
```

## Usage

To access the Recipe Health Guru, visit the deployed App on Heroku at https://recipe-health-guru.herokuapp.com/.

Without signing up or loggin in, users can only browse the three most recently posted recipes by clicking on the recipe title on homepage and the recipe page, but will not be allowed to comment on the recipes or post their own recipes. Only when a user is signed up or logged in can they view all recipes, view nutritional information, post recipes, and comment on recipes. 

Authorized users can navigate to the dashboard, where they can search for food ingredient nutritional facts and whether or not the ingredient is vegan, as well as the recipes in the app's database which include the searched ingredient. If the FDC's API returns no food data, they will be alerted accordingly. If the is-vegan library fails to determine if a searched ingredient is vegan, the resulting nutritional fact chart will not come with the "is/is not vegan" warning sign.

Once an authorized user has posted a new recipe, that recipe will appear at the bottom of their dashboard and will display with an update and delete button. When the update button is clicked, a form section will appear below for the user to edit the recipe (or to cancel the edit by clicking on the cancel button). Once the user is finished with editing the recipe, they can click on the update recipe button, and the recipe will save. 

When an authorized user comments on a recipe, they can go back and edit or delete their own comment by clicing on the edit comment and delete comment buttons. 

Here are some screenshots of the App's major functions:

Homepage screenshot:
  <img src="./public/assets/images/homepage-screenshot.png">

Login Page screenshot:
  <img src="./public/assets/images/login-screenshot.png">

Dashboard screenshot:
  <img src="./public/assets/images/dashboard-screenshot.png">

Nutritional Fact Page screenshot:
  <img src="./public/assets/images/nutritional-fact-screenshot.png">

Previous Recipe Section screenshot:
  <img src="./public/assets/images/edit-recipe-screenshot.png">

Edit Recipe Function screenshot:
  <img src="./public/assets/images/edit-recipe-detail-screenshot.png">

All Listed Recipes Page screenshot:
  <img src="./public/assets/images/all-recipes-screenshot.png">

Single Recipe Page screenshot:
  <img src="./public/assets/images/recipe-page-screenshot.png">

Comment Section screenshot:
  <img src="./public/assets/images/commenting-screenshot.png">

## License
This application is licensed under the MIT License. 

## Contributing
Feel free to contribute to better improve this application. Fork the repository to your GitHub account. Clone the forked repository to your local machine. Create a new branch for your changes and push them to your forked repository. Then submit a pull request to the original repository.


## Credits
This application has been developed by 5 students of the Columbia Engineering Bootcamp: Angela Jaume, Fred Wang, Jony Toast, Michael Shaari and Tony Chavchanidze.

## Questions
If you have any questions about the development of the application or its usage, please open an issue!

