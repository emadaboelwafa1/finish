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

    if (users[username] && users[username].password === password) {
        const sessionDuration = users[username].sessionDuration;
        
        // رسالة ترحيب خاصة بالمستخدم
        document.getElementById("welcomeMessage").innerText = `أهلاً بيك مهندس ${username}`;
        document.getElementById("welcomeMessage").style.display = "block";

        // تحديد مدة الجلسة
        startSession(sessionDuration);

        document.getElementById("loginForm").style.display = "none";
        const iframe = document.getElementById("googleForm");
        iframe.src = "https://docs.google.com/forms/d/e/1FAIpQLSe1MF2zm5bVheW0f2gXCqZcypHe4Dr8B9fLn1q6RCkIJLRzbw/viewform";
        document.getElementById("formContainer").style.display = "block";
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
    return false;
}

// دالة لتحديد مدة الجلسة
function startSession(duration) {
    setTimeout(function() {
        alert("انتهت الجلسة.");
        window.location.reload(); // إعادة تحميل الصفحة بعد انتهاء الجلسة
    }, duration * 60 * 1000); // تحويل الدقائق إلى ميلي ثانية
}
