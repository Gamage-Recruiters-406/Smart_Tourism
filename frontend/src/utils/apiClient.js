const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const API_VERSION = import.meta.env.VITE_API_VERSION || '/v1'

function normalizeBaseUrl() {
  const baseUrl = API_BASE_URL.replace(/\/+$/, '')
  const version = API_VERSION.replace(/^\/+|\/+$/g, '')

  if (!version) {
    return baseUrl
  }

  return `${baseUrl}/${version}`
}

function normalizePath(path) {
  if (!path) {
    return ''
  }

  return path.startsWith('/') ? path : `/${path}`
}

function buildQueryString(query = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

export function buildApiUrl(path, query = {}) {
  const normalizedBaseUrl = normalizeBaseUrl()
  const normalizedPath = normalizePath(path)

  return `${normalizedBaseUrl}${normalizedPath}${buildQueryString(query)}`
}

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, token, query, headers = {} } = options
  const response = await fetch(buildApiUrl(path, query), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  const rawBody = await response.text()

  let data = null
  if (rawBody) {
    try {
      data = JSON.parse(rawBody)
    } catch {
      data = { message: rawBody }
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed')
  }

  return data
}