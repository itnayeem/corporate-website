import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AdminCredentials, AdminToken, ChangePasswordInput, Error, HealthStatus, SiteContent, SiteContentInput, UploadUrlRequest, UploadUrlResponse } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetContentUrl: () => string;
/**
 * Returns the editable site content document
 * @summary Get site content
 */
export declare const getContent: (options?: RequestInit) => Promise<SiteContent>;
export declare const getGetContentQueryKey: () => readonly ["/api/content"];
export declare const getGetContentQueryOptions: <TData = Awaited<ReturnType<typeof getContent>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getContent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetContentQueryResult = NonNullable<Awaited<ReturnType<typeof getContent>>>;
export type GetContentQueryError = ErrorType<unknown>;
/**
 * @summary Get site content
 */
export declare function useGetContent<TData = Awaited<ReturnType<typeof getContent>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateContentUrl: () => string;
/**
 * Replaces the editable site content document (admin only)
 * @summary Update site content
 */
export declare const updateContent: (siteContentInput: SiteContentInput, options?: RequestInit) => Promise<SiteContent>;
export declare const getUpdateContentMutationOptions: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateContent>>, TError, {
        data: BodyType<SiteContentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateContent>>, TError, {
    data: BodyType<SiteContentInput>;
}, TContext>;
export type UpdateContentMutationResult = NonNullable<Awaited<ReturnType<typeof updateContent>>>;
export type UpdateContentMutationBody = BodyType<SiteContentInput>;
export type UpdateContentMutationError = ErrorType<Error>;
/**
* @summary Update site content
*/
export declare const useUpdateContent: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateContent>>, TError, {
        data: BodyType<SiteContentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateContent>>, TError, {
    data: BodyType<SiteContentInput>;
}, TContext>;
export declare const getAdminLoginUrl: () => string;
/**
 * Exchanges the admin password for a session token
 * @summary Admin login
 */
export declare const adminLogin: (adminCredentials: AdminCredentials, options?: RequestInit) => Promise<AdminToken>;
export declare const getAdminLoginMutationOptions: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminCredentials>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminCredentials>;
}, TContext>;
export type AdminLoginMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogin>>>;
export type AdminLoginMutationBody = BodyType<AdminCredentials>;
export type AdminLoginMutationError = ErrorType<Error>;
/**
* @summary Admin login
*/
export declare const useAdminLogin: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminCredentials>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminCredentials>;
}, TContext>;
export declare const getChangeAdminPasswordUrl: () => string;
/**
 * Updates the admin password (admin only). Requires the current password.
 * @summary Change admin password
 */
export declare const changeAdminPassword: (changePasswordInput: ChangePasswordInput, options?: RequestInit) => Promise<void>;
export declare const getChangeAdminPasswordMutationOptions: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof changeAdminPassword>>, TError, {
        data: BodyType<ChangePasswordInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof changeAdminPassword>>, TError, {
    data: BodyType<ChangePasswordInput>;
}, TContext>;
export type ChangeAdminPasswordMutationResult = NonNullable<Awaited<ReturnType<typeof changeAdminPassword>>>;
export type ChangeAdminPasswordMutationBody = BodyType<ChangePasswordInput>;
export type ChangeAdminPasswordMutationError = ErrorType<Error>;
/**
* @summary Change admin password
*/
export declare const useChangeAdminPassword: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof changeAdminPassword>>, TError, {
        data: BodyType<ChangePasswordInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof changeAdminPassword>>, TError, {
    data: BodyType<ChangePasswordInput>;
}, TContext>;
export declare const getRequestUploadUrlUrl: () => string;
/**
 * Returns a same-origin URL to PUT the file bytes to. The client sends
JSON metadata here, then uploads the file directly to the returned URL.

 * @summary Reserve a local upload slot
 */
export declare const requestUploadUrl: (uploadUrlRequest: UploadUrlRequest, options?: RequestInit) => Promise<UploadUrlResponse>;
export declare const getRequestUploadUrlMutationOptions: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
export type RequestUploadUrlMutationResult = NonNullable<Awaited<ReturnType<typeof requestUploadUrl>>>;
export type RequestUploadUrlMutationBody = BodyType<UploadUrlRequest>;
export type RequestUploadUrlMutationError = ErrorType<Error>;
/**
* @summary Reserve a local upload slot
*/
export declare const useRequestUploadUrl: <TError = ErrorType<Error>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
export declare const getGetStorageObjectUrl: (filename: string) => string;
/**
 * Serves an image previously uploaded via the local upload flow.

 * @summary Serve a stored branding image
 */
export declare const getStorageObject: (filename: string, options?: RequestInit) => Promise<Blob>;
export declare const getGetStorageObjectQueryKey: (filename: string) => readonly [`/api/storage/objects/${string}`];
export declare const getGetStorageObjectQueryOptions: <TData = Awaited<ReturnType<typeof getStorageObject>>, TError = ErrorType<Error>>(filename: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStorageObject>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStorageObject>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStorageObjectQueryResult = NonNullable<Awaited<ReturnType<typeof getStorageObject>>>;
export type GetStorageObjectQueryError = ErrorType<Error>;
/**
 * @summary Serve a stored branding image
 */
export declare function useGetStorageObject<TData = Awaited<ReturnType<typeof getStorageObject>>, TError = ErrorType<Error>>(filename: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStorageObject>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map