import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://fwjkctxpuhddvajwviys.supabase.co';
const supabaseAnonKey = 'sb_publishable_yupOUbWecchfc7kgmX1HEw_P2Edy1xA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpload() {
    console.log("Starting upload test...");
    try {
        const fileContent = "dummy video content";
        const fileBuffer = Buffer.from(fileContent, 'utf-8');
        const fileName = `test_video_${Date.now()}.mp4`;

        const { data, error } = await supabase.storage
            .from('videos')
            .upload(fileName, fileBuffer, {
                contentType: 'video/mp4',
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error("Storage upload error:", error);
        } else {
            console.log("Upload success:", data);
        }
    } catch (err) {
        console.error("Caught exception:", err);
    }
}

testUpload();
