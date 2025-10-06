// Image to PDF
document.getElementById('imgToPdfBtn').addEventListener('click', () => {
  const file = document.getElementById('imgToPdfInput').files[0];
  if (!file) return alert("Please select an image.");

  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      pdf.addImage(img, 'JPEG', 10, 10, 180, 160);
      pdf.save("converted.pdf");
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// Resize Image
document.getElementById('resizeBtn').addEventListener('click', () => {
  const file = document.getElementById('resizeInput').files[0];
  const width = parseInt(document.getElementById('resizeWidth').value);
  const height = parseInt(document.getElementById('resizeHeight').value);
  if (!file || !width || !height) return alert("Select image and dimensions.");

  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = "resized.png";
      link.click();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// Compress Image
document.getElementById('compressBtn').addEventListener('click', () => {
  const file = document.getElementById('compressInput').files[0];
  const quality = parseFloat(document.getElementById('compressQuality').value);
  if (!file) return alert("Select an image.");

  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', quality);
      link.download = "compressed.jpg";
      link.click();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});