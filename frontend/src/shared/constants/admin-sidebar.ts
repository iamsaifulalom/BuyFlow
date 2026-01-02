import { 
    BoxIcon,
    FolderCodeIcon,
    HomeIcon, 
    ReceiptIcon, 
    UsersIcon 
} from "lucide-react";

export const adminMenu = [
    {
        sectionTitle: "Main menus",
        options: [
            { name: "Home", path: "/admin/dashboard", Icon: HomeIcon },
            { name: "Products", path: "/admin/products", Icon: BoxIcon },
            { name: "Categories", path: "/admin/categories", Icon: FolderCodeIcon },
            { name: "Customers", path: "/admin/customers", Icon: UsersIcon },
            { name: "Orders", path: "/admin/orders", Icon: ReceiptIcon },
        ]
    }
]