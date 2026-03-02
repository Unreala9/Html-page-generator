import { createClient, withClientSideSessionMiddleware } from "@nhost/nhost-js";

const NHOST_SUBDOMAIN = import.meta.env.VITE_NHOST_SUBDOMAIN as string;
const NHOST_REGION = import.meta.env.VITE_NHOST_REGION as string;

/**
 * Central Nhost client — replaces the old Supabase client.
 * Nhost v4 API shape:
 *   • All methods return FetchResponse<T> where the response body is at .body
 *   • Errors (4xx/5xx) are thrown as FetchError<ErrorBody>
 *   • Session subscription: nhost.sessionStorage.onChange(callback)
 */
export const nhost = createClient({
  subdomain: NHOST_SUBDOMAIN,
  region: NHOST_REGION,
  configure: [withClientSideSessionMiddleware],
});

// ── Auth convenience helpers ─────────────────────────────────────────────────

/**
 * Subscribe to auth state changes.
 * v4 equivalent of Supabase's `onAuthStateChange`.
 * @returns unsubscribe function
 */
export function onAuthStateChanged(
  callback: (session: ReturnType<typeof nhost.getUserSession>) => void,
): () => void {
  return nhost.sessionStorage.onChange(callback);
}

/**
 * Sign out the current user — invalidates refresh token server-side + clears locally.
 */
export async function signOut(): Promise<void> {
  const session = nhost.getUserSession();
  const refreshToken = session?.refreshToken;
  try {
    if (refreshToken) {
      await nhost.auth.signOut({ refreshToken });
    }
  } catch {
    // Ignore server errors on signout
  } finally {
    nhost.clearSession();
  }
}

/**
 * Change the current user's password.
 * Wraps nhost.auth.changeUserPassword and normalises errors.
 */
export async function changePassword(
  newPassword: string,
): Promise<{ error: string | null }> {
  try {
    await nhost.auth.changeUserPassword({ newPassword });
    return { error: null };
  } catch (err) {
    return { error: extractErrorMessage(err) };
  }
}

// ── Storage helper ────────────────────────────────────────────────────────────

/**
 * Returns the public URL for a file stored in Nhost Storage.
 * Nhost v4 identifies files by UUID (fileId), not by path.
 */
export function getPublicUrl(fileId: string): string {
  return `https://${NHOST_SUBDOMAIN}.storage.${NHOST_REGION}.nhost.run/v1/files/${fileId}`;
}

// ── GraphQL helper ─────────────────────────────────────────────────────────────

/**
 * Typed wrapper around nhost.graphql.request.
 * Nhost v4 GraphQL API:
 *   - Takes { query, variables } object (not plain string)
 *   - Returns FetchResponse<GraphQLResponse<T>> where data is at .body.data
 *   - Throws FetchError on network/HTTP errors
 *
 * Returns { data, error } for familiar ergonomics.
 */
export async function gql<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await nhost.graphql.request<T>({ query, variables });
    // GraphQL-level errors (e.g. permission denied, field not found)
    if (res.body.errors?.length) {
      return { data: null, error: res.body.errors[0].message };
    }
    return { data: (res.body.data ?? null) as T, error: null };
  } catch (err) {
    return { data: null, error: extractErrorMessage(err) };
  }
}

// ── Auth call helper ─────────────────────────────────────────────────────────

/**
 * Wraps any nhost.auth.* call and normalises the result to { data, error }.
 * nhost v4 auth methods return FetchResponse<T> or throw FetchError.
 */
export async function authCall<T>(
  fn: () => Promise<{ body: T }>,
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fn();
    // Check if the body itself has an error shape (some endpoints return { error: ... })
    const body = res.body as Record<string, unknown>;
    if (body && body.error && typeof body.error === "object") {
      const errObj = body.error as { message?: string };
      return {
        data: null,
        error: errObj.message ?? JSON.stringify(body.error),
      };
    }
    return { data: res.body, error: null };
  } catch (err) {
    return { data: null, error: extractErrorMessage(err) };
  }
}

// ── Error message extraction ──────────────────────────────────────────────────

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    // FetchError (from nhost) has a .body property with error details
    const body = (err as Error & { body?: unknown }).body as Record<string, unknown> | undefined;
    if (body) {
      const errObj = body.error as { message?: string } | undefined;
      if (errObj?.message) return errObj.message;
      if (typeof body.message === "string") return body.message;
      return JSON.stringify(body);
    }
    return err.message;
  }
  return String(err);
}
