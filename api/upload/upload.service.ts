import { Http } from '../base/request'
import type { TUpload } from './DTOs'
import { SERVICE_NAMES } from '@/utils'

export class UploadService extends Http {
  endpoint = SERVICE_NAMES.Upload
  name = SERVICE_NAMES.Upload

  upload(images: File) {
    const formData = new FormData()
    formData.append('images', images)
    return this.post('/', formData)
  }
}
