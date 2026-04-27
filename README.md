
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
