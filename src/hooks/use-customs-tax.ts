// src/hooks/use-customs-tax.ts
import { useState, useEffect } from "react";
import type { CustomsTaxSchema, ApiPaginatedResponse, PaginationData } from "@/types/api";

// Mock data for the customs tax hook
const mockCustomsTaxes: CustomsTaxSchema[] = [
  { taxHeadSeqNo: "SEQ987654321", swTaxId: "SWTAX001", entryId: "123456789012345678", taxvouNo: "TAX-VOUCHER-001", traAmt: 15230.50, transStatusName: "已支付", limitDateStr: "2024-06-15" },
  { taxHeadSeqNo: "SEQ987654322", swTaxId: "SWTAX002", entryId: "123456789012345679", taxvouNo: "TAX-VOUCHER-002", traAmt: 8750.00, transStatusName: "未支付", limitDateStr: "2024-06-18" },
  { taxHeadSeqNo: "SEQ987654323", swTaxId: "SWTAX003", entryId: "123456789012345680", taxvouNo: "TAX-VOUCHER-003", traAmt: 32400.75, transStatusName: "支付失败", limitDateStr: "2024-06-20" },
  { taxHeadSeqNo: "SEQ987654324", swTaxId: "SWTAX004", entryId: "123456789012345681", taxvouNo: "TAX-VOUCHER-004", traAmt: 1200.00, transStatusName: "已支付", limitDateStr: "2024-06-21" },
  { taxHeadSeqNo: "SEQ987654325", swTaxId: "SWTAX005", entryId: "123456789012345682", taxvouNo: "TAX-VOUCHER-005", traAmt: 5600.20, transStatusName: "已支付", limitDateStr: "2024-06-22" },
];

const mockApiResponse: ApiPaginatedResponse<CustomsTaxSchema> = {
  code: 200,
  message: "Success",
  data: {
    items: mockCustomsTaxes,
    total: 30,
    page: 1,
    page_size: 5,
    pages: 6,
  },
  timestamp: new Date().toISOString(),
};

/**
 * Custom hook to fetch customs tax data.
 */
export function useCustomsTax(page: number, limit: number) {
  const [data, setData] = useState<PaginationData<CustomsTaxSchema> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Simulate API call
        const paginatedItems = mockCustomsTaxes.slice((page - 1) * limit, page * limit);
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
