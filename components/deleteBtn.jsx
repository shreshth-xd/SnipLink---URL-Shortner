"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";




export function DeleteButton({ urlId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/dashboard/urls/${urlId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to delete URL");
        return;
      }

      setOpen(false);

      // Re-fetches the current route's server component data
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="
            text-red-500
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>
            Delete URL
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone.
            The shortened URL will stop working immediately.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >

                import { Trash2 } from "lucide-react";

            {loading
              ? "Deleting..."
              : "Delete URL"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}