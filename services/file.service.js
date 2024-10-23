import { useMutation } from 'react-query'
import api from 'utils/api'

export const useUploadFile = () => {
  return useMutation((formData) =>
    api.post('/api/v1/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  )
}
