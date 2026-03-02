import { supabase } from '../lib/supabase';

class StorageService {
    async uploadVideo(file, bucket, onProgress) {
        if (onProgress) onProgress(10);

        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const fileName = `${Date.now()}_${safeName}`;

        // Simulate progress since Supabase standard upload doesn't provide events
        let progress = 10;
        const progressInterval = setInterval(() => {
            progress = Math.min(progress + 15, 90);
            if (onProgress) onProgress(progress);
        }, 500);

        let data, error;
        try {
            const result = await supabase.storage
                .from(bucket)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });
            data = result.data;
            error = result.error;
        } catch (err) {
            console.error("Caught exception during upload:", err);
            error = err;
        }

        clearInterval(progressInterval);

        if (error) {
            console.error("Storage upload error:", error);
            console.warn("Falling back to local Blob URL.");
            if (onProgress) onProgress(100);
            return URL.createObjectURL(file);
        }

        if (onProgress) onProgress(100);

        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        return urlData.publicUrl;
    }
}

export default new StorageService();
