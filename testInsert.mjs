import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fwjkctxpuhddvajwviys.supabase.co';
const supabaseAnonKey = 'sb_publishable_yupOUbWecchfc7kgmX1HEw_P2Edy1xA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    console.log("Starting DB insert test...");
    const newRecord = {
        title: "Test Concept",
        description: "No description",
        price: 99,
        subject: "General",
        full_video_url: "http://example.com/video.mp4",
        created_by: "demo",
        is_approved: true
    };

    const { data, error } = await supabase.from('concepts').insert([newRecord]).select();

    if (error) {
        console.error("DB Insert error:", error);
    } else {
        console.log("Insert success:", data);
    }
}

testInsert();
