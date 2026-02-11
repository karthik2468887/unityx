import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Service to handle real native Android behaviors
 */
class NativeService {
    /**
     * Triggers a real UPI intent on Android
     * @param {string} vpa - Virtual Private Address (Merchant ID)
     * @param {string} name - Merchant Name
     * @param {number} amount - Amount in INR
     */
    async triggerUPIIntent(vpa, name, amount) {
        // Standard UPI Deep Link URI
        const upiUrl = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=MicroLearningPayment`;

        const platform = Capacitor.getPlatform();

        if (platform === 'web') {
            console.log("Web platform detected. Simulating UPI Intent success.");
            alert(`[BROWSER SIMULATION]\n\nOpening UPI App for: ${name}\nAmount: ₹${amount}\n\nOn a real Android device, this would trigger GPay/PhonePe directly.`);
            return true;
        }

        try {
            // This triggers the Android App Chooser (GPay, PhonePe, Paytm, etc.)
            await Browser.open({ url: upiUrl });
            return true;
        } catch (error) {
            console.error("Native UPI Intent failed:", error);
            // On some mobile browsers/debug environments
            window.location.href = upiUrl;
            return true;
        }
    }

    /**
     * Request native device permissions for media storage
     */
    async requestMediaPermissions() {
        try {
            // Filesystem.requestPermissions() handles common storage permissions
            const status = await Filesystem.requestPermissions();
            return status.publicStorage === 'granted';
        } catch (error) {
            console.warn("Permissions request failed, possibly in browser:", error);
            return true; // Fallback for testing
        }
    }

    /**
     * Opens the native system file picker
     * @returns {Promise<File|null>}
     */
    async pickVideoFile() {
        try {
            const result = await FilePicker.pickFiles({
                types: ['video/mp4'],
                multiple: false,
                readData: true // This allows us to handle the file content
            });

            if (result.files.length > 0) {
                // Return the file information for processing
                return result.files[0];
            }
            return null;
        } catch (error) {
            console.error("Native file picker failed:", error);
            return null;
        }
    }

    /**
     * Trigger native haptic feedback
     * @param {'light'|'medium'|'heavy'} style 
     */
    async triggerHaptic(style = 'light') {
        try {
            const impactStyle = style === 'heavy' ? ImpactStyle.Heavy :
                style === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light;
            await Haptics.impact({ style: impactStyle });
        } catch {
            // No-op in browser
        }
    }
}

export default new NativeService();
