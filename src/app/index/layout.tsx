import { IndexLayoutClient } from '@/components/index/index-layout-client';

export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return <IndexLayoutClient>{children}</IndexLayoutClient>;
}
