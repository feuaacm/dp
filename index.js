$(document).ready(function () {
  const uploadedProfile = document.getElementById('uploadedProfile');
  const templateDP = document.getElementById('templateDP');
  let rotationAngle = 0;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  $('#dpBlastImage').mousedown((e) => {
    isDragging = true;
    offsetX = e.offsetX / 2;
    offsetY = e.offsetY / 2;
  });

  $(document).mousemove((e) => {
    if (isDragging) {
      uploadedProfile.style.left = `${templateDP.style.left - offsetX / 2}px`;
      uploadedProfile.style.top = `${templateDP.style.top - offsetY / 2}px`;
    }
  });

  $(document).mouseup((e) => {
    isDragging = false;
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
