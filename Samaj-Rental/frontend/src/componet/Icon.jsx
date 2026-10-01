import {
  Archive,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Calculator,
  Check,
  CircleAlert,
  CircleUserRound,
  ClipboardList,
  Clock3,
  FileText,
  Home,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MapPin,
  MenuSquare,
  Package,
  Pencil,
  Phone,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Trash2,
  Trophy,
  UserRound,
  UsersRound,
  Utensils,
  WalletCards,
  X,
  Armchair,
} from "lucide-react";


const icons = {
  archive: Archive,
  badgeCheck: BadgeCheck,
  barChart: BarChart3,
  calendar: CalendarDays,
  calculator: Calculator,
  check: Check,
  alert: CircleAlert,
  userCircle: CircleUserRound,
  clipboard: ClipboardList,
  clock: Clock3,
  bill: FileText,
  home: Home,
  key: KeyRound,
  dashboard: LayoutDashboard,
  lock: LockKeyhole,
  mail: Mail,
  location: MapPin,
  menu: MenuSquare,
  package: Package,
  pencil: Pencil,
  phone: Phone,
  search: Search,
  send: Send,
  shield: ShieldCheck,
  bag: ShoppingBag,
  cart: ShoppingCart,
  sparkles: Sparkles,
  trash: Trash2,
  trophy: Trophy,
  user: UserRound,
  users: UsersRound,
  utensils: Utensils,
  wallet: WalletCards,
  close: X,
  furniture: Armchair,
};


function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  ...props
}) {

  const IconComponent =
    icons[name] || Sparkles;


  return (
    <IconComponent
      aria-hidden="true"
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}


export default Icon;