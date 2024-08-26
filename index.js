$(document).ready(function () {
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
      // Create a temporary anchor element to trigger the download
      var downloadLink = document.createElement('a');
      downloadLink.href = img.src;
      downloadLink.download = `${fileName || ''}.png`;
      // Simulate a click on the anchor element to trigger the download
      downloadLink.click();
      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  $('#downloadButton').click(function () {
    console.log('TESTING PLS PRIN ASDT');
    downloadElementAsImage(document.getElementById('dpBlastImage'), 'ACM2425-Freshmen DP Blast', function () {
      console.log('Downloading image...');
    });
  });
});
