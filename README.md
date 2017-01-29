The website is called MovieHub and allows people to sign up and search for movies and they can
see how many people recommend that movie and not recommend that movie.
They can also add these movies to their own movie collection that is stored on their profile. 
When they view their movie collection they can recommend the movies they have seen, not recommend them, or remove them from their list.
Users may edit information on their profile, change their password, and make their account private.

Some parts that are not fully implemented:
- preventing users from recommending and not recommending multiple times
- searching for other users
- incorporating the private account feature
- removing movies/users from the database when an admin is logged in


SETUP INSTRUCTIONS:
1) start the database
 
--> mkdir data

--> mongod --dbpath=$PWD/data

--> mongoimport --db moviesdb --collection movies --type json --file movies.json --jsonArray

--> mongoimport --db usersdb --collection users --type json --file users.json --jsonArray

2) start the server

--> npm install

--> node server
