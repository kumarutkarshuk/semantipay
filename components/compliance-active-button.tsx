"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { updateComplianceActive } from "@/lib/next-api";
import { toast } from "sonner";

export default function ComplianceActiveButton({
  isActive,
  ruleId
}: {
  isActive: boolean;
  ruleId: number;
}) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateComplianceActive,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["compliance"] });
      toast("Success!", {
        description: "Compliance active status updated!",
      });
    },
    onError: (e) => {
      toast("Error updating compliance active status: " + e.message);
    },
  });

  const handleSubmit = async () => {
    await mutateAsync({
      is_active: isActive ? "FALSE" : "TRUE",
      rule_id: ruleId
    });
  };

  return (
    <Button
      variant="default"
      size="sm"
      className={`w-full ${isActive ? "" : "bg-green-800 hover:bg-green-900"}`}
      onClick={handleSubmit}
    >
      {isPending ? "Marking..." : isActive ? "Mark Inactive" : "Mark Active"}
    </Button>
  );
}
