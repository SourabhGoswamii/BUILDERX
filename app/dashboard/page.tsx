import { redirect } from 'next/navigation';

export default function DashboardRootPage() {
  // Automatically route users to the overview page when they hit /dashboard
  redirect('/dashboard/overview');
}