// app/(admin)/dashboard/page.tsx
import { Card, Metric, Badge, ProgressBar, Calendar } from '@/components/ui';
import { supabase } from '@/lib/supabase/client';
import { 
  InventoryWave,
  CalendarBlob,
  CalendarIcon,
  SalesGraph
} from "@/components/ui/illustrations";

export default async function DashboardPage() {
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, customers(name)')
    .order('date', { ascending: true })
    .limit(5);

  const { data: lowStock } = await supabase
    .from('products')
    .select('*')
    .lt('stock', 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Metrics Section */}
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <InventoryWave className="w-16 h-16" />
            <div>
              <Metric>Critical Stock</Metric>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="destructive" className="text-lg">
                  {lowStock?.length}
                </Badge>
                <span className="text-sm">items need attention</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <CalendarBlob className="w-12 h-12 text-indigo-600" />
              <div>
                <Metric>Today's Appointments</Metric>
                <p className="text-2xl font-semibold mt-2">3/5 completed</p>
              </div>
            </div>
            <ProgressBar 
              value={60} 
              className="w-24 h-24"
              indicatorClass="stroke-indigo-600"
              trackClass="stroke-gray-200"
            />
          </div>
        </Card>
      </div>

      {/* Calendar Section */}
      <div className="col-span-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            Appointment Calendar
          </h2>
          <Calendar
            className="border-none"
            events={appointments?.map(a => ({
              title: `${a.customers.name} - ${a.exam_type}`,
              date: new Date(a.date),
              status: a.status
            }))}
          />
        </Card>
      </div>

      {/* Stock Alerts */}
      <div className="space-y-6">
        <Card className="relative overflow-hidden">
          <div className="absolute -right-8 -top-8 opacity-10">
            <SalesGraph className="w-32 h-32" />
          </div>
          <h3 className="font-semibold mb-2">Low Stock</h3>
          {/* ... rest of stock list ... */}
        </Card>
      </div>
    </div>
  );
}