import process from "node:process";

function readEnv(primary: string, fallback?: string): string | undefined {
  const value = process.env[primary] ?? (fallback ? process.env[fallback] : undefined);
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function readEnvBool(primary: string, fallback?: string): boolean {
  const value = readEnv(primary, fallback);
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    groqApiKey: readEnv("GROQ_API_KEY", "VITE_GROQ_API_KEY"),
    googleGenerativeAiApiKey: readEnv(
      "GOOGLE_GENERATIVE_AI_API_KEY",
      "VITE_GOOGLE_GENERATIVE_AI_API_KEY",
    ),
    supabaseUrl: readEnv("SUPABASE_URL", "VITE_SUPABASE_URL"),
    supabaseServiceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
    globalSearchEnabled: readEnvBool("GLOBAL_SEARCH_ENABLED", "VITE_GLOBAL_SEARCH_ENABLED"),
  };
}

export function syncServerEnvToProcess(): void {
  const config = getServerConfig();

  if (!process.env.GROQ_API_KEY && config.groqApiKey) {
    process.env.GROQ_API_KEY = config.groqApiKey;
  }
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && config.googleGenerativeAiApiKey) {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = config.googleGenerativeAiApiKey;
  }
  if (!process.env.SUPABASE_URL && config.supabaseUrl) {
    process.env.SUPABASE_URL = config.supabaseUrl;
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && config.supabaseServiceRoleKey) {
    process.env.SUPABASE_SERVICE_ROLE_KEY = config.supabaseServiceRoleKey;
  }
}
