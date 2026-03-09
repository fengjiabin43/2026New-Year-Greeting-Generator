
# 马年新春贺岁 - 祝福语生成器

一个使用智谱 AI GLM-5 的智能马年新春祝福语生成器。

## 功能特点

- 🐎 生成个性化的马年新春祝福语
- 🎯 支持多种祝福对象（长辈、领导、好友、同事等）
- 🎨 多种表达风格可选（传统庄重、幽默风趣、文雅诗意、简约现代）
- ✍️ 支持自定义备注，让祝福更有针对性
- 🔐 后端使用 Vercel Serverless 函数，保护 API Key 安全

## 本地开发

### 前置要求

- Node.js 18+

### 安装步骤

1. 安装依赖：
   ```bash
   npm install
   ```

2. 配置环境变量：
   - 复制 `.env.example` 为 `.env.local`
   - 在 `.env.local` 中填入你的智谱 AI API Key
     ```
     ZHIPU_API_KEY=your_api_key_here
     ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 在浏览器中打开 http://localhost:3000

## 部署到 Vercel

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

### 手动部署步骤

1. 将代码推送到 GitHub 仓库

2. 在 Vercel 中导入项目

3. 在 Vercel 项目设置中添加环境变量：
   - `ZHIPU_API_KEY`：你的智谱 AI API Key
   - `ZHIPU_ENDPOINT`：https://open.bigmodel.cn/api/paas/v4/chat/completions
   - `ZHIPU_MODEL`：glm-5

4. 部署！

## 获取 API Key

1. 访问 [智谱 AI 开放平台](https://open.bigmodel.cn/)
2. 注册并登录账号
3. 在控制台中创建 API Key
4. 将 API Key 配置到环境变量中

## 项目结构

```
├── api/              # Vercel Serverless 函数
│   └── generate-greeting.ts
├── components/       # React 组件
├── services/         # 前端服务
├── App.tsx           # 主应用组件
├── vercel.json       # Vercel 配置
└── .env.example      # 环境变量示例
```

## 安全说明

- ✅ API Key 存储在 Vercel 后端环境变量中
- ✅ GitHub 仓库中不包含任何敏感信息
- ✅ 前端只调用 Serverless 函数，不直接访问智谱 AI API

## 技术栈

- React 19
- TypeScript
- Vite
- Vercel Serverless Functions
- 智谱 AI GLM-5

