import { saveAs } from 'file-saver'
import { v4 } from 'uuid';
export const DownloadImgService = {
    downloadImage: (url) => {
        saveAs(url, v4() + ".jpg")
    }
}
