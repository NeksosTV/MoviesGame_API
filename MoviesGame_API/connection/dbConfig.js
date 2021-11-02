// Fichier de configuration du serveur

const dbConfig = {pivdatabase:{
    server : "localhost",
    database : "movie_database_staging",
    driver : "msnodesqlv8",
    options : {
         trustedConnection : true 
    }
    }, Webdatabase:{
        server : "localhost",
        database : "LaboFinaleMovieGame",
        driver : "msnodesqlv8",
        options : {
            trustedConnection : true 
        }
  }
}

module.exports = dbConfig;