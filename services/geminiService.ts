
import { GreetingConfig, GeneratedGreeting } from "../types";

const API_ENDPOINT = "/api/generate-greeting";

export async function generateNewYearGreeting(config: GreetingConfig): Promise<GeneratedGreeting> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return {
      text: result.text || "祝您马年吉祥，万事如意！",
      idioms: result.idioms || ["马到成功", "万事如意"]
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      text: "恭祝您马年大吉，龙马精神，阖家欢乐，万事胜意！",
      idioms: ["马到成功", "龙马精神", "恭贺新禧", "大吉大利"]
    };
  }
}
