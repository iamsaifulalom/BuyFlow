import {
    BoxIcon,
    FolderCodeIcon,
    HomeIcon,
    ReceiptIcon,
    UsersIcon,
    Settings,
    MessageCircleIcon
} from "lucide-react";

export const adminMenu = [
    {
        title: "Menus",
        items: [
            { label: "Home", href: "/admin/dashboard", Icon: HomeIcon },
            { label: "Products", href: "/admin/products", Icon: BoxIcon },
            { label: "Categories", href: "/admin/categories", Icon: FolderCodeIcon },
            { label: "Customers", href: "/admin/customers", Icon: UsersIcon },
            { label: "Orders", href: "/admin/orders", Icon: ReceiptIcon },
        ],
    },
];
