import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

const poolService = {
  check: async (data) => httpRequest.post('infura/api/v1/pools/check', data),
  create: async (data) => httpRequest.post('infura/api/v1/pools', data),
  getPools: async () => httpRequest.get('infura/api/v1/pools'),
  getDashboard: async () => httpRequest.get('infura/api/v1/user/dashboard'),
  getInvoices: async () => httpRequest.get('infura/api/v1/user/invoices'),
  getStats: async () => httpRequest.get('infura/api/v1/stats'),
  getPoolById: async (id) => httpRequest.get(`/infura/api/v1/pools/${id}`)
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
export const useInvoice = (mutationSettings) => {
  return useQuery('invoices', poolService.getInvoices, mutationSettings)
}
export const useStats = (mutationSettings) => {
  return useQuery('stats', poolService.getStats, mutationSettings)
}
export const useGetPoolById = ({ id, enabled = true, queryProps }) => {
  return useQuery(`get-pool-${id}`, () => poolService.getPoolById(id), {
    enabled: enabled && !!id,
    ...queryProps,
    
  })
}

export const useConditionalPoolById = (id) => {
  return useGetPoolById({ id, enabled: id !== 'ALL' })
}
