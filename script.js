// 1. بيانات العطور (الـ 16 عطر)
const perfumes = [];
for (let i = 1; i <= 16; i++) {
    perfumes.push({
        id: i,
        name: عطر رقم ${i},
        img: ${i}.jpg,
        notes: "الياسمين، خشب الصندل، المسك الأبيض، لمسات من العنبر الفاخر.",
        basePrice: 1200 + (i * 50)
    });
}

// 2. تعبئة السلايدر في الرئيسية
const sliderWrapper = document.getElementById('slider-wrapper');
perfumes.forEach(p => {
    const img = document.createElement('img');
    img.src = p.img;
    sliderWrapper.appendChild(img);
});

// تحريك السلايدر تلقائياً
let slideIndex = 0;
setInterval(() => {
    slideIndex = (slideIndex + 1) % 16;
    sliderWrapper.style.transform = translateX(${slideIndex * 100}%);
}, 3500);

// 3. تعبئة المتجر
const grid = document.getElementById('products-grid');
perfumes.forEach(p => {
    const item = document.createElement('div');
    item.className = 'p-card';
    item.onclick = () => openProduct(p);
    item.innerHTML = 
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>${p.basePrice} ج.م</p>
    ;
    grid.appendChild(item);
});

// 4. وظيفة التنقل بين الصفحات
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// 5. فتح تفاصيل المنتج
function openProduct(p) {
    navigateTo('product-details');
    document.getElementById('det-img').src = p.img;
    document.getElementById('det-title').innerText = p.name;
    document.getElementById('det-notes').innerText = p.notes;
    const priceEl = document.getElementById('det-price');
    priceEl.innerText = p.basePrice;

    // تفعيل أزرار الحجم
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.onclick = () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const multiplier = btn.getAttribute('data-multiplier');
            priceEl.innerText = Math.round(p.basePrice * multiplier);
        };
    });
}

// 6. تبديل الفورم في صفحة الحساب
function toggleAuth(type) {
    document.getElementById('login-box').classList.remove('active');
    document.getElementById('reg-box').classList.remove('active');
    document.getElementById('tab-login').classList.remove('active');
    document.getElementById('tab-reg').classList.remove('active');

    if(type === 'login') {
        document.getElementById('login-box').classList.add('active');
        document.getElementById('tab-login').classList.add('active');
    } else {
        document.getElementById('reg-box').classList.add('active');
        document.getElementById('tab-reg').classList.add('active');
    }
}