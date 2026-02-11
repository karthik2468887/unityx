// src/services/FirebaseService.js
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

class FirebaseService {

  async uploadVideo(file, path, onProgress) {
    return new Promise((resolve, reject) => {

      const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const fileName = `${Date.now()}_${safeName}`;
      const storageRef = ref(storage, `${path}/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }
}

export default new FirebaseService();
