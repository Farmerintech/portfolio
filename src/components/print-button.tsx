"use client";

import { Download } from "lucide-react";

import { Button } from "./ui/button";

export default function PrintButton() {
  return (
    <Button variant="brand" onClick={() => window.print()}>
      <Download className="size-4" />
      Download PDF
    </Button>
  );
}
