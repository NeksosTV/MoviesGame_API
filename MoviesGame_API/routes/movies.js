const sql = require('mssql/msnodesqlv8');
const dbConnect = require('./../connection/dbConnect');
const APIrequest = require('https')
const prefix = '/movies/';
const dbConfig = require('../connection/dbConfig');

//Route pour nom de film
const moviesRoute = (app) =>{
    app.get(`${prefix}`,
        (req, res) => {
            let request = new sql.Request(dbConnect(dbConfig.pivdatabase));
            request.query('SELECT * FROM TwoRandomFilms', 
                (err, result) => {
                    if (err) console.log(err);
                    else res.send(result.recordset);
                }
            );
        }
    );    

// resultat des réponse donnée depuis l'appli
    app.post(`${prefix}result`,
    (req, res) => {
        let request = new sql.Request(dbConnect(dbConfig.pivdatabase));
        request.query("INSERT INTO [game.round] VALUES(\'"+req.body.movie_id_1+"\', \'"+req.body.movie_id_2+"\', \'"+req.body.resultat+"\',GETDATE(),1)", 
            (err, result) => {
                if (err) console.log(err);
                else res.send(result.recordset);
            }
        );
    }
    );  


//Ajoute d'user
    app.post(`${prefix}User`,
    (req, res) => {
        let body = req.body;
        let request = new sql.Request(dbConnect(dbConfig.Webdatabase));
        request.query(`INSERT INTO [dbo.Utilisateur] (PK_Utilisateur, Nom, Prenom, DateNaiss, Email, Password, 
            Pseudo)  VALUES (${body.PK_Utilisateur},'${body.Nom}','${body.Prenom}','${body.DateNaiss}','${body.Email}','${body.Password}','${body.Pseudo}')`,
            (err, result) => {
                if (err) console.log(err);
                else res.send(result.rowsAffected);
            }
        );
    }
    );  
 
////////////////////////////////////////////
    app.post(`${prefix}check`,
    (req, res) => {
        let input = req.body;
        console.log(input);
        let request = new sql.Request(dbConnect(dbConfig.Webdatabase));
        request.query(`SELECT PK_Utilisateur  
        [Nom]
        ,[Prenom]
        ,[DateNaiss]
        ,[Email]
        ,[Password]
        ,[Pseudo]
        FROM Utilisateur 
        WHERE Email =  ${input.Email} AND Password = HASHYBYTES('SHA2_256', ${input.Password})`, 
            (err, result) => {
                if (err) console.log(err);
                else res.send(result.recordset);
            }
        );
    }
    );  



//Router pour les note des films (Rating)
app.get(`${prefix}Rating`,
(req, res) => {
    let request = new sql.Request(dbConnect(dbConfig.pivdatabase));
    request.query('SELECT [averageRating],[numVotes] FROM [movie_database_staging].[dbo].[title.ratings]', 
        (err, result) => {
            if (err) console.log(err);
            else res.send(result.recordset);
        }
    );
}
); 

// Rout pour avoir l'url des image par 1 film
app.get(`${prefix}image/:id`, 
(req, res) => {
    let id = parseInt(req.params.id);
    APIrequest.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=353fa134b379efe9681e148eddd45ad3`,
    (response) => {
        let data = ""
        response.on("data", pieces => data += pieces)
        response.on("end", () => res.send(JSON.parse(data).backdrops[0].file_path))  // .backdrops[0].file_path permet d'avoir que les file_path 
    }) 
}
)


// Route pour avoir l'id de un seul film
    app.get(`${prefix}:id`,
        (req, res) => {
            let id = parseInt(req.params.id);
            let request = new sql.Request(dbConnect(dbConfig.pivdatabase));
            request.query(`SELECT  TOP 1000  
            [originalTitle]
            ,[startYear]
            ,[runtimeMinutes]
            ,[genres]
            FROM [movie_database_staging].[dbo].[title.basics]
            WHERE [id] =  ${id}`, 
                (err, result) => {
                    if (err) console.log(err);
                    else if(result.recordset.length > 0) res.send(result.recordset[0]);
                    else res.send({error: "Pas d'élément avec cet identifiant"})
                }
            );

        }
    );
}

module.exports = moviesRoute;