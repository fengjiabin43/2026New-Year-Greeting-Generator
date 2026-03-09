
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || '';
const ZHIPU_ENDPOINT = process.env.ZHIPU_ENDPOINT || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const ZHIPU_MODEL = process.env.ZHIPU_MODEL || 'glm-5';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const config = req.body;
    const recipientDisplay = config.recipient === 'other' ? (config.customRecipient || "特别的朋友") : config.recipient;
    const styleDisplay = config.style === 'other' ? (config.customStyle || "个性化风格") : config.style;

    const remarksSection = config.remarks 
      ? `用户提供的个性化背景/需求：${config.remarks}。请务必将这些信息自然地融合在祝福语中，使其显得更真诚且具有针对性。`
      : "没有提供额外备注，请根据身份生成通用的精美祝福。";

    const emojiInstruction = (config.style === 'humorous' || (config.style === 'other' && config.customStyle?.includes('幽默')))
      ? "由于风格定位活泼，请在文字中适当插入生动有趣的表情符号（如：🐎, 🧧, 🧨, 💰, 🍱, 😂, 🚀, ✨ 等），使祝福语显得更加活泼、接地气。" 
      : "请保持文字符合所选风格的要求，除非风格本身需要表情符号，否则保持优美大方。";

    const prompt = `
      任务：为2026马年编写春节祝福语。
      对象：${recipientDisplay}
      风格：${styleDisplay}
      语气：${config.tone === 'formal' ? '正式庄重' : config.tone === 'warm' ? '亲切温馨' : '简练有力'}
      ${remarksSection}
      ${emojiInstruction}
      
      要求：
      1. 必须包含至少一个与"马"相关的成语或吉利话（如：马到成功、龙马精神、一马当先、策马扬鞭）。
      2. 语言需精准契合用户要求的风格（${styleDisplay}）。
      3. 如果对象是领导、客户或正式称呼，要得体稳重；如果是朋友或亲近的人，可以活泼。
      4. 不要包含任何敏感词汇。
      5. 返回格式为JSON，包含 'text' (完整的祝福语全文) 和 'idioms' (使用的4个核心成语列表)。
    `;

    const messages = [
      { role: "system", content: "你是一个专业的春节祝福语生成助手，擅长创作马年新春祝福语。" },
      { role: "user", content: prompt }
    ];

    const response = await fetch(ZHIPU_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
        model: ZHIPU_MODEL,
        messages,
        stream: false,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          result = JSON.parse(match[0]);
        } catch (e) {
          result = {
            text: content || "恭祝您马年大吉，龙马精神，阖家欢乐，万事胜意！",
            idioms: ["马到成功", "龙马精神", "恭贺新禧", "大吉大利"]
          };
        }
      } else {
        result = {
          text: content || "恭祝您马年大吉，龙马精神，阖家欢乐，万事胜意！",
          idioms: ["马到成功", "龙马精神", "恭贺新禧", "大吉大利"]
        };
      }
    }

    res.status(200).json({
      text: result.text || "祝您马年吉祥，万事如意！",
      idioms: result.idioms || ["马到成功", "万事如意"]
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      text: "恭祝您马年大吉，龙马精神，阖家欢乐，万事胜意！",
      idioms: ["马到成功", "龙马精神", "恭贺新禧", "大吉大利"]
    });
  }
}
