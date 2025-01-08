// eslint-disable-next-line
type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

class DBClient {
  private async makeRequest(
    operation: string,
    // eslint-disable-next-line
    params: any = {},
  ): Promise<ApiResponse> {
    try {
      const response = await fetch("/api/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ operation, ...params }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  }

  async put(key: string, value: string): Promise<ApiResponse> {
    return this.makeRequest("put", { key, value });
  }

  async get(key: string): Promise<ApiResponse> {
    return this.makeRequest("get", { key });
  }

  async delete(key: string): Promise<ApiResponse> {
    return this.makeRequest("delete", { key });
  }

  async search(query: string): Promise<ApiResponse> {
    return this.makeRequest("search", { query });
  }
}

// Export a singleton instance
export const dbClient = new DBClient();
