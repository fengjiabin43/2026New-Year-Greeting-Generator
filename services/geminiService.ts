
import { GreetingConfig, GeneratedGreeting } from "../types";

const API_ENDPOINT = "/api/generate-greeting";

export async function generateNewYearGreeting(config: GreetingConfig): Promise<GeneratedGreeting> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 500) {
        // 后端错误，返回兜底祝福
        return {
          text: "恭祝您马年大吉，龙马精神，阖家欢乐，万事胜意！",
          idioms: ["马到成功", "龙马精神", "恭贺新禧", "大吉大利"]
        };
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return {
      text: result.text || "祝您马年吉祥，万事如意！",
      idioms: result.idioms || ["马到成功", "万事如意"]
    };
  } catch (error) {
    console.error("API Error:", error);
    // 任何错误都返回兜底祝福
    return {
      text: "恭祝您马年大吉，龙马精神，阖家欢乐，万事胜意！",
      idioms: ["马到成功", "龙马精神", "恭贺新禧", "大吉大利"]
    };
  }
}
