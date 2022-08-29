# Easy Leaderboard

## Setup
1. You can use MongoDB cloud hosting free tier for this! [More info here](https://cloud.mongodb.com/)
2. Create a `.env` file in the root directory by copying the `.env.example` and replacing the Mongo URI with your own.
3. Host the app somewhere! Below are some options.
    - [Digital Ocean](https://www.digitalocean.com/)
        - You can fork this repo, then use the Digital Ocean app platform to quickly host the app. Instead of using the .env, you will use the Digital Ocean environment variable settings for the app.
    - [Repl.it](https://replit.com/)
        - Repl.it has an always on tier of subscription. You can again just fork this repo and Replit can easily import it so you can edit it live. You may also be able to modify the app to use [the Replit included DB by using the code from this Replit that adds a layer of abstraction](https://replit.com/@adrenallen/replit-db-orm)


## Defining new validators
Validators are defined under the `/validators` folder. You can make a copy of `/validators/example.js` and fill in your own game's key. 

Fill out the `validateScore` function with logic to validate scores that are submitted! 

Your app will need to be rebooted for changes to take effect.

_Note: You can define more than one validator for a given game, and they will all be run to validate a score. If any fail, then the submission will be rejected._

## Clients
[Godot 4 Game Engine Client](https://github.com/adrenallen/EasyLeaderboard-Godot)