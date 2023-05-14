# Project 4: Footy-Diary

## Description

During the final week of the course I was tasked with building a full stack application of my choice. The brief required the use of a Python Django API with Django REST framework serving the data from a Postgres database. Based on my love of football and the fact I enjoy attending random games, I decided to create an app that allowed a user to keep track of the games they’ve been to, the details of the game itself and who they attended it with. 

![2023-05-09 (1)](https://github.com/tommycroot/Project-4/assets/80596226/637867a0-32c0-48ce-b881-ed02ae40c560)

## Deployment Link

The app is deployed [here](http://haglproject.herokuapp.com/)

## Getting Started/Code Installation

* Clone or download the repo from GitHub onto your machine
* Install back-end dependencies: pipenv install
* Enter the project shell: pipenv shell
* Make migrations: python manage.py makemigrations
* Migrate: python manage.py migrate
* Load seed data for Clubs: python manage.py loaddata club/seeds.json
* Start the back-end server: python manage.py run server
* Open a second terminal to install dependencies in the client folder: cd client & npm i
* Start the front-end: npm run start

## Timeframe

This was a solo project completed in just over a week.

## Technologies Used

Front-end:

```
* React.js
* React Select
* Axios
* CSS and Bootstrap
* JavaScript
```

Back-end:

```
* Python
* Django
```

Dev Tools:

```
* Git
* Github
* Chrome DevTools
* Insomnia
* TablePlus
```

Other: 

```
* Excalidraw
* Figma
```

## Brief

* Build a full-stack application by making your own back-end and front-end.
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database.
* Consume your API with a separate front-end built with React.
* Be a complete product, meaning multiple relationships and CRUD functionality for at least a couple of models.

## Planning

The first stage of planning was deciding what app to create. I decided on the idea of an app where users can keep track of the football matches they have been to.  I have a friend who has accumulated a decent following on TikTok by travelling to lots of different stadiums and reviewing the match day experience and another friend who is trying to go to every stadium in the football league. I’m a huge fan of the sport as well and enjoy going to random games, so I thought I’d try and develop an app that could help us all keep track of the fun we’re having. 

I began by creating an entity relationship diagram to establish relationships between models and have a visual representation to help guide me through the build process.

![2023-04-26 (2)](https://github.com/tommycroot/Project-4/assets/80596226/429266ba-3896-4f0b-930a-3d839d4ed6ca)

I then created a wireframe on Excalidraw which laid out the user’s journey, what pages needed to be included, the general layout of the site and how it was going to be linked together.  

![2023-04-27](https://github.com/tommycroot/Project-4/assets/80596226/295fe74f-ac8e-4883-ab69-634859ebb557)

I also created a Google doc to pseudocode as much as I can in terms of models, endpoints, views and serializers for the back-end and components, routers and packages needed for the backend. A small snippet of this is seen in the screenshot below: 

![2023-04-27 (3)](https://github.com/tommycroot/Project-4/assets/80596226/5c8051d7-ede1-4a10-ab5d-52d00557d9f8)

## Build/Code Process:

### Back-end:

The first thing I tackled was developing the back-end as it would hopefully make implementing the front-end easier. The first stage was to create the database and set up the authentication for the user. This was implemented early so I could later test out what actions they can perform within the application, plus it is easier to authenticate an application from the beginning rather than trying to retrofit later. 

![2023-04-27 (6)](https://github.com/tommycroot/Project-4/assets/80596226/ba4463c7-fb2c-4e70-8fd5-2e9fceeb665a)

Above is the code for the JWT token. If the ‘Authorization’ header starts with the string ‘Bearer’ then the method extracts the JWT token and the JWT is decoded. If the token is successful the user’s ID from the ‘sub’ claim is matched with the user’s ID in the database.

I then got to work on setting up the models for the matches, clubs and friends. The classes defined for ‘Club’ and ‘User’ were straightforward and included only a few fields, but the ‘Friends’ table required a many-to-one relationship between the ‘Friends’ table and the ‘User’ table. I achieved this with a foreign key field that related each friend to a user and by using the ‘on_delete’ parameter I also ensured that when a ‘User’ instance is deleted so are all the associated friends instances related to it. The ‘related_name’ parameter was employed to specify the name of the reverse relation from ‘User’ to ‘Friends.’

The ‘Match’ model class was more complex and required four foreign key fields. Between the ‘Match’ table and the ‘Friends’ table a many-to-many relationship was implemented. This relationship allows each instance of ‘Match’ to be associated with multiple instances of ‘Friends’ and each instance of ‘Friends’ access to the matches associated with it. The model also needed a many-to-one relationship between the ‘Match’ table and the ‘User’ table to ensure that each match is related to one ‘User’ instance. Finally, foreign key fields relating each match to both a home team and away team from the ‘Club’ table were required in the form of a many-to-one relationship.

Below is a screenshot of the ‘Match’ model: 

![2023-04-27 (7)](https://github.com/tommycroot/Project-4/assets/80596226/ed83bd24-ee92-4bbb-b164-0f8f8b799c9c)

Serializers were created to allow the model instances to be converted into JSON as well as deserialize the data it receives to the API. For the MatchSerializer, I created fields that nested serializers of the friends, home team and away team model instances. I also made serializers for clubs, friends and users and included Meta classes for each to specify that the serializer should be used to serialize/deserialize instances of that model and all fields of the model should be included in the input. A separate ‘MatchPostSerializer’ was created for posting or updating a match without any of the nested serializers present. Below is a screenshot of the MatchSerializer:

![2023-04-27 (10)](https://github.com/tommycroot/Project-4/assets/80596226/192c3702-0a6d-4d93-8a7b-b62feaca75c9

To implement CRUD functionality and handle HTTP requests, views were added to their respective apps. Different functions were implemented depending on the requirements of the API. I used the class-based view ‘APIView’ to handle HTTP requests and return the appropriate HTTP responses. All of the apps had a list view implemented to retrieve all of the objects from that model and a detail view to retrieve the details of a single object based on its unique identifier (in my case its primary key.)  It was important that a user could add, edit and delete matches and friends. 

![2023-05-01](https://github.com/tommycroot/Project-4/assets/80596226/edcff5ec-3f6d-4265-a630-24c6c88f54aa)

In the screenshot above are the methods implemented for get, put and delete for the ‘MatchDetailView’. The put method uses the ‘MatchPostSerializer’ instead of the ‘MatchSerializer’ and uses the request data to the API to update the record of the match. 

### Front-end:

Once I was satisfied that the back-end was set up correctly and working in Insomnia, it was time to move onto the front-end. Firstly, I created the login and register pages so I would be able to test out the front-end components that required user authentication later on. I created forms for these pages using Bootstrap and with the use of the import useNavigate from react-router-dom I made sure that the user was navigated from the register page to the login page and from the login page to a basic homepage. I also created an auth file to help with the authentication process similar to Project 3. Included in the auth file are functions that retrieve the token and authenticate the user, a function to check that the user is the owner of a particular Match instance and a function to remove the token (needed for logging out)  Whilst working on these components, I was also implementing the router in the App component and started working on the NavBar. For the NavBar I used conditional formatting so that I had a bit of creative freedom with how it responds to the page. 

![2023-05-01 (1)](https://github.com/tommycroot/Project-4/assets/80596226/9da679c3-08b3-456c-b5c9-07e36aafa139)

In the screenshot above, the code ensures that if a user is logged in (which is checked with the isAuthentication function) then the Login and Register components are replaced with a Log Out option and the pages an authenticated user can interact with on the site. 


After this I focused on the pages that allowed a user to create a new instance of a match and also a profile page to serve as a hub for them to view all of their matches from. I created a separate MatchForm component that was passed down with props into the MatchPage. I wanted a user to be able to access his friends list within this form and also add a new friend within the form without having to visit another page. To accomplish this, I decided to use the React Select Library - a React library I hadn’t used before. 

![2023-05-01 (2)](https://github.com/tommycroot/Project-4/assets/80596226/df4dec1c-a9d8-4099-ac19-ab1e4660a948)

In the above screenshot is the JSX for the React Select component. First, there is a conditional statement to check if the friends array exists. Options rendered are an array of objects with a ‘value’ property set to the ‘id’ and a ‘label’ property set to the ‘name’ of each friend in the array.


To handle the user adding a new friend to the array I created an ‘Add Friend’ button linked to a modal. This was my first time implementing a modal and I was excited to get to use one. The modal shows up if the user clicks the button and hides when the new friend is submitted.

![2023-05-01 (5)](https://github.com/tommycroot/Project-4/assets/80596226/b2e0312f-de4c-49a9-873c-74c8383957cd)

In the above screenshot is the code for the asynchronous function that is actioned when a new friend is added. This operation handles the post request to the server and updates the ‘friends’ state with the response data. It spreads the existing ‘friends’ array and appends the ‘response.data’ to the end of it. It also clears the ‘newFriendName’ state by setting it to an empty string and hides the modal by setting the ‘showModal’ state to false. 


I decided filters were the best way to help display the user’s collection of matches as there could potentially be a large amount of matches to display and there would be a large number of clubs to choose from too. I wanted to stack these filters so the user could combine them and narrow down the matches they want to retrieve down even more. 

![2023-05-01 (6)](https://github.com/tommycroot/Project-4/assets/80596226/4cea9d7d-bbd7-4772-9776-f03ed97a6456)

In the above screenshot the matches prop is filtered by checking if the ‘date’ property of a match passes the regex test and if the ‘season’, ‘home_team’ and ‘away_team’ properties of a match equal the corresponding filters selected. The filtered matches are sorted in ascending order by date with a function that returns either ‘1’ or ‘-1’ depending on the comparison and the ‘setFilteredMatches’ function is called to update the state with the filtered and ordered matches.


![2023-05-14](https://github.com/tommycroot/Project-4/assets/80596226/6b4b3dc4-95ae-4a35-b6d9-2c6c66a0193b)

In the above screenshot is the JSX code that renders the Filters component. Within the column there are three dropdowns menus for selecting filters (Season, Home Team and Away Team) and each dropdown is created using the ‘select’ element. The dropdowns are generated from the ‘matches’ prop and these arrays are created using the ‘set’ object to extract and sort in ascending order. 

## Challenges

The biggest issue I ran into when building this project was from the start having an incorrect ERD diagram, which wasn’t right for what I was trying to code. Originally, I had another model called MatchDetails implemented with a many-to-many relationship to a user’s matches. I couldn’t really figure out how this would work when I was testing it out as it seemed like I needed to create an instance of a Match and MatchDetails at the same time as you needed a Match id to create an instance of MatchDetails. Whilst this is entirely possible, it seemed like unnecessary steps and potentially difficult code to write. After realising I could easily display what I intended MatchDetails to render from the fields of a Match instance, I got rid of that model and simplified it to the version seen earlier in my plan. However, there were headaches that came with having to restructure the app. I had to rethink and redesign model relationships and restructure serializers to get it working the way I wanted to. Unfortunately, having to undo some of the problems that the incorrect plan caused also meant losing out on valuable time I could have spent elsewhere in the project.  However, this was a valuable learning curve for me and I was pleased to overcome it. I feel I now have a much stronger understanding of model relationships having been through it. 

![2023-04-14](https://github.com/tommycroot/Project-4/assets/80596226/37568b8e-22d9-43f0-adad-3e73dd3502a1)

The original ERD diagram with the not needed MatchDetails model.


A tricky bit of code I struggled with was getting the ‘handleChange’ function to work with the React Select component. I also struggled to get that dropdown populated with the user’s friends already selected for a Match instance when a user is on the MatchEdit page. However, with perseverance, the trusty console.log and trial and error, I was able to accomplish this.

![2023-05-14 (1)](https://github.com/tommycroot/Project-4/assets/80596226/80d960f0-0aa7-4c20-880b-ad38cc7f5846)

The ‘handleChange’ function is an event handler that is called when there is a change event on any of the input fields or select dropdowns in the form. It required the ‘formFields’ state to be updated by creating a new object using the spread operator and copying all the existing key-value pairs from the ‘formFields’ object. 

![2023-05-14 (2)](https://github.com/tommycroot/Project-4/assets/80596226/fa35fc01-b246-432e-8274-5463884d63e0)

On the ‘MatchEdit’ page, the ‘newMatch’ object is created by using the spread operator to copy all properties from the ‘data’ object fetched from the server. The ‘friends’ property is mapped to an array of objects with ‘value’ and ‘label’ properties where value is the friend’s ‘id’ and label is the friend’s ‘name.’ 

## Wins

I am extremely proud to have built a full-stack application from scratch and really enjoyed seeing the project transform from a plan to a finished product. This was the first time since Project 1 that I was working completely on my own and it’s a great feeling knowing that building apps like this is now an achievable feat. 

My biggest wins occurred on the front-end, specifically being able to successfully implement components I had never used before. The previously mentioned select component ‘React-Select’ was used to render a more stylistic drop down for the friends array and a modal component was used to handle the add friend feature. How this was programmed was explored further earlier on in the build process of this README, but these were both unchartered waters for me and it was a fun challenge figuring out how to get these working.

![2023-05-14 (3)](https://github.com/tommycroot/Project-4/assets/80596226/2a4fe1c6-2e3a-4884-b223-1a97b2085a48)

In the first part of the code of this screenshot is a button element used to trigger the modal. When this button is clicked, it sets the value of the ‘showModal’ state to true causing the modal to appear on the screen. The second part of the code is the actual modal component. Inside the modal, there is a form with an input field to add new friends. There are two buttons - one to submit the form and one to close the modal. The ‘onClick’ event for the close button sets the value of ‘showModal’ to false, which hides the modal.

I am also proud that I was able to use the Python language and Django REST framework to code the backend of this project successfully. We spent the vast majority of the course using JavaScript and only had a couple of days to practise with the new language before starting our projects.  Whilst getting myself in knots due to a bad plan was not ideal, I am proud of myself for being able to fix the issue, refactor the code relatively quickly, keep my head up and reach the deadline. 

## Key Learnings/Takeaways

I think one of the biggest takeaways I’ve learned is that planning is crucial. As mentioned in the challenges section, I had to adjust my entity relationship diagram a couple of days into the project as it wasn’t tailored exactly to what I was trying to build. This caused additional work and since I was on a tight deadline, it caused unwanted additional stress as well. 

I also learned that model relationships are key to building projects like this, as they can enhance the usability and functionality of the application. This is true of my project, as they have provided users with a comprehensive view of their match history and associated friends. Model relationships also help maintain data consistency and integrity by enforcing rules and constraints. For instance, the foreign key fields related each match to the home team and away team from the ‘Club’ table ensure that only valid club instances can be associated with a match. 

Additionally I learned that authentication should always be an early priority. Implementing in the beginning stages of the development process allowed me to test out what actions users can perform within the application without having the headache of having to make migrations and figure out what order to seed the data in. 

Finally, a big takeaway from this project is I can experiment with packages I’ve never used before and succeed. This is a huge confidence boost for me on this stage of my journey as a programmer. I feel like for the majority of the course I have been reluctant to attempt implementing ideas not covered in class, but now I have the courage and belief to try out new things on my own. 

## Bugs

The app seems to be bug free except for some CSS issues that I will fix post-course. The most glaring example of this is the loading spinner not being centred and the mobile styling feeling very cramped.

## Future Improvements

I really ran out of time on this project and will be definitely going back to add more and finish it off. Firstly, I would like to improve the CSS stylings and make the application feel more interactive, perhaps adding in some animations and slideshows.

I also want to add some extra functionality to the app, such as the friends filter. This will be added post-course, as this was a key part of the app for me and I already have the logic ready to implement it. There are more fields to the Match model that I would like to add, such as a rating for the beverages and food at the ground and also a rating for the user’s general impression of the ground. I already have the fields for stadium images and club badge images seeded in the database, so I would like to display them on the Match page. This will make that page feel more complete and there will also be more visuals for the user to look at. I would also like to implement an account page, so a user can delete their account and friends. 

Finally, I would like to implement Cloudinary to the project, which is a cloud-based image and video management platform. If I can get this working, then users will be able to upload images and videos from their day out at the match. I think this is a really cool additional feature to implement and would really boost the app’s user experience. 

 






