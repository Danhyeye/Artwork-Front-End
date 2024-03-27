import {saveAs} from 'file-saver'
import JSZip from "jszip";
import { v4 as uuidv4 } from 'uuid';

export const DownloadImgService = {
    downloadImage: async (imageUrls) => {
        const jsZip = new JSZip();
        const imgFolder = jsZip.folder('images');

        const imagePromises = imageUrls.map(async (url) => {
            try {
                const uniqueId = uuidv4();
                const imageName = `${uniqueId}.png`;
                console.log('imageName', imageName);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
                }
                const blob = await response.blob(); // Chuyển đổi response thành blob
                console.log('blob', blob);
                imgFolder.file(imageName, blob); // Thêm blob vào file ZIP
            } catch (error) {
                console.error('Error downloading or adding image to zip:', error);
            }
        });

        // Đợi cho đến khi tất cả hình ảnh được thêm vào ZIP
        await Promise.all(imagePromises);

        // Tạo và lưu file ZIP sau khi tất cả hình ảnh đã được thêm
        jsZip.generateAsync({type: 'blob'}).then(function (content) {
            saveAs(content, 'images.zip'); // Sử dụng FileSaver để lưu file ZIP
        });
    },

}
