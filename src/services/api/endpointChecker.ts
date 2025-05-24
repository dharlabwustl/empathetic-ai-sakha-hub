
const endpointChecker = {
  async checkAllEndpoints(): Promise<Record<string, { exists: boolean; status?: number; message: string; }>> {
    const endpoints = [
      '/api/users',
      '/api/auth',
      '/api/study-plans',
      '/api/concepts',
      '/api/analytics'
    ];

    const results: Record<string, { exists: boolean; status?: number; message: string; }> = {};

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { method: 'HEAD' });
        results[endpoint] = {
          exists: response.ok,
          status: response.status,
          message: response.ok ? 'Endpoint accessible' : `HTTP ${response.status}`
        };
      } catch (error) {
        results[endpoint] = {
          exists: false,
          message: 'Network error or endpoint not found'
        };
      }
    }

    return results;
  },

  async checkEndpoint(endpoint: string): Promise<{ exists: boolean; status?: number; message: string; }> {
    try {
      const response = await fetch(endpoint, { method: 'HEAD' });
      return {
        exists: response.ok,
        status: response.status,
        message: response.ok ? 'Endpoint accessible' : `HTTP ${response.status}`
      };
    } catch (error) {
      return {
        exists: false,
        message: 'Network error or endpoint not found'
      };
    }
  }
};

export default endpointChecker;
