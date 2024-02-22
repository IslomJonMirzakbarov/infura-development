import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'
import axios from 'axios'

const poolService = {
  check: async (data) => httpRequest.post('infura/api/v1/pools/check', data),
  create: async (data) => httpRequest.post('infura/api/v1/pools', data),
  getPools: async () => httpRequest.get('infura/api/v1/pools'),
  getDashboard: async () => httpRequest.get('infura/api/v1/user/dashboard'),
  getInvoices: async () => httpRequest.get('infura/api/v1/user/invoices'),
  getStats: async () => httpRequest.get('infura/api/v1/stats'),
  getDownloadsCount: async () =>
    axios.get('https://admin.conun.io/api/analytic-downloads-ocea-drive'),
  getPoolById: async (id) => httpRequest.get(`/infura/api/v1/pools/${id}`),
  fileUpload: async (data) =>
    axios.post('https://infura.oceandrive.network/v1/file/upload', data?.file, {
      headers: {
        Authorization: `Bearer ${data?.token}`
      }
    })
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
export const usePoolCheckMutation = (mutationSettings) => {
  return useMutation(poolService.check, mutationSettings)
}
export const usePoolCreateMutation = (mutationSettings) => {
  return useMutation(poolService.create, mutationSettings)
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
    ...queryProps
  })
}

export const useConditionalPoolById = (id) => {
  return useGetPoolById({ id, enabled: id !== 'ALL' })
}
