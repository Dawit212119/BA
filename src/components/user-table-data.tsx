import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DeleteUserButton,
  PlaceholderDeleteUserButton,
} from "./delete-user-button";
import { ChangeRole } from "./changeRole";
type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: "Admin" | "User";
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}[];
const Usertabledata = ({ user }: { user: User }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>

            <TableHead>Role</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.map((use) => (
            <TableRow key={use.id}>
              <TableCell className="font-medium">
                {use.id.slice(0, 8)}
              </TableCell>
              <TableCell>{use.name}</TableCell>
              <TableCell> {use.email}</TableCell>
              <TableCell className="text-right">
                {use.role === "User" ? (
                  <ChangeRole userId={use.id} role={use.role} />
                ) : (
                  use.role
                )}
              </TableCell>
              <TableCell>
                {" "}
                {use.role === "User" ? (
                  <DeleteUserButton userId={use.id} />
                ) : (
                  <PlaceholderDeleteUserButton />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Usertabledata;
