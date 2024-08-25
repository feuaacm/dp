const uploadButton = document.getElementById('uploadButton');
const uploadedProfile = document.getElementById('uploadedProfile');

uploadButton.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    uploadedProfile.src = event.target.result;
  };

  reader.readAsDataURL(file);
});
