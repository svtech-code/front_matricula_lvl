import type { ApiRequestParams } from '@/domains/api/api.entity';
import { buildUrl } from '../services/buildUrl.service';
import { apiClient } from './apiClient';

// export const apiRequest = {
//   async get<T, P = undefined, K = undefined>({
//     route,
//     param,
//     params,
//   }: ApiRequestParams<P, K>): Promise<T> {
//     let url = route as string;
//     if (params && typeof params === 'object') {
//       const queryParams = new URLSearchParams(
//         params as unknown as Record<string, string>,
//       ).toString();
//       url = `${route}?${queryParams}`;
//     } else if (param) {
//       url = `${route}${param}`;
//     }
//     const response = await apiClient.get<T>(url);
//     return response.data;
//   },
//
//   async post<T, P>({
//     route,
//     payload,
//   }: ApiRequestParams<P, undefined>): Promise<T> {
//     const response = await apiClient.post<T>(route, payload);
//     return response.data;
//   },
//
//   async put<T, P>({
//     route,
//     payload,
//     param,
//   }: ApiRequestParams<P, undefined>): Promise<T> {
//     const url = param ? `${route}${param}` : route;
//     const response = await apiClient.put<T>(url, payload);
//     return response.data;
//   },
//
//   async delete<T>({
//     route,
//     param,
//   }: ApiRequestParams<undefined, undefined>): Promise<T> {
//     const url = param ? `${route}${param}` : route;
//     const response = await apiClient.delete<T>(url);
//     return response.data;
//   },
// };

export const apiRequest = {
  async get<T, P = undefined, K extends object | undefined = undefined>({
    route,
    param,
    params,
  }: ApiRequestParams<P, K>): Promise<T> {
    const url = buildUrl(route, param, params);
    const response = await apiClient.get<T>(url);
    return response.data;
  },

  async post<T, P>({
    route,
    payload,
  }: ApiRequestParams<P, undefined>): Promise<T> {
    const response = await apiClient.post<T>(route, payload);
    return response.data;
  },

  async put<T, P>({
    route,
    payload,
    param,
  }: ApiRequestParams<P, undefined>): Promise<T> {
    const url = buildUrl(route, param);
    const response = await apiClient.put<T>(url, payload);
    return response.data;
  },

  async delete<T>({
    route,
    param,
  }: ApiRequestParams<undefined, undefined>): Promise<T> {
    const url = buildUrl(route, param);
    const response = await apiClient.delete<T>(url);
    return response.data;
  },
};
