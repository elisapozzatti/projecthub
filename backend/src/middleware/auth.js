import jwt from "jsonwebtoken";

/**
 * Middleware di autenticazione.
 * Estrae il token JWT dall'header Authorization e popola ctx.state.user.
 * Non blocca la richiesta in caso di errore, permettendo la gestione granulare
 * dell'accesso nelle rotte successive.
 */

async function auth(ctx, next) {
  const authHeader = ctx.headers.authorization;

  if (authHeader) {
    try {
      //rimuove il prefisso 'Bearer ' per ottenere solo il token
      const token = authHeader.replace("Bearer ", "");
      //verifica la validità del token tramite la chiave segreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      ctx.state.user = decoded;
    } catch (err) {
      ctx.state.user = null;
    }
  }

  await next();
}

export default auth;
