// Default credentials
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "1234";

// Login page
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = "home.html";
        } else {
            const infoCard = document.getElementById("infoCard");
            console.log(infoCard);
            if (true) {
                infoCard.classList.remove("d-none");
                console.log("Info card displayed");
            }

        }
    });
}

// Check session for protected pages
if (window.location.pathname.includes("home.html") || window.location.pathname.includes("decode.html")) {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = "index.html";
    }
}

// Logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        sessionStorage.removeItem('loggedIn');
        window.location.href = "index.html";
    });
}


//New code
const generateBtn = document.getElementById('generateBtn');

if (generateBtn) {
  generateBtn.addEventListener('click', () => {
    const text = document.getElementById('qrText').value;
    const format = document.getElementById('qrFormat').value;
    const width = parseInt(document.getElementById('qrWidth').value) || 400;
    const height = parseInt(document.getElementById('qrHeight').value) || 400;
    const dark = document.getElementById('qrDark').value;
    const light = document.getElementById('qrLight').value;

    if (text.trim() !== "") {
      QRCode.toDataURL(text, {
        type: "image/" + format,
        width: width,
        height: height,
        margin: 2,
        color: { dark: dark, light: light }
      }, function (err, url) {
        if (err) { console.error(err); return; }

        const qrImage = document.getElementById('qrImage');
        const downloadLink = document.getElementById('downloadLink');
        qrImage.src = url;
        downloadLink.href = url;
        downloadLink.download = `qrcode.${format}`;
        new bootstrap.Modal(document.getElementById('qrModal')).show();
      });
    }
  });
}

/*
const qrText = document.getElementById('qrText');
//const generateBtn = document.getElementById('generateBtn');
const qrError = document.getElementById('qrError');

generateBtn.addEventListener('click', function (e) {
  if (qrText.value.trim() === '') {
    e.preventDefault(); // prevent QR generation
    qrError.classList.remove('d-none');

    // Auto-hide after 10 seconds
    setTimeout(() => {
      qrError.classList.add('d-none');
    }, 10000);
  }
});

qrText.classList.add('error-border');
setTimeout(() => {
  qrError.classList.add('d-none');
  qrText.classList.remove('error-border');
}, 10000);

*/


const modalContent = document.querySelector('.modal-content');

// Generate a dynamic gradient (avoiding white)
const colors = [
  ['#ff6b6b', '#f06595'], // pink-red
  ['#6a4c93', '#1982c4'], // purple-blue
  ['#ff9f1c', '#ff4040'], // orange-red
  ['#00b4d8', '#0077b6'], // teal-blue
  ['#8ac926', '#1982c4']  // lime-blue
];
const randomGradient = colors[Math.floor(Math.random() * colors.length)];
modalContent.style.background = `linear-gradient(135deg, ${randomGradient[0]}, ${randomGradient[1]})`;

/*
//Orginal Code
// QR Code Generator
const generateBtn = document.getElementById('generateBtn');
if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        const text = document.getElementById('qrText').value;
        const format = document.getElementById('qrFormat').value;
        if (text.trim() !== "") {
            QRCode.toDataURL(text, { type: "image/" + format,
                width: 400, margin: 2,
                color: { dark: '#0c010bff', light: '#FFFFFF' },
                height: 400, margin: 2
             }, function (err, url) {
                if (err) { console.error(err); return; }

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
*/

//ORGINAL CODE
// QR Code Decoder
/*
const qrUpload = document.getElementById('qrUpload');
if (qrUpload) {
    qrUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;
            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                if (code) {
                    document.getElementById('decodedResult').innerText = "Decoded Text: " + code.data;
                } else {
                    document.getElementById('decodedResult').innerText = "Could not decode QR code!";
                }
            }
        }
        reader.readAsDataURL(file);
    });
}


*/

const qrFile = document.getElementById('qrFile');
const decodeProgress = document.getElementById('decodeProgress');
const decodedTextBox = document.getElementById('decodedTextBox');
const decodedText = document.getElementById('decodedText');
const copyBtn = document.getElementById('copyBtn');

qrFile.addEventListener('change', () => {
  const file = qrFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      new bootstrap.Modal(document.getElementById('decodeModal')).show();
      decodeProgress.style.width = '0%';
      decodeProgress.textContent = 'Decoding...';
      decodedTextBox.classList.add('d-none');

      const img = new Image();
      img.src = reader.result;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          decodeProgress.style.width = `${progress}%`;
          decodeProgress.textContent = progress < 100 ? 'Decoding...' : '✅ Decoding Complete';

          if (progress >= 100) {
            clearInterval(interval);
            decodedText.value = code ? code.data : "❌ Could not decode QR code!";
            decodedTextBox.classList.remove('d-none');
          }
        }, 150);
      };
    };
    reader.readAsDataURL(file);
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(decodedText.value).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copy Text";
    }, 1500);
  });
});