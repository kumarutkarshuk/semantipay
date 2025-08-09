import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4 sm:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <Skeleton className="h-6 sm:h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Payrolls Skeleton */}
        <Card>
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Processing Status Skeleton */}
        <Card>
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-44" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-44" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Violations Summary Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-52" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
            >
              <div className="space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-20 self-start sm:self-center" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function PayrollResultSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-6 sm:pb-10 gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        {/* Mobile skeleton */}
        <div className="space-y-4 sm:hidden w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={i}/>
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="hidden sm:block">
          <div className="space-y-3">
            <div className="grid grid-cols-11 gap-4 pb-2">
              {Array.from({ length: 11 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-11 gap-4 py-2">
                {Array.from({ length: 11 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-[80%]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EmployeeTableSkeleton() {
  return (
    <>
    {/* Mobile skeleton */}
        <div className="space-y-4 sm:hidden mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-36 w-full" key={i}/>
          ))}
        </div>
    <Card className="hidden sm:block">
      <CardHeader className="pb-3 sm:pb-6">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
      <CardContent className="mt-4">
        <div>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4 pb-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-[80%]" />
              ))}
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 py-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-[50%]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
}

export function ComplianceTableSkeleton() {
  return (
    <>
    {/* Mobile skeleton */}
        <div className="space-y-4 sm:hidden mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-36 w-full" key={i}/>
          ))}
        </div>
    <Card className="hidden sm:block">
      <CardHeader className="pb-3">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
      <CardContent className="mt-4">
        <div>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4 pb-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-[80%]" />
              ))}
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 py-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-[50%]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
}

export function PayrollSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-6 sm:pb-10 gap-2">
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent>
        {/* Mobile skeleton */}
        <div className="space-y-4 sm:hidden w-full">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={i}/>
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="hidden sm:block">
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4 pb-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-[80%]" />
              ))}
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 py-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-[50%]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SettingsFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-36" />
        </div>
      </CardContent>
    </Card>
  );
}
