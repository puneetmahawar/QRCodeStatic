// Default credentials
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "1234";

// Login page
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if(username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD){
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = "home.html";
        } else {
            document.getElementById('error').innerText = "Invalid credentials!";
        }
    });
}

// Check session for protected pages
if(window.location.pathname.includes("home.html") || window.location.pathname.includes("decode.html")){
    if(sessionStorage.getItem('loggedIn') !== 'true'){
        window.location.href = "index.html";
    }
}

// Logout button
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', function(){
        sessionStorage.removeItem('loggedIn');
        window.location.href = "index.html";
    });
}

// QR Code Generator
const generateBtn = document.getElementById('generateBtn');
if(generateBtn){
    generateBtn.addEventListener('click', () => {
        const text = document.getElementById('qrText').value;
        const format = document.getElementById('qrFormat').value;
        if(text.trim() !== ""){
            QRCode.toDataURL(text, { type: "image/" + format }, function (err, url) {
                if(err){ console.error(err); return; }

                // Create a download link
                const a = document.createElement('a');
                a.href = url;
                a.download = `qrcode.${format}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }
    });
}

// QR Code Decoder
const qrUpload = document.getElementById('qrUpload');
if(qrUpload){
    qrUpload.addEventListener('change', function(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(){
            const img = new Image();
            img.src = reader.result;
            img.onload = function(){
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img,0,0,img.width,img.height);
                const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                if(code){
                    document.getElementById('decodedResult').innerText = "Decoded Text: " + code.data;
                } else {
                    document.getElementById('decodedResult').innerText = "Could not decode QR code!";
                }
            }
        }
        reader.readAsDataURL(file);
    });
}
