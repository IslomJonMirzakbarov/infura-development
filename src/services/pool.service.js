import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

const INFURA_NETWORK =
  process.env.REACT_APP_INFURA_NETWORK || 'https://infura.oceandrive.network'

export const poolService = {
  check: async (data) => httpRequest.post('infura/api/v1/pools/check', data),
  create: async (data) => httpRequest.post('infura/api/v1/pools', data),
  update: async (data) =>
    httpRequest.patch(`infura/api/v1/pools/${data.poolId}`, data.data),
  getPools: async () => httpRequest.get('infura/api/v1/pools'),
  getDashboard: async () => httpRequest.get('infura/api/v1/user/dashboard'),
  getInvoices: async () => httpRequest.get('infura/api/v1/user/invoices'),
  getStats: async () => httpRequest.get('infura/api/v1/stats'),
  getWalletsCount: async () => httpRequest.get('app/stats'),
  getDownloadsCount: async () =>
    axios.get('https://admin.conun.io/api/analytic-downloads-ocea-drive'),
  getPoolById: async (id) => httpRequest.get(`/infura/api/v1/pools/${id}`),
  createFolder: async (data) =>
    axios.post(`${INFURA_NETWORK}/v1/file-service/folder/create`, data?.data, {
      headers: {
        Authorization: `Bearer ${data?.token}`
      }
    }),
  getFoldersByPoolId: async (poolId, token) =>
    axios.get(`${INFURA_NETWORK}/v1/file-service/folders/${poolId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  fileUpload: async (data) =>
    axios.post(`${INFURA_NETWORK}/v1/file-service/file/upload`, data?.data, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'multipart/form-data'
      }
    }),
  getFileHistory: async (token) => {
    // const params = new URLSearchParams({ page, limit })
    return axios.get(`${INFURA_NETWORK}/v1/file-service/file/history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  downloadFile: async (token, contentId, config) =>
    axios.get(
      `${INFURA_NETWORK}/v1/file-service/file/download?contentId=${contentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob',
        ...config
      }
    )
}

export const useGetFoldersByPoolId = ({
  poolId,
  token,
  enabled = true,
  queryProps
}) => {
  return useQuery(
    `get-foldersby-${poolId}`,
    () => poolService.getFoldersByPoolId(poolId, token),
    {
      enabled: enabled && !!poolId && !!token,
      ...queryProps
    }
  )
}
export const useCreateFolder = (mutationSettings) => {
  return useMutation(poolService.createFolder, mutationSettings)
}
export const useDownloadFile = ({ token, contentId, queryProps }) => {
  return useQuery(
    `get-file-history-${token}`,
    () => poolService.downloadFile(token, contentId),
    {
      enabled: !!token && !!contentId,
      ...queryProps
    }
  )
}
export const useGetFileHistory = ({ token, queryProps }) => {
  return useQuery(
    ['get-file-history', { token }],
    () => poolService.getFileHistory(token),
    {
      enabled: !!token,
      keepPreviousData: true,
      ...queryProps
    }
  )
}
export const useFileUpload = (mutationSettings) => {
  return useMutation(poolService.fileUpload, mutationSettings)
}
export const useDownloadsCount = (querySettings) => {
  return useQuery(
    'downloads-count',
    poolService.getDownloadsCount,
    querySettings
  )
}
export const useWalletsCount = (querySettings) => {
  return useQuery('wallets-count', poolService.getWalletsCount, querySettings)
}
export const usePoolCheckMutation = (mutationSettings) => {
  return useMutation(poolService.check, mutationSettings)
}
export const usePoolCreateMutation = (mutationSettings) => {
  return useMutation(poolService.create, mutationSettings)
}
export const usePoolUpdateMutation = (mutationSettings) => {
  return useMutation(poolService.update, mutationSettings)
}
export const useGetPools = (mutationSettings) => {
  return useQuery('pools', poolService.getPools, mutationSettings)
}
export const useDashboard = (mutationSettings) => {
  return useQuery('dashboard', poolService.getDashboard, mutationSettings)
}
export const useInvoice = (querySettings = {}) => {
  return useQuery('invoices', poolService.getInvoices, {
    cacheTime: 20000,
    ...querySettings
  })
}
export const useStats = (mutationSettings) => {
  return useQuery('stats', poolService.getStats, mutationSettings)
}
export const useGetPoolById = ({ id, enabled = true, queryProps }) => {
  return useQuery(`get-pool-${id}`, () => poolService.getPoolById(id), {
    enabled: enabled && !!id,
    retry: false,
    ...queryProps
  })
}

export const useConditionalPoolById = (id) => {
  return useGetPoolById({ id, enabled: id !== 'ALL' })
}
