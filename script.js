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

        // ضبط ارتفاع الـ iframe بناءً على محتوى النموذج
        iframe.onload = function() {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const iframeHeight = iframeDoc.body.scrollHeight;
            iframe.style.height = iframeHeight + 'px';
        };
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
    return false;
}
