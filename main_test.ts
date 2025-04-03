import { runServer } from "./main.ts";
import { assertEquals } from "@std/assert";

// Supprimer le premier test qui cause des fuites
// Deno.test(function addTest() {
//   runServer();
// });

Deno.test("Test du serveur HTTP", async () => {
  // Démarrer le serveur
  const server = await runServer();
  
  try {
    // Faire une requête au serveur
    const response = await fetch("http://localhost:4505");
    
    // Vérifier que la réponse est OK (status 200)
    assertEquals(response.status, 200);
    
    // Récupérer le corps de la réponse
    const body = await response.text();
    
    // Vérifier que le corps contient "Your user-agent is:"
    assertEquals(body.includes("Your user-agent is:"), true);
  } finally {
    // Arrêter proprement le serveur
    server.stop();
    try {
      await server.serverPromise;
    } catch (error: unknown) {
      // Ignorer l'erreur d'abort qui est normale
      if (error instanceof Error && !error.message.includes("aborted")) {
        throw error;
      }
    }
  }
});
