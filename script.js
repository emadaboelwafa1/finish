// متغيرات عامة
const allowedLocations = [
    { lat: 31.2001, lng: 29.9187, radius: 10 }, // الإسكندرية
    { lat: 30.1233, lng: 31.2504, radius: 10 },  // شبرا الخيمة
    { lat: 30.0444, lng: 31.2357, radius: 20 }   // القاهرة بدائري 20 كيلو
];

// دالة للتحقق من الموقع الجغرافي
function validateLocation(lat, lng) {
    for (const location of allowedLocations) {
        const distance = calculateDistance(lat, lng, location.lat, location.lng);
        if (distance <= location.radius) {
            return true;
        }
    }
    return false;
}

// دالة لحساب المسافة بين نقطتين جغرافيتين
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// دالة لتحديد الموقع
function checkLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            if (validateLocation(latitude, longitude)) {
                document.getElementById("locationMessage").style.display = "none";
                document.getElementById("loginForm").style.display = "block";
            } else {
                alert("عذرًا، لا يمكن الوصول إلى النموذج من موقعك الحالي.");
            }
        },
        () => {
            alert("يرجى السماح بالوصول إلى الموقع.");
        }
    );
}

// دالة للتحقق من بيانات الدخول
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin") {
        document.getElementById("loginForm").style.display = "none";
        const iframe = document.getElementById("googleForm");
        iframe.src = "https://docs.google.com/forms/d/e/1FAIpQLSe1MF2zm5bVheW0f2gXCqZcypHe4Dr8B9fLn1q6RCkIJLRzbw/viewform";
        document.getElementById("formContainer").style.display = "block"; // إظهار النموذج

        iframe.onload = function() {
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        };
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
    return false;
}

checkLocation();
