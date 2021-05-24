# Tap Snack
* Run a mobile tap build in the browser using Appetize.io
* Uses the keg-cli to run a docker container hosting a react app
  * Connects to the Appetize API, and loads all apps relative to an account

## Setup
* Clone the repo locally => `git clone https://github.com/simpleviewinc/tap-snack.git`
* Link the tap to your keg-cli
  * Navigate to the cloned repo =>  `cd path/to/tap-snack` 
  * Run the command => `keg tap link`
    * This should create a tap link with the alias of `snack`
* Create a `.env` file in the root directory and which should include the following ENVs 
  * `APT_API_TOKEN=<appetize-api-token>` ( Required ) - Used for calling the Appetize API
  * `TAP_NAME=<name of the tap>` ( Optional ) - Used as the title within the react-app

## Run
* With the `.env` file created, and the tap linked, run the command => `keg snack start`
  * This should start the docker container and make the app accessible in your browser
  * To use the app open your browser and navigate to https://snack-master.local.keghub.io/
