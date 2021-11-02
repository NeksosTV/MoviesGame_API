// Fichier de configuration des routes

const moviesRoute = require('./movies');

const appRoutes = (app) => {
    app.get('/',
        (req, res) => {
            let accueil = { 
                description : "Bienvenue sur L'API de MoviesGame, vous pourrez accèder aux information des films  avec l url: http://localhost:3000/",
                routes : 
                {
                    movies : "http://localhost:3000/Movies",
                    "movies-by-Title" : "http://localhost:3000/Movies/Title",
                    // "movies-by-Category" : "http://localhost:3000/Movies/Details",
                    // "movies-by-id" : "http://localhost:3000/Movies/:id",
                    // "movies-by-genre" : "http://localhost:3000/Movies/genre_name"

                }
            };     
            res.send(accueil);
        }
    );

    moviesRoute(app); //Fais appel a la route moviesRoute qui se trouve dans le fichier movies.js
};

module.exports = appRoutes;