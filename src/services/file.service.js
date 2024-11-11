import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

export const fileService = {
  upload: async (formData) =>
    httpRequest.post('file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  getDownloads: async (cid) => {
    if (!cid) {
      console.error('No CID provided for download')
      throw new Error('No CID provided for download')
    }
    // console.log('fileService.getDownloads called with cid:', cid);
    try {
      const response = await httpRequest.get(`file/downloads?cid=${cid}`, {
        responseType: 'json',
        headers: {
          Accept: 'application/json'
        }
      })
      // console.log('Download response:', response);

      const details = response?.details
      if (details && details.buffer && details.buffer.data) {
        // Convert buffer data to Blob
        const bufferData = new Uint8Array(details.buffer.data)
        const blob = new Blob([bufferData], { type: details.mimetype })
        return {
          blob,
          filename: details.originalname,
          mimetype: details.mimetype
        }
      } else {
        console.error('Unexpected response format:', response.data)
        throw new Error('Unexpected response format')
      }
    } catch (error) {
      console.error('Error in fileService.getDownloads:', error)
      if (error.response) {
        console.error('Error response:', error.response.data)
      }
      throw error
    }
  },
  delete: async (cid) => httpRequest.post('file/delete', { cid }),
  getMetadata: async (id) => httpRequest.get(`file/metadata/${id}`),
  getItemWebview: async (cid) =>
    httpRequest.get(`file/get-item-webview/${cid}`, {
      responseType: 'blob'
    })
}

export const useUploadFile = (mutationSettings) => {
  return useMutation(fileService.upload, mutationSettings)
}

export const useGetDownloads = (cid, queryProps) => {
  return useQuery(
    ['GET_DOWNLOADS', cid],
    () => (cid ? fileService.getDownloads(cid) : null),
    {
      enabled: false,
      ...queryProps
    }
  )
}

export const useDeleteFile = (mutationSettings) => {
  return useMutation(fileService.delete, mutationSettings)
}

export const useGetFileMetadata = (id, queryProps) => {
  return useQuery(
    ['GET_FILE_METADATA', id],
    () => fileService.getMetadata(id),
    queryProps
  )
}

export const useGetItemWebview = (cid, queryProps) => {
  return useQuery(
    ['GET_ITEM_WEBVIEW', cid],
    () => fileService.getItemWebview(cid),
    {
      enabled: !!cid,
      ...queryProps
    }
  )
}
