// src/hooks/use-declarations.ts
import { useState, useEffect } from "react";
import type { CustomsDeclarationSchema, ApiPaginatedResponse, PaginationData } from "@/types/api";

// Mock data based on the API schema
const mockDeclarations: CustomsDeclarationSchema[] = [
  {
    cusCiqNo: "223320240000012345",
    entryId: "123456789012345678",
    cusDecStatusName: "已放行",
    agentName: "上海东方报关有限公司",
    ownerName: "XX国际贸易有限公司",
    iEDate: "2024-05-20",
    dDate: "2024-05-21",
  },
  {
    cusCiqNo: "223320240000012346",
    entryId: "123456789012345679",
    cusDecStatusName: "查验中",
    agentName: "上海东方报关有限公司",
    ownerName: "YY商贸发展有限公司",
    iEDate: "2024-05-20",
    dDate: "2024-05-21",
  },
  {
    cusCiqNo: "223320240000012347",
    entryId: "123456789012345680",
    cusDecStatusName: "已结关",
    agentName: "上海东方报关有限公司",
    ownerName: "ZZ进出口集团",
    iEDate: "2024-05-19",
    dDate: "2024-05-20",
  },
  // Add more mock data for pagination
  {
    cusCiqNo: "223320240000012348",
    entryId: "123456789012345681",
    cusDecStatusName: "已放行",
    agentName: "上海东方报关有限公司",
    ownerName: "AA贸易",
    iEDate: "2024-05-18",
    dDate: "2024-05-19",
  },
  {
    cusCiqNo: "223320240000012349",
    entryId: "123456789012345682",
    cusDecStatusName: "已放行",
    agentName: "上海东方报关有限公司",
    ownerName: "BB科技有限公司",
    iEDate: "2024-05-18",
    dDate: "2024-05-19",
  },
];

const mockApiResponse: ApiPaginatedResponse<CustomsDeclarationSchema> = {
  code: 200,
  message: "Success",
  data: {
    items: mockDeclarations,
    total: 25,
    page: 1,
    page_size: 5,
    pages: 5,
  },
  timestamp: new Date().toISOString(),
};

/**
 * Custom hook to fetch customs declarations.
 * In a real app, this would use fetch or a library like SWR/React Query.
 */
export function useDeclarations(page: number, limit: number) {
  const [data, setData] = useState<PaginationData<CustomsDeclarationSchema> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate API call
        // In a real app:
        // const response = await fetch(`/sw/api/v1/declarations?skip=${(page - 1) * limit}&limit=${limit}`);
        // const result = await response.json();
        // setData(result.data);

        // For now, use mock data
        const paginatedItems = mockDeclarations.slice((page - 1) * limit, page * limit);
        setData({
            ...mockApiResponse.data,
            items: paginatedItems,
            page,
        });

      } catch (e) {
        setError(e instanceof Error ? e : new Error("An unknown error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { data, isLoading, error };
}
