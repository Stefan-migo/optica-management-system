// app/(admin)/dashboard/page.tsx
import { Card, Metric, Badge, ProgressBar, Calendar } from '@/components/ui';
import { supabase } from '@/lib/supabase/client';

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
      {/* Sección Métricas Principales */}
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <Metric>Stock Crítico</Metric>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="destructive" className="text-lg">
              {lowStock?.length}
            </Badge>
            <span className="text-sm">productos bajo mínimo</span>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <Metric>Citas Hoy</Metric>
              <p className="text-2xl font-semibold mt-2">3/5 completadas</p>
            </div>
            <ProgressBar value={60} className="w-24 h-24" />
          </div>
        </Card>
      </div>

      {/* Calendario de Citas */}
      <div className="col-span-2">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Calendario de Citas</h2>
          <Calendar 
            events={appointments?.map(a => ({
              title: `${a.customers.name} - ${a.exam_type}`,
              date: new Date(a.date),
              status: a.status
            }))} 
          />
        </Card>
      </div>

      {/* Alertas Inmediatas */}
      <div className="space-y-6">
        <Card className="bg-amber-50">
          <h3 className="font-semibold mb-2">Próximas Citas</h3>
          <div className="space-y-3">
            {appointments?.slice(0,3).map(appt => (
              <div key={appt.id} className="p-3 bg-white rounded-lg shadow-sm">
                <p className="font-medium">{appt.customers.name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(appt.date).toLocaleTimeString('es-ES')} - {appt.exam_type}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-red-50">
          <h3 className="font-semibold mb-2">Stock Crítico</h3>
          <div className="space-y-2">
            {lowStock?.map(product => (
              <div key={product.id} className="flex justify-between items-center p-2 bg-white rounded">
                <span>{product.name}</span>
                <Badge variant="destructive">{product.stock} unidades</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}