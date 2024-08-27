$(document).ready(function () {
  const uploadedProfile = document.getElementById('uploadedProfile');
  const templateDP = document.getElementById('templateDP');
  let rotationAngle = 0;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let coordX;
  let coordY;

  $('#dpBlastImage').mousedown((e) => {
    e.preventDefault();

    offsetX = e.clientX;
    offsetY = e.clientY;

    if (!uploadedProfile.style.left) uploadedProfile.style.left = '0px';
    if (!uploadedProfile.style.top) uploadedProfile.style.top = '0px';

    coordX = parseInt(uploadedProfile.style.left);
    coordY = parseInt(uploadedProfile.style.top);
    isDragging = true;
    console.log('down');
    console.log('c: ' + offsetX + ' ' + offsetY);
    console.log('d: ' + uploadedProfile.offsetX + ' ' + uploadedProfile.offsetY);
    uploadedProfile.style.transition = '0s ease';
    templateDP.style.opacity = 0.5;
  });

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  $(document).mousemove((e) => {
    if (isDragging) {
      uploadedProfile.style.left =
        clamp(coordX + e.clientX - offsetX, uploadedProfile.clientWidth / -2, uploadedProfile.clientWidth / 2) + 'px';

      uploadedProfile.style.top =
        clamp(coordY + e.clientY - offsetY, uploadedProfile.clientHeight / -2, uploadedProfile.clientHeight / 2) + 'px';
    }
  });

  $(document).mouseup((e) => {
    isDragging = false;
    uploadedProfile.style.transition = '0.05s ease';
    templateDP.style.opacity = '';
  });

  $('#rotateButton').click(function () {
    const image = document.getElementById('uploadedProfile');
    console.log(image);
    console.log(image.style.transform);
    rotationAngle += 45;
    image.style.transform = `rotate(${rotationAngle}deg)`;
    console.log(image.style);
  });

  $('#selectFile').change(function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      document.getElementById('uploadedProfile').src = event.target.result;
    };

    reader.readAsDataURL(file);
  });

  $('#choosePhoto').click(function () {
    console.log('test');
    $('#selectFile').click();
  });

  function downloadElementAsImage(element, fileName, callback) {
    html2canvas(element, {
      scale: 3,
    }).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');
      var img = new Image();
      img.src = imgData;

      var downloadLink = document.createElement('a');
      downloadLink.href = img.src;
      downloadLink.download = `${fileName || ''}.png`;

      downloadLink.click();
      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  $('#downloadButton').click(function () {
    downloadElementAsImage(document.getElementById('dpBlastImage'), 'ACM2425-Freshmen DP Blast');
  });
});
