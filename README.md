# Pokedex Project

Create a Full Stack React app consisting of a landing page and a pokemon list view showing the pokemon portrait and their name. With user login/logout using a backend of your choice (Express.js, Django, etc.).

## Requirements:

[x] Fetch pokemon using the PokeAPI: https://pokeapi.co/

[x] List view should be paginated

[x] User should not be able to see the pokemon list view until they’ve logged in

[x] User should be able to signup

[x] User should be able to login

[x] User should be able to logout

[] When clicking on a Pokemon List Item, the app should spawn a pop up dialog, showing the pokemon’s:
- name
- portrait
- abilities
- type
- stats
- moves

[] User should be able to search pokemon

### Bonus Points:

- Paginate the Pokemon List View using Infinite Scrolling (e.g.https://kushon.herokuapp.com/)
- Use Django for the backend
- Add ability for user to favorite a pokemon

[x] Use React Hooks

[x] Use Material UI

## Getting Started

Make sure that you have Git, Node.js and MongoDB installed. Start your MongoDB process and in your terminal run the following:

```sh
$ git clone git@github.com:T-Wesst/pokedex-project.git
$ cd pokedex-project
$ echo "SALTROUNDS=10\nSECRECT=<secretString>\nPORT=3001\nMONGODB_URI=<mongoDBCloudInstance>\nNODE_ENV=development" > .env
$ npm run install-all
$ npm run dev
```
