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
            window.location.href = "home.html";
        } else {
            document.getElementById('error').innerText = "Invalid credentials!";
        }
    });
}

// QR Code Generator
const generateBtn = document.getElementById('generateBtn');
if(generateBtn){
    generateBtn.addEventListener('click', () => {
        const text = document.getElementById('qrText').value;
        if(text.trim() !== ""){
            QRCode.toCanvas(document.getElementById('qrcode'), text, function (error) {
                if (error) console.error(error);
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