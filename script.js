// بيانات المستخدمين
const users = {
    "sameh": { password: "123", sessionDuration: 5 }, // الجلسة لمدة 5 دقائق
};

// مواقع مسموح بها
const locations = [
    { name: "Ramses", latitude: 30.0500, longitude: 31.2500, tolerance: 0.01 } // لوكيشن رمسيس مع مسافة 1 كم
];

// دالة لحساب المسافة بين نقطتين باستخدام Haversine formula
function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // المسافة بالكيلومتر
}

// دالة للتحقق من الموقع
function checkLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`الإحداثيات الحالية: Latitude: ${latitude}, Longitude: ${longitude}`); // عرض الإحداثيات
            if (validateLocation(latitude, longitude)) {
                document.getElementById("locationMessage").style.display = "none"; // إخفاء رسالة الموقع
                document.getElementById("loginForm").style.display = "block"; // إظهار نموذج الدخول
            } else {
                alert("عذرًا، لا يمكن الوصول إلى النموذج من موقعك الحالي.");
            }
        },
        () => {
            alert("يرجى السماح بالوصول إلى الموقع.");
        },
        { enableHighAccuracy: true } // تعزيز دقة الموقع
    );
}

// دالة للتحقق من صحة الموقع
function validateLocation(latitude, longitude) {
    // تحقق إذا كان الموقع ضمن المواقع المسموح بها
    for (let location of locations) {
        const distance = getDistanceInKm(latitude, longitude, location.latitude, location.longitude);
        console.log(`المسافة من الموقع الحالي إلى ${location.name}: ${distance} كم`);
        if (distance <= location.tolerance) {
            console.log(`الموقع متوافق مع: ${location.name}`);
            return true; // الموقع متوافق
        }
    }
    return false; // الموقع غير متوافق
}

// دالة للتحقق من بيانات الدخول
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        const welcomeMessage = document.getElementById("welcomeMessage");
        welcomeMessage.textContent = `مرحبًا، ${username}! تم تسجيل دخولك بنجاح.`;
        welcomeMessage.style.display = "block";

        // أخفِ نموذج تسجيل الدخول
        document.getElementById("loginForm").style.display = "none";

        // إظهار الـ iframe وتحميل النموذج داخل iframe
        const iframe = document.getElementById("protectedIframe");
        iframe.src = "https://forms.gle/tMXi6a6UDf3koxd37"; // رابط النموذج
        iframe.style.display = "block";

        return false; // منع إعادة تحميل الصفحة
    } else {
        alert("بيانات تسجيل الدخول غير صحيحة.");
        return false;
    }
}

// تشغيل التحقق من الموقع عند تحميل الصفحة
window.onload = checkLocation;
