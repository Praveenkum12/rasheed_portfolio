import {
  HardHat, Flame, Leaf, ShieldCheck, Droplet, LayoutGrid, Megaphone, Zap, TriangleAlert, LifeBuoy,
  FireExtinguisher, ClipboardCheck, FileText, Search, Award, GraduationCap, Users, Target, TrendingUp,
  Recycle, Siren, Eye, BookOpen, type LucideProps,
} from 'lucide-react';
import type { IconName } from '@/data/types';

const map: Record<IconName, React.ComponentType<LucideProps>> = {
  hardhat: HardHat, flame: Flame, leaf: Leaf, shield: ShieldCheck, droplet: Droplet, grid: LayoutGrid,
  megaphone: Megaphone, zap: Zap, alert: TriangleAlert, lifebuoy: LifeBuoy, extinguisher: FireExtinguisher,
  clipboard: ClipboardCheck, file: FileText, search: Search, award: Award, grad: GraduationCap, users: Users,
  target: Target, trending: TrendingUp, recycle: Recycle, siren: Siren, eye: Eye, book: BookOpen,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" {...props} />;
}
