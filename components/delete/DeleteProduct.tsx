// import useRouter so we can redirect the user after deleting the product
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";

// import the deleteProduct server action
import { deleteProduct } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";

export default function DeleteProduct({ id }: { id: string }) {
  // initialize the router
  const router = useRouter();

  // create a function to handle the delete operation
  const handleDelete = async () => {
    const didDelete = await deleteProduct(id);
    if (didDelete) router.push("/search");
    // else show error, like a toast
  };

  return (
    <div className="pt-20 flex min-h-screen items-start justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <TrashIcon className="h-12 w-12 text-red-500" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Are you sure?</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This action cannot be undone. This will permanently delete product
              #{id}.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          {/* add the onClick event */}
          <Button onClick={handleDelete} variant="destructive">
            Confirm Delete
          </Button>
          <Button
            onClick={() => router.push(`/product/view/${id}`)}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
