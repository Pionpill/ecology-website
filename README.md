# ecology-website

> Minecraft 生态模组百科网站 | Wiki website for Minecraft Ecology Addon

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vite.dev/)

---

## 简介 | Introduction

**ecology-website** 是 [Minecraft Ecology 模组](https://github.com/Pionpill/ecology-mc) 的官方百科网站，提供交互式的群落（Biome）与作物（Plant）数据浏览、筛选和可视化功能，是玩家和开发者了解模组内容的官方攻略平台。

**ecology-website** is the official wiki website for the [Minecraft Ecology addon](https://github.com/Pionpill/ecology-mc). It provides interactive browsing, filtering, and visualization of Biome and Plant data, serving as the official guide for players and developers.

🌐 **在线访问 | Live Site**: [https://pionpill.github.io/ecology-website/](https://pionpill.github.io/ecology-website/)

---

## 功能特性 | Features

### 🌍 群落百科 | Biome Wiki
- **仪表盘视图**：以卡片、列表、表格、图形等多种形式浏览所有生物群落
- **高级筛选**：按分类、标签、温度范围、湿度范围、维度、生成概率等条件过滤
- **数据可视化**：
  - 温度 / 湿度柱状图
  - 分类生成率树状图
  - 群落环境预览折线图（支持按时间段查看）
- **群落详情**：查看单个群落的气候数据、适宜作物列表及种植统计信息

### 🌱 作物百科 | Plant Wiki
- 浏览模组中所有可种植的作物
- 查看作物的生长速率、适宜群落等属性

### 🖥️ 通用功能 | General
- **双语支持**：中文 / English 切换
- **明暗主题**：支持深色 / 浅色模式
- **响应式设计**：自适应桌面端和移动端
- **联系 / 加入**：提供微信、QQ 等社群联系方式

---

## 技术栈 | Tech Stack

| 类别 | 技术 |
|------|------|
| 前端框架 | [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/) |
| 构建工具 | [Vite 6](https://vite.dev/) |
| 样式 | [TailwindCSS 4](https://tailwindcss.com/) |
| UI 组件 | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| 图标 | [Lucide React](https://lucide.dev/) |
| 路由 | [React Router 7](https://reactrouter.com/) |
| 状态管理 | [Zustand 5](https://zustand-demo.pmnd.rs/) |
| 国际化 | [react-i18next](https://react.i18next.com/) |
| 数据表格 | [TanStack Table 8](https://tanstack.com/table) |
| 图表 | [Recharts 3](https://recharts.org/) |
| 数据源 | [@ecology-mc/data](https://www.npmjs.com/package/@ecology-mc/data) |
| 部署 | [GitHub Pages](https://pages.github.com/) |

---

## 快速开始 | Getting Started

### 前置条件 | Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 9（推荐）或 npm

### 安装依赖 | Install

```bash
pnpm install
# 或 or
npm install
```

### 开发模式 | Development

```bash
pnpm dev
# 或 or
npm run dev
```

启动后访问 | Open: [http://localhost:5173/ecology-website/](http://localhost:5173/ecology-website/)

### 构建 | Build

```bash
pnpm build
# 或 or
npm run build
```

构建产物输出至 `dist/` 目录。

### 代码检查 | Lint

```bash
pnpm lint
# 或 or
npm run lint
```

### 部署 | Deploy

```bash
pnpm deploy
# 或 or
npm run deploy
```

自动构建并部署到 GitHub Pages。

---

## 项目结构 | Project Structure

```
src/
├── app/
│   ├── view/          # 布局与顶部导航
│   └── wiki/          # 百科内容
│       ├── biome/     # 群落模块（仪表盘 + 详情）
│       └── plant/     # 作物模块（仪表盘）
├── components/
│   ├── ui/            # shadcn/ui 基础组件
│   ├── shared/        # 自定义公共组件
│   ├── icon/          # 自定义图标
│   └── svg/           # SVG 图案
├── hooks/             # 自定义 React Hooks（主题、语言、设备等）
├── i18n/              # 国际化翻译文件（en.json / zh.json）
├── lib/               # 工具函数与常量
├── utils/             # 数据处理工具（群落、作物、物品等）
├── routes.tsx         # 路由定义
└── main.tsx           # 应用入口
```

---

## 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

Feel free to open Issues and Pull Requests!

---

## 许可证 | License

本项目基于 [MIT License](./LICENSE) 开源。

This project is licensed under the [MIT License](./LICENSE).

Copyright © 2025 [pionpill](https://github.com/Pionpill)
