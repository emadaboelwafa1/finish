// المتغيرات العامة
const allowedLocations = [
    { lat: 31.2001, lng: 29.9187, radius: 10 }, // الإسكندرية
    { lat: 30.1233, lng: 31.2504, radius: 10 }, // شبرا الخيمة
    { lat: 30.0444, lng: 31.2357, radius: 20 }, // القاهرة بنطاق 20 كم
    { lat: 30.0282, lng: 31.2443, radius: 20 } // موقعك الحالي بدقة 20 كم
];

// دالة حساب المسافة بين نقطتين
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// دالة التحقق من الموقع بالنسبة للمواقع المسموح بها
function validateLocation(lat, lng) {
    for (const location of allowedLocations) {
        const distance = calculateDistance(lat, lng, location.lat, location.lng);
        console.log(`Distance to (${location.lat}, ${location.lng}): ${distance} km`);
        if (distance <= location.radius) {
            return true;
        }
    }
    return false;
}

// دالة الحصول على الموقع الحالي
function checkLocation() {
    if (!navigator.geolocation) {
        alert("المتصفح الخاص بك لا يدعم خاصية تحديد الموقع.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Current Position:", { latitude, longitude });

            // التحقق إذا كان الموقع ضمن النطاق المسموح
            if (validateLocation(latitude, longitude)) {
                document.getElementById("locationMessage").style.display = "none";
                document.getElementById("loginForm").style.display = "block";
            } else {
                alert("عذرًا، موقعك الحالي خارج النطاق المسموح به.");
            }
        },
        (error) => {
            console.error("Error retrieving location:", error);
            alert("يرجى السماح بخاصية تحديد الموقع من إعدادات المتصفح.");
        }
    );
}

// دالة التحقق من تسجيل الدخول
function validateLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === "admin" && password === "admin") {
        window.location.href = "https://forms.gle/tMXi6a6UDf3koxd37";
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
    return false; // منع إعادة تحميل الصفحة
}

// استدعاء دالة التحقق من الموقع عند تحميل الصفحة
checkLocation();
