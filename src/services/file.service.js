import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

export const fileService = {
  upload: async (formData) => httpRequest.post('api/v1/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getDownloads: async () => httpRequest.get('api/v1/file/downloads'),
  delete: async (cid) => httpRequest.post('api/v1/file/delete', { cid }),
  getMetadata: async (id) => httpRequest.get(`api/v1/file/metadata/${id}`),
  getItemWebview: async (cid) => httpRequest.get(`api/v1/file/get-item-webview/${cid}`, {
    responseType: 'blob'
  })
}

export const useUploadFile = (mutationSettings) => {
  return useMutation(fileService.upload, mutationSettings)
}

export const useGetDownloads = (queryProps) => {
  return useQuery(['GET_DOWNLOADS'], fileService.getDownloads, queryProps)
}

export const useDeleteFile = (mutationSettings) => {
  return useMutation(fileService.delete, mutationSettings)
}

export const useGetFileMetadata = (id, queryProps) => {
  return useQuery(['GET_FILE_METADATA', id], () => fileService.getMetadata(id), queryProps)
}

export const useGetItemWebview = (cid, queryProps) => {
  return useQuery(['GET_ITEM_WEBVIEW', cid], () => fileService.getItemWebview(cid), {
    enabled: !!cid,
    ...queryProps
  })
}
