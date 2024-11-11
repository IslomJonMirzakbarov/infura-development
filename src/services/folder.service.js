import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

export const folderService = {
  getById: async (poolName) =>
    httpRequest.get(`pool/check-pool-name?poolName=${poolName}`),
  create: async (data) => httpRequest.post('folder/create', data),
  update: async (data) => httpRequest.patch('pool/update', data), // tx_hash is missing and subscription plan
  getList: async (folderId, params) =>
    httpRequest.get(`folder/contents/${folderId}`, {
      params
    }),
  delete: async (folderId) => httpRequest.delete(`folder/delete/${folderId}`)
}

export const useCreateFolder = (mutationSettings) => {
  return useMutation(folderService.create, mutationSettings)
}

export const useGetFolderList = ({ params, folderId, queryProps }) => {
  return useQuery(
    ['GET_FOLDER_CONTENT', folderId, params],
    () => folderService.getList(folderId, params),
    queryProps
  )
}

export const useDeleteFolder = (mutationSettings) => {
  return useMutation(folderService.delete, mutationSettings)
}
