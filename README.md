# 💰 Expense Tracker App

A full-stack mobile application for tracking expenses with offline support, real-time dashboard, and JWT authentication.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1B1F1F?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---

## 📱 Quick Installation (Client / Evaluator)

### Method 1: QR Code (Easiest - 1 Minute)

1. **Install Expo Go** from your app store:
   - [📲 Android (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [🍎 iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)

2. **Scan this QR Code** with Expo Go:

![QR Code](qr-code.png)

*Run `npx expo start --tunnel` to generate fresh QR code if expired*

3. **App will open automatically!** No installation needed.

### Method 2: Direct APK Download
- APK file available upon request
- Can be installed directly on Android phones

---

## 🌐 Live Backend API (24x7 Online)

**Base URL:** `https://expensetracker-w6nh.onrender.com/api`

### Test the API:

```bash
# Register a new user
curl -X POST https://expensetracker-w6nh.onrender.com/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Test","email":"test@example.com","password":"123456"}'

# Login
curl -X POST https://expensetracker-w6nh.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"123456"}'
qr-code.png.png
