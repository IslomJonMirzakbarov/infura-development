import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

const INFURA_NETWORK =
  process.env.REACT_APP_INFURA_NETWORK || 'https://infura.oceandrive.network'

export const poolService = {
  // check: async (data) => httpRequest.post('infura/api/v1/pools/check', data),
  getPoolByName: async (poolName) =>
    httpRequest.get(`api/v1/pool/check-pool-name?poolName=${poolName}`),
  create: async (data) => httpRequest.post('api/v1/pool/create', data),
  update: async (data) => httpRequest.patch('api/v1/pool/update', data), // tx_hash is missing and subscription plan
  getPools: async (id) =>
    httpRequest.get(`api/v1/pool/pool-list?filter[userId]=${id}`),
  getDashboard: async () => httpRequest.get('infura/api/v1/user/dashboard'),
  getInvoices: async () => httpRequest.get('infura/api/v1/user/invoices'),
  getDownloadsCount: async () =>
    axios.get('https://admin.conun.io/api/analytic-downloads-ocea-drive'),
  getPoolById: async (id) => httpRequest.get(`api/v1/pool/pool-info/${id}`),
  getPoolStatistics: async () => 
    httpRequest.get('api/v1/aggregation/user-pool-statistics'),
  getNodeStats: async () => 
    httpRequest.get('api/v1/aggregation/get-node-count?entryPoint=0'),
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
export const useNodeStats = (querySettings) => {
  return useQuery('node-stats', poolService.getNodeStats, querySettings)
}
// export const usePoolCheckMutation = (mutationSettings) => {
//   return useMutation(poolService.check, mutationSettings)
// }
export const usePoolCheckMutation = (mutationSettings) => {
  return useMutation(
    (poolName) => poolService.getPoolByName(poolName),
    mutationSettings
  )
}
export const usePoolCreateMutation = (mutationSettings) => {
  return useMutation(poolService.create, mutationSettings)
}
export const usePoolUpdateMutation = (mutationSettings) => {
  return useMutation(poolService.update, mutationSettings)
}
export const useGetPools = ({ id, querySettings }) => {
  return useQuery('pools', () => poolService.getPools(id), {
    enabled: !!id,
    ...querySettings
  })
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

export const usePoolStatistics = (querySettings) => {
  return useQuery('pool-statistics', poolService.getPoolStatistics, querySettings)
}
