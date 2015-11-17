        //ref.: http://www.kirupa.com/html5/checking_if_a_file_exists.htm
        function doesFileExist(urlToFile)
        {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', urlToFile, false);
            xhr.send();
     
            if (xhr.status == "404") {
                return false;
            } else {
                return true;
            }
        }

function loadThisTextureWithThisUrl(mesh, url) {

            if (doesFileExist(url)) {

                var objectMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( url ), side: THREE.DoubleSide, transparent: true});
            } else {
                var objectMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( "../images/MyPlaceHolder.png" ), side: THREE.DoubleSide, transparent: true});
            }

            mesh.material = objectMaterial.clone();
}
