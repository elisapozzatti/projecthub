mini saas chiamata "projecthub":
Piattaforma responsive (ancora da sviluppare) con:
-sviluppo applicazione fullstack per gestione progetti e task
-sistema di autenticazione e gestione ruoli (utente / admin)
-CRUD completo su progetti e task
-gestione stato task (todo, in review, done)
-API REST per comunicazione frontend-backend
-deploy dell’applicazione (Vercel, Render, MongoDB Atlas)

nella registrazione di un utente bisogna inserire l'id dell'organizzazione in modo che non possa accedere chiunque solo scegliendo il nome dell'organizzazione.

per provare utenti gia esistenti:
organizzazione APPLE: admin@apple.com (superuser) e luigi@apple.com (userdipendente) con password "password123" per entrambi.
organizzazione MILKA: admin@milka.com (superuser) e mario@milka.com (userdipendente) con password "password123" per entrambi.

i superuser sono gli unici a poter cancellare progetti o task.

ancora in sviluppo la cancellazione di utenti e organizzazioni.
