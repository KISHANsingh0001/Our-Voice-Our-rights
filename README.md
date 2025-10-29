<div align="center">

# 🗣️ Our Voice, Our Rights

### MGNREGA Performance Data Visualization Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-7.0-red?style=for-the-badge&logo=redis)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Empowering rural communities with transparent access to MGNREGA data**

[🚀 Live Demo](https://our-voice-our-rights-indol.vercel.app/) • [📖 Documentation](#documentation) • [🐛 Report Bug](#) • [✨ Request Feature](#)

</div>

---

## 📸 Application Screenshots

<div align="center">

### 🏠 Home Page - Hero 

Section<img width="1462" height="799" alt="Screenshot 2025-10-29 at 3 31 12 PM" src="https://github.com/user-attachments/assets/350c911b-fa3b-4715-8dd5-2020dc844d21" />
*Beautiful gradient hero with stats and multilingual support*

### 🗺️ District 
<img width="1457" height="643" alt="Screenshot 2025-10-29 at 3 32 07 PM" src="https://github.com/user-attachments/assets/5fb34948-03ae-4a5a-a5b8-795cbbfa275e" />
Selector

*Intuitive district selection with search and geolocation*

### 📊 Performance Dashboard
<img width="1240" height="673" alt="Screenshot 2025-10-29 at 3 33 06 PM" src="https://github.com/user-attachments/assets/9dae6a3d-3157-4678-9c66-0b0cf9129f96" />
*Comprehensive metrics with visual indicators*

### ℹ️ About MGNREGA
<img width="970" height="783" alt="Screenshot 2025-10-29 at 3 33 53 PM" src="https://github.com/user-attachments/assets/dad2a259-60b3-49c2-b626-613d8d23101e" />
*Educational content about MGNREGA scheme*

</div>

---

https://github.com/user-attachments/assets/2530595e-f9a1-4678-9719-21977be101dd
## 🎥 Demo Video

<div align="center">



**Click to watch full demo** *(3 minutes)*

</div>

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🌐 Multilingual Support
- **English** and **Hindi** interface
- Seamless language switching
- Localized content and numbers
- Voice support coming soon

</td>
<td width="50%">

### 📊 Real-time Data
- Live MGNREGA performance metrics
- District-wise detailed analytics
- Historical data comparison
- API-powered updates

</td>
</tr>
<tr>
<td width="50%">

### 🗺️ Location Services
- Auto-detect user's district
- Manual district selection
- Search across 700+ districts
- State-wise filtering

</td>
<td width="50%">

### ⚡ Lightning Fast
- Redis caching layer
- MongoDB data optimization
- 99.9% uptime guarantee
- < 100ms response time

</td>
</tr>
<tr>
<td width="50%">

### 📱 Mobile First
- Responsive design
- Touch-optimized UI
- Offline support (PWA)
- Works on 2G networks

</td>
<td width="50%">

### 🎨 Beautiful UI
- Modern gradient design
- Smooth animations
- Accessibility compliant
- Dark mode support

</td>
</tr>
</table>

---

## 🏗️ Architecture

```mermaid
graph TB
    A[User Browser] --> B[Next.js Frontend]
    B --> C{Cache Layer}
    C -->|Hit| D[Redis Cache]
    C -->|Miss| E[MongoDB]
    E --> F[Data.gov.in API]
    D --> G[Response]
    E --> G
    F --> H[Sync Service]
    H --> E
    
    style A fill:#4F46E5
    style B fill:#EC4899
    style D fill:#EF4444
    style E fill:#10B981
    style F fill:#F59E0B
```

---

## 🛠️ Technology Stack

<table>
<tr>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="60">
<br><strong>Next.js 14</strong>
<br><sub>React Framework</sub>
</td>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="60">
<br><strong>TypeScript</strong>
<br><sub>Type Safety</sub>
</td>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="60">
<br><strong>MongoDB</strong>
<br><sub>Database</sub>
</td>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="60">
<br><strong>Redis</strong>
<br><sub>Caching</sub>
</td>
</tr>
<tr>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="60">
<br><strong>Tailwind CSS</strong>
<br><sub>Styling</sub>
</td>
<td align="center" width="25%">
<img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" width="60">
<br><strong>Framer Motion</strong>
<br><sub>Animations</sub>
</td>
</tr>
</table>

---
## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Our Voice, Our Rights

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---
---

## 🙏 Acknowledgments

- **Data.gov.in** - For providing MGNREGA open data
- **Ministry of Rural Development** - For MGNREGA program
- **Open Source Community** - For amazing tools and libraries
- **Contributors** - Thank you for your contributions!

---



<div align="center">

### ⭐ Star us on GitHub — it motivates us a lot!

Made with Kishan Singh Thakur ❤️ in India 🇮🇳



</div>
