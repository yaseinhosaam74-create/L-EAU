// بيانات الـ 16 عطر كاملة
const perfumes = [
    {id:1, name:"Sauvage", brand:"Dior", price:4500, img:"1.jpg", notes:"برغموت، فلفل"},
    {id:2, name:"Bleu de Chanel", brand:"Chanel", price:4800, img:"2.jpg", notes:"بخور، خشب الأرز"},
    {id:3, name:"YSL Myself", brand:"YSL", price:4200, img:"3.jpg", notes:"زهر برتقال، أخشاب"},
    {id:4, name:"Eros Flame", brand:"Versace", price:3800, img:"4.jpg", notes:"ليمون، فلفل أسود"},
    {id:5, name:"Wanted", brand:"Azzaro", price:3500, img:"5.jpg", notes:"زنجبيل، تفاح"},
    {id:6, name:"The Most Wanted", brand:"Azzaro", price:3900, img:"6.jpg", notes:"توفي، هيل"},
    {id:7, name:"Libre", brand:"YSL", price:4600, img:"7.jpg", notes:"خزامى، ياسمين"},
    {id:8, name:"Oud Wood", brand:"Tom Ford", price:8500, img:"8.jpg", notes:"عود، صندل"},
    {id:9, name:"Bad Boy", brand:"Herrera", price:4100, img:"9.jpg", notes:"كاكاو، فلفل أبيض"},
    {id:10, name:"Gucci Guilty", brand:"Gucci", price:4300, img:"10.jpg", notes:"لافندر، باتشولي"},
    {id:11, name:"Prada Black", brand:"Prada", price:4400, img:"11.jpg", notes:"عنبر، برغموت"},
    {id:12, name:"Gisada", brand:"Ambassador", price:5200, img:"12.jpg", notes:"مانجو، فيتيفير"},
    {id:13, name:"Stronger With You", brand:"Armani", price:3700, img:"13.jpg", notes:"فانيليا، كستناء"},
    {id:14, name:"Born In Roma", brand:"Valentino", price:4500, img:"14.jpg", notes:"زنجبيل، معادن"},
    {id:15, name:"Baccarat Rouge", brand:"MFK", price:9500, img:"15.jpg", notes:"زعفران، ياسمين"},
    {id:16, name:"Phantom", brand:"Rabanne", price:3900, img:"16.jpg", notes:"لافندر، ليمون"}
];

let cart = [];
let orders = JSON.parse(localStorage.getItem('user_orders')) || [];

// 1. توليد السلايدر والمتجر
const sliderTrack = document.getElementById('slider-track');
const grid = document.getElementById('perfume-grid');

perfumes.forEach(p => {
    sliderTrack.innerHTML += `<img src="${p.img}">`;
    grid.innerHTML += `
        <div class="p-card" onclick="openProduct(${p.id})">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p>${p.price} ج.م</p>
        </div>
    `;
});

// 2. نظام الـ Swipe في السلايدر
let startX, currentIdx = 0;
const sliderArea = document.getElementById('slider-area');

sliderArea.addEventListener('touchstart', e => startX = e.touches[0].clientX);
sliderArea.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50 && currentIdx < 15) currentIdx++;
    if (startX < endX - 50 && currentIdx > 0) currentIdx--;
    updateSlider();
});

function updateSlider() {
    sliderTrack.style.transform = `translateX(${currentIdx * 100}%)`;
    document.getElementById('slider-name').innerText = perfumes[currentIdx].name;
    // ضوء خلفي خافت يتغير مع السلايدر
    document.body.style.background = `radial-gradient(circle at top, ${currentIdx % 2 === 0 ? '#f0ece2' : '#e2eaf0'}, var(--bg))`;
}

// 3. التنقل بين الصفحات
function navTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // ربط أيقونة الناف بار النشطة
    const btns = document.querySelectorAll('.nav-btn');
    const pages = ['home', 'shop', 'orders', 'account', 'contact'];
    const idx = pages.indexOf(pageId);
    if(idx !== -1) btns[idx].classList.add('active');

    if(pageId === 'cart') renderCart();
    if(pageId === 'orders') renderOrders();
}

// 4. عرض تفاصيل المنتج (داخل الصفحة)
function openProduct(id) {
    const p = perfumes.find(x => x.id === id);
    navTo('product-view');
    document.getElementById('product-details-content').innerHTML = `
        <div class="detail-view-container">
            <button onclick="navTo('shop')" style="float:right; background:none; border:none; font-size:1.5rem;"><i class="fas fa-times"></i></button>
            <img src="${p.img}">
            <h1>${p.name}</h1>
            <p style="color:#888">${p.brand}</p>
            <p><strong>النوتات:</strong> ${p.notes}</p>
            <div class="size-btns">
                <button class="s-btn" onclick="updateP(this, ${p.price}, 0.5)">25ml</button>
                <button class="s-btn active" onclick="updateP(this, ${p.price}, 1)">50ml</button>
                <button class="s-btn" onclick="updateP(this, ${p.price}, 1.8)">100ml</button>
                <button class="s-btn" onclick="updateP(this, ${p.price}, 2.5)">150ml</button>
                <button class="s-btn" onclick="updateP(this, ${p.price}, 3)">200ml</button>
            </div>
            <h2 id="view-price">${p.price} ج.م</h2>
            <button class="buy-now-btn" onclick="addToCart(${p.id})">أضف للحقيبة</button>
        </div>
    `;
}

function updateP(btn, base, mult) {
    document.querySelectorAll('.s-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-price').innerText = Math.round(base * mult) + " ج.م";
}

// 5. العربة والطلبات
function addToCart(id) {
    const p = perfumes.find(x => x.id === id);
    const price = parseInt(document.getElementById('view-price').innerText);
    cart.push({ ...p, finalPrice: price });
    document.getElementById('cart-count').innerText = cart.length;
    navTo('cart');
}

function renderCart() {
    const list = document.getElementById('cart-list');
    let total = 0;
    list.innerHTML = cart.map((item, i) => {
        total += item.finalPrice;
        return `<div class="p-card" style="display:flex; align-items:center; margin-bottom:10px; width:100%; text-align:right;">
            <img src="${item.img}" style="width:60px; height:60px; margin-left:15px;">
            <div style="flex:1"><b>${item.name}</b><br>${item.finalPrice} ج.م</div>
            <button onclick="cart.splice(${i},1); renderCart();" style="border:none; background:none; color:red;"><i class="fas fa-trash"></i></button>
        </div>`;
    }).join('');
    document.getElementById('total-price').innerText = total;
}

function checkout() {
    if(cart.length === 0) return;
    const orderID = "LURA-" + Math.floor(Math.random() * 89999 + 10000);
    const orderData = { id: orderID, total: document.getElementById('total-price').innerText, date: new Date().toLocaleDateString() };
    orders.unshift(orderData);
    localStorage.setItem('user_orders', JSON.stringify(orders));
    
    // توجيه للواتساب
    const msg = `طلب جديد: ${orderID}\nالإجمالي: ${orderData.total} ج.م\nالمنتجات:\n${cart.map(c=>c.name).join('\n')}`;
    window.open(`https://wa.me/2012345678?text=${encodeURIComponent(msg)}`);
    
    cart = [];
    document.getElementById('cart-count').innerText = 0;
    navTo('orders');
}

function renderOrders() {
    const hist = document.getElementById('orders-history');
    hist.innerHTML = orders.map(o => `
        <div class="p-card" style="width:100%; margin-bottom:10px; text-align:right; padding:20px;">
            <b>طلب رقم: ${o.id}</b><br>
            <small>التاريخ: ${o.date}</small><br>
            <span style="color:var(--accent)">الإجمالي: ${o.total} ج.م</span>
        </div>
    `).join('') || "<p style='text-align:center'>لا يوجد طلبات سابقة</p>";
}

// 6. الحساب
function setAuth(type) {
    document.getElementById('btn-login').classList.toggle('active', type==='login');
    document.getElementById('btn-reg').classList.toggle('active', type==='reg');
    const form = document.getElementById('auth-form');
    if(type === 'login') {
        form.innerHTML = `<input type="text" placeholder="الاسم أو الإيميل" style="width:100%; padding:15px; margin-bottom:15px; border-radius:10px; border:1px solid #eee;">
                          <input type="password" placeholder="كلمة المرور" style="width:100%; padding:15px; margin-bottom:15px; border-radius:10px; border:1px solid #eee;">
                          <button class="buy-now-btn">دخول</button>`;
    } else {
        form.innerHTML = `<input type="text" placeholder="الاسم الكامل" style="width:100%; padding:15px; margin-bottom:10px; border-radius:10px; border:1px solid #eee;">
                          <input type="email" placeholder="الإيميل" style="width:100%; padding:15px; margin-bottom:10px; border-radius:10px; border:1px solid #eee;">
                          <select style="width:100%; padding:15px; margin-bottom:10px; border-radius:10px; border:1px solid #eee;">
                            <option>🇪🇬 مصر</option><option>🇸🇦 السعودية</option>
                          </select>
                          <input type="number" placeholder="العمر" style="width:100%; padding:15px; margin-bottom:10px; border-radius:10px; border:1px solid #eee;">
                          <input type="password" placeholder="كلمة المرور" style="width:100%; padding:15px; margin-bottom:10px; border-radius:10px; border:1px solid #eee;">
                          <button class="buy-now-btn">إنشاء حساب</button>`;
    }
}
setAuth('login'); // تعيين الحالة الافتراضية

function toggleTheme() { document.body.classList.toggle('dark-mode'); }
