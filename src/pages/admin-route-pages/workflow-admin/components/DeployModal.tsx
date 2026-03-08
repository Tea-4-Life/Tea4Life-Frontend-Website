import React, { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (file: File) => Promise<void>;
  loading: boolean;
}

const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  onDeploy,
  loading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  const handleDeploy = async () => {
    if (!selectedFile) return;
    await onDeploy(selectedFile);
    setSelectedFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-emerald-600" />
            Deploy Workflow (BPMN)
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm text-slate-500">
            Chọn file BPMN (.bpmn) để deploy lên Workflow Engine.
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            accept=".bpmn,.xml"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
          {selectedFile && (
            <p className="text-sm text-slate-600">
              📄 {selectedFile.name}{" "}
              <span className="text-slate-400">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            disabled={!selectedFile || loading}
            onClick={handleDeploy}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Deploy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeployModal;
