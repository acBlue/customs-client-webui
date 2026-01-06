import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCustomsTax } from "@/hooks/use-customs-tax";
import { AlertTriangle, Loader2 } from "lucide-react";

export function CustomsTaxPage() {
  const [page, setPage] = useState(1);
  const limit = 5; // Items per page
  const { data, isLoading, error } = useCustomsTax(page, limit);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (data && page < data.pages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">海关税费单</h1>
          <p className="text-sm text-muted-foreground">
            查看、搜索和管理所有的海关税费单。
          </p>
        </div>
        <Button>同步税费单</Button>
      </header>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm">最近的税费单</h3>
        </div>

        {isLoading && (
          <div className="p-8 text-center text-muted-foreground flex items-center justify-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            数据加载中...
          </div>
        )}

        {error && (
            <div className="p-8 text-center text-destructive flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                加载失败: {error.message}
            </div>
        )}

        {!isLoading && !error && data && data.items.length === 0 && (
            <div className="p-8 text-center text-muted-foreground italic">
                未找到任何税费单数据。
            </div>
        )}

        {!isLoading && !error && data && data.items.length > 0 && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>报关单号</TableHead>
                  <TableHead>税票号</TableHead>
                  <TableHead>应缴金额</TableHead>
                  <TableHead>支付状态</TableHead>
                  <TableHead>缴款期限</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((tax) => (
                  <TableRow key={tax.swTaxId}>
                    <TableCell className="font-mono text-xs">{tax.entryId}</TableCell>
                    <TableCell className="font-mono text-xs">{tax.taxvouNo}</TableCell>
                    <TableCell>¥{tax.traAmt.toFixed(2)}</TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={tax.transStatusName} />
                    </TableCell>
                    <TableCell>{tax.limitDateStr}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">详情</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 border-t flex justify-between items-center text-sm">
               <span className="text-muted-foreground">
                第 {data.page} / {data.pages} 页 (共 {data.total} 条)
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={page <= 1}>
                  上一页
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={page >= data.pages}>
                  下一页
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, string> = {
    "已支付": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    "未支付": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    "支付失败": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };

  const badgeClass = statusMap[status] || "bg-gray-100 text-gray-800";

  return <Badge className={badgeClass}>{status}</Badge>;
}
