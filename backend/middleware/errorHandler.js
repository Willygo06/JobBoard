// Middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log de l'erreur dans la console
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: {
        message: err.message || 'Erreur serveur',
        details: err.details || 'Une erreur est survenue. Veuillez réessayer plus tard.',
      },
    });
  };
  

  module.exports = errorHandler;