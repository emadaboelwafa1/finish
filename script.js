// متغيرات عامة
const secretKey = "MySecretKey"; // مفتاح التشفير
const allowedLocations = [
    { lat: 31.2001, lng: 29.9187, radius: 10 }, // الإسكندرية
    { lat: 30.1233, lng: 31.2504, radius: 10 }, // شبرا الخيمة
    { lat: 30.0444, lng: 31.2357, radius: 20 }  // القاهرة بدائري 20 كيلو
];

// دالة التحقق من الموقع بالنسبة للمواقع المسموح بها
function validateLocation(lat, lng) {
    for (const location of allowedLocations) {
        const distance = calculateDistance(lat, lng, location.lat, location.lng);
        console.log(`Distance to allowed location (${location.lat}, ${location.lng}): ${distance} km`);
        if (distance <= location.radius) {
            return true;
        }
    }
    return false;
}

// دالة لحساب المسافة بين نقطتين بناءً على إحداثيات خطوط الطول والعرض
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // المسافة بالكيلومترات
}

// دالة التحقق من الموقع الجغرافي
function checkLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Current Latitude:", latitude);
            console.log("Current Longitude:", longitude);
            if (validateLocation(latitude, longitude)) {
                document.getElementById("locationMessage").style.display = "none";
                document.getElementById("loginForm").style.display = "block";
            } else {
                alert("عذرًا، لا يمكن الوصول إلى النموذج من موقعك الحالي.");
            }
        },
        (error) => {
            console.error("Error obtaining location:", error.message);
            alert("يرجى السماح بالوصول إلى الموقع.");
        }
    );
}

// دالة التحقق من بيانات تسجيل الدخول
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin") {
        window.location.href = "https://forms.gle/tMXi6a6UDf3koxd37";
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
    return false; // منع إعادة تحميل الصفحة
}

// التحقق من الموقع عند تحميل الصفحة
checkLocation();
