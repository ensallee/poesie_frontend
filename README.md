# Poesie

If Magnetic Poetry and Instagram had a baby, it would be Poesie: a full stack poetry app that enables users to create poems by dragging and dropping words that were randomly generated by the [Wordnik API.](https://developer.wordnik.com/) Users are also able save poems to their profile page, upload profile photos from their local computer, browse and like other users’ poems, and follow one another. Poesie utilizes JWT and bcrypt for user authentication and authorization, which enables users to securely log in and view their saved poems.

## Getting Started

To use Poesie, first fork and clone the Rails backend repo, found [here](https://github.com/ensallee/poesie_backend). Next, run `bundle install` in the command line and launch Postgres. Once Postgres is running, create your own secret key in an .env file. Then, run `rails db:create && rails db:migrate`, followed by `rails db:seed`. Finally, run `rails s -p 4000`, which will launch the API on a local server at the specified port.

Once you have the backend running, fork and clone the React+Redux frontend, which is in this repo. Before you proceed, request your own API key from [Wordnik]((https://developer.wordnik.com/) and adjust the routes accordingly to complete successful queries. Next, run `npm install` in the command line. Then, run `npm start`. As long as you seeded your database when setting up the backend, you can log in as 'guest' with the password 'password'.

## Built With
- JavaScript
- React
- Redux
- Ruby on Rails
- PostgreSQL
- [React-Draggable](https://github.com/mzabriskie/react-draggable)
- [CarrierWave](https://github.com/carrierwaveuploader/carrierwave)
- [HTML2Canvas](https://html2canvas.hertzen.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://rubygems.org/gems/bcrypt/versions/3.1.12)
- [Semantic UI React](https://react.semantic-ui.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- CSS

## Author
- Betsy Sallee ([Github](https://github.com/ensallee))

## Acknowledgements
I would like to thank Jonathan Mines, Garry Clerge, and Mike Cheng of the Flatiron School for their help and support.
