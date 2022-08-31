# Easy Leaderboard

A quick to setup and flexible leaderboard system designed to help game developers add a leaderboard to their games! Open source with ready to go game clients to make the process as quick and easy as possible.

Don't need custom score validation or don't want to host a server? Use a client listed below and the free hosted version by User Defined - [https://lb.userdefined.io](https://lb.userdefined.io)

## Table of Contents
- [:computer: API](#computer-api)
  * [Submit a new score](#submit-a-new-score)
  * [Get game scores](#get-game-scores)
- [:gear: Setup](#gear-setup)
  * [MongoDB](#mongodb)
  * [NodeJS](#nodejs)
- [:hammer_and_wrench: Customization](#hammer_and_wrench-customization)
  * [:white_check_mark: Validators](#white_check_mark-validators)
    + [Example validator](#example-validator)
- [:package: Ready To Go Clients](#package-ready-to-go-clients)
- [:construction_worker: Coming Soon](#construction_worker-coming-soon)
- [:man_scientist: Future Goals](#man_scientist-future-goals)


## :computer: API

### Submit a new score
`/games/submit` - `POST`

Request Payload
```
{
    name: <player name>,
    score: <player score>,
    game: <game key>,
    metaData: <optional game metadata>,
    validation: <optional validation string>
}
```

### Get game scores
`/games/<game key>` - `GET`

Optional query params

`asc` - `true` Sorts by ascending order if true else defaults to descending by score

`limit` - `<number of results to return>` Returns only the specified number of results

## :gear: Setup
There are two requirements to run EasyLeaderboard.
### MongoDB
The recommended way to quickly get an instance of MongoDB running is to use the free tier of MongoDB Cloud. [You can find more about that here.](https://www.mongodb.com/docs/drivers/node/current/quick-start/)

### NodeJS
To run the application itself, you will need to make a copy of `.env.example` and name it `.env`. Fill out the details in the file with your configuration settings. The app can be started via `npm start`.

To make the application reachable and always online, you will want to host it somewhere. Here are a few suggestions.
- [Digital Ocean App Platform](https://docs.digitalocean.com/products/app-platform/quickstart/sample-apps/node/)
    - You can fork this repo, then use the Digital Ocean app platform to quickly host the app. Instead of using the `.env` mentioned earlier, you will use the Digital Ocean environment variable settings for the app.
- [Repl.it](https://replit.com/languages/nodejs)
    - Repl.it has an always-on tier of subscription. You can fork this repo and Replit can easily import it so you can edit it live. You may also be able to modify the app to use [Replit's key/value DB by using the code from this Replit that adds a layer of abstraction](https://github.com/adrenallen/replit-db-orm)


## :hammer_and_wrench: Customization

### :white_check_mark: Validators
Validators are custom scripts which can be run to validate a submitted score before it is saved.

Validators are defined under the `/validators` folder. You can make a copy of `/validators/example.js` and fill in your own game's key. 

Fill out the `validateScore` function with logic to validate scores that are submitted! 

Your app will need to be rebooted for changes to take effect.


#### Example validator
Validates the score by checking if the validation value is equal to the score + 9. You can get creative using the submission metadata to playback game events or check for other anomalies in submissions to make cheating more difficult.
```
module.exports = {
  games: ["my-game-key"],
  validateScore(game, name, score, metaData, validation){
    return validation == score + 9;
  },
};
```

_Note: You can define more than one validator for a given game, and they will all be run to validate a score. If any fail, then the submission will be rejected._

## :package: Ready To Go Clients
[Godot 4 Game Engine Client](https://github.com/adrenallen/EasyLeaderboard-Godot)

## :construction_worker: Coming Soon
- [ ] Proper paging system
- [ ] Better response to submitted scores (including what # the score is)

## :man_scientist: Future Goals
- [ ] Repl.it DB support
- [ ] Discord integration
