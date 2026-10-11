# رسا پنل — Rasa Panel

این بسته شامل سورس کامل بک‌اند، فرانت، CLI، مهاجرت‌های دیتابیس و تست‌های پروژه است.
لوگوی ارائه‌شده در ورود، منو، آیکن مرورگر و PWA قرار گرفته است.
تم روشن/تیره و قابلیت‌های پنل حفظ شده‌اند؛ گوشه‌ها کمی نرم‌تر شده‌اند.

## راه‌اندازی روی سرور لینوکس دارای Docker Compose

```bash
cp .env.example .env
mkdir -p data/certs
```

گواهی معتبر HTTPS و کلید آن را داخل data/certs قرار دهید.
در .env مقدار UVICORN_HOST، UVICORN_PORT و این دو مسیر را تنظیم کنید:

```dotenv
UVICORN_HOST=0.0.0.0
UVICORN_PORT=8443
UVICORN_SSL_CERTFILE=/var/lib/rasa-panel/certs/fullchain.pem
UVICORN_SSL_KEYFILE=/var/lib/rasa-panel/certs/key.pem
```

```bash
docker compose up -d --build
docker compose exec rasa-panel python rasa-cli.py generate-temp-key
```

صفحه https://YOUR_DOMAIN:8443/dashboard/ را باز کنید و با کلید موقت، مالک پنل را بسازید.
دیتابیس پیش‌فرض SQLite در data/db.sqlite3 ذخیره می‌شود.
برای دیتابیس دیگر، SQLALCHEMY_DATABASE_URL را در .env تنظیم کنید.
نودها جداگانه نصب می‌شوند؛ سازگاری با وابستگی نود اصلی حفظ شده است.

## برند و گیت‌هاب

در interface/src/constants/Project.ts این موارد را تکمیل کنید:
- repository: لینک مخزن سورس رسا
- organization: لینک حساب/سازمان گیت‌هاب
- nodeRepository: مخزن نود در صورت داشتن نسخه شخصی
- documentation: سایت مستندات
- support: لینک پشتیبانی
- donation: لینک حمایت مالی
- adsRepository: مخزن محتوای اعلان‌ها، با ساختار سازگار

تا زمان تکمیل، دریافت خودکار نسخه و تبلیغات برند قبلی انجام نمی‌شود.
پس از تغییر برند، فرانت را دوباره بسازید؛ فایل تنظیمات زمان build خوانده می‌شود.
Workflow رسا برای انتشار image در GHCR داخل .github/workflows/rasa-release.yml است.
مخزن سورس: https://github.com/RasaPanel/panel
نام‌های فنی وابستگی‌های اصلی و شناسه‌های سازگاری NATS حفظ شده‌اند.
مجوز، انتساب اصلی و توضیح تغییرات در LICENSE و NOTICE موجودند.
قبل از استفاده عمومی، لینک سورس متناظر را برای کاربران تنظیم کنید.

## محدودیت اعتبارسنجی

گزارش دقیق ساخت و تست داخل VALIDATION.md آمده است.
این بسته روی سرور شما و با نود واقعی هنوز آزمایش نشده است.

پشتیبانی رسا: https://t.me/dev_vexel
سازمان گیت‌هاب: https://github.com/RasaPanel
مخزن: RasaPanel/panel. مستندات فعلاً تنظیم نشده‌اند.

در دریافت سورس با git clone، ابتدا Bun را نصب و فرانت را با bun install --frozen-lockfile و VITE_BASE_API=/ bun run build در پوشه interface بسازید، سپس Docker را اجرا کنید.
