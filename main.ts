import { serve } from "server";

// Créer un serveur HTTP simple
export async function runServer() {
  const controller = new AbortController();
  const { signal } = controller;
  
  const handler = async (request: Request): Promise<Response> => {
    const body = `Your user-agent is:\n\n${request.headers.get(
      "user-agent",
    ) ?? "Unknown"}`;
    
    return new Response(body, { status: 200 });
  };

  const serverPromise = serve(handler, { port: 4505, signal });
  
  return {
    serverPromise,
    stop: () => controller.abort()
  };
}

// Ne démarrer le serveur que si ce fichier est exécuté directement
if (import.meta.main) {
  runServer();
}