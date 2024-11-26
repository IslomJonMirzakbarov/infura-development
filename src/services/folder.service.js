import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

export const folderService = {
  getById: async (poolName) =>
    httpRequest.get(`api/v1/pool/check-pool-name?poolName=${poolName}`),
  create: async (data) => httpRequest.post('api/v1/folder/create', data),
  update: async (data) => httpRequest.patch('api/v1/pool/update', data), // tx_hash is missing and subscription plan
  getList: async (folderId, params) =>
    httpRequest.get(`api/v1/folder/contents/${folderId}`, {
      params
    }),
  delete: async (folderId) => httpRequest.delete(`api/v1/folder/delete/${folderId}`)
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
