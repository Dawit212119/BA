import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
              <TableCell className="text-right">{use.role}</TableCell>
              <TableCell> DELETE</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Usertabledata;
