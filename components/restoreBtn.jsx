"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function RestoreButton({ urlId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleRestore() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/dashboard/urls/restore",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: urlId,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        alert(
          data.error ||
          "Failed to restore URL"
        );

        return;
      }

      setOpen(false);

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong"
      );

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
            text-primary
            hover:bg-primary/10
            hover:text-primary
          "
        >
          <RotateCcw
            className="h-4 w-4"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>
            Restore URL
          </DialogTitle>

          <DialogDescription>
            This URL will become active again and appear in your dashboard.
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
            onClick={handleRestore}
            disabled={loading}
          >
            <RotateCcw
              className="h-4 w-4"
            />

            {loading
              ? "Restoring..."
              : "Restore"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}