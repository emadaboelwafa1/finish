// بيانات المستخدمين
const users = {
    "أحمد": { password: "123", sessionDuration: 5 }, // الجلسة لمدة 5 دقائق
};

// دالة للتحقق من الموقع
function checkLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            if (validateLocation(latitude, longitude)) {
                document.getElementById("locationMessage").style.display = "none";
                document.getElementById("loginForm").style.display = "block";

                // تحميل النموذج داخل iframe
                const iframe = document.getElementById("protectedIframe");
                iframe.src = "https://forms.gle/tMXi6a6UDf3koxd37"; // ضع رابط النموذج هنا
                iframe.style.display = "block";
            } else {
                alert("عذرًا، لا يمكن الوصول إلى النموذج من موقعك الحالي.");
            }
        },
        () => {
            alert("يرجى السماح بالوصول إلى الموقع.");
        }
    );
}

// دالة للتحقق من صحة الموقع
function validateLocation(latitude, longitude) {
    // تحقق من الإحداثيات المطلوبة
    const allowedLatitude = 31.215; // قم بتحديث القيمة حسب موقعك
    const allowedLongitude = 29.924; // قم بتحديث القيمة حسب موقعك
    const tolerance = 0.05; // نطاق السماح

    return (
        Math.abs(latitude - allowedLatitude) <= tolerance &&
        Math.abs(longitude - allowedLongitude) <= tolerance
    );
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

        return false; // منع إعادة تحميل الصفحة
    } else {
        alert("بيانات تسجيل الدخول غير صحيحة.");
        return false;
    }
}
