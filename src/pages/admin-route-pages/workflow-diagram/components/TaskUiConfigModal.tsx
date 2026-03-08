import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Trash2, Save, X, Plus, Shield } from "lucide-react";
import {
  getUserTaskUiConfigApi,
  upsertUserTaskUiConfigApi,
  deleteUserTaskUiConfigApi,
} from "@/services/admin/workflowAdminApi";

type ActionRule = {
  action: string;
  value: string;
  permissions: string;
};

interface TaskUiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  bpmnProcessId: string;
  version?: number;
  taskKey: string;
  taskName?: string;
}

const EMPTY_RULE: ActionRule = { action: "", value: "", permissions: "" };

function safeParseArrayJson(raw?: string | null): unknown[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseRulesFromActionsJson(raw?: string | null): ActionRule[] {
  const items = safeParseArrayJson(raw);
  const mapped = items
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const obj = item as Record<string, unknown>;

      const permissionSource = Array.isArray(obj.permissions)
        ? (obj.permissions as unknown[])
            .map((x) => String(x ?? "").trim())
            .filter(Boolean)
            .join(", ")
        : String(obj.permissions ?? "").trim();

      return {
        action: String(obj.action ?? obj.label ?? obj.key ?? "").trim(),
        value: String(obj.value ?? "").trim(),
        permissions: permissionSource,
      } as ActionRule;
    })
    .filter((rule): rule is ActionRule =>
      Boolean(rule && (rule.action || rule.value || rule.permissions)),
    );

  return mapped.length > 0 ? mapped : [{ ...EMPTY_RULE }];
}

function buildActionsJson(rules: ActionRule[]): string {
  const payload = rules
    .map((rule) => ({
      action: rule.action.trim(),
      value: rule.value.trim(),
      permissions: rule.permissions
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    }))
    .filter((rule) => rule.action || rule.value || rule.permissions.length > 0);

  return JSON.stringify(payload, null, 2);
}

function buildPermissionsJson(rules: ActionRule[]): string {
  const allPermissions = rules
    .flatMap((rule) =>
      rule.permissions
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    )
    .filter(Boolean);

  const uniquePermissions = Array.from(new Set(allPermissions));
  return JSON.stringify(uniquePermissions, null, 2);
}

export default function TaskUiConfigModal({
  isOpen,
  onClose,
  bpmnProcessId,
  version,
  taskKey,
  taskName,
}: TaskUiConfigModalProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [formSchemaJson, setFormSchemaJson] = useState("");

  const [formSchemaFile, setFormSchemaFile] = useState<File | null>(null);
  const [actionRules, setActionRules] = useState<ActionRule[]>([
    { ...EMPTY_RULE },
  ]);

  const loadConfig = useCallback(async () => {
    setLoading(true);
    setIsNew(true);
    setDisplayName("");
    setDescription("");
    setFormSchemaJson("");
    setFormSchemaFile(null);
    setActionRules([{ ...EMPTY_RULE }]);

    try {
      const res = await getUserTaskUiConfigApi(bpmnProcessId, taskKey, version);
      if (res.data.data) {
        setIsNew(false);
        const data = res.data.data;
        setDisplayName(data.displayName || "");
        setDescription(data.description || "");
        setFormSchemaJson(data.formSchemaJson || "");
        setActionRules(parseRulesFromActionsJson(data.actionsJson));
      }
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status !== 404) {
        toast.error("Không thể tải cấu hình UI cho task này.");
      }
    } finally {
      setLoading(false);
    }
  }, [bpmnProcessId, taskKey, version]);

  useEffect(() => {
    if (isOpen && bpmnProcessId && taskKey) {
      loadConfig();
    }
  }, [isOpen, bpmnProcessId, taskKey, loadConfig]);

  if (!isOpen) return null;

  const updateRule = (index: number, patch: Partial<ActionRule>) => {
    setActionRules((prev) =>
      prev.map((rule, idx) => (idx === index ? { ...rule, ...patch } : rule)),
    );
  };

  const addRule = () => {
    setActionRules((prev) => [...prev, { ...EMPTY_RULE }]);
  };

  const removeRule = (index: number) => {
    setActionRules((prev) => {
      if (prev.length === 1) return [{ ...EMPTY_RULE }];
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertUserTaskUiConfigApi(
        bpmnProcessId,
        taskKey,
        {
          displayName,
          description,
          formSchemaFile,
          actionsJson: buildActionsJson(actionRules),
          permissionsJson: buildPermissionsJson(actionRules),
        },
        version,
      );
      toast.success("Đã lưu cấu hình UI thành công.");
      setIsNew(false);
      onClose();
    } catch (error) {
      toast.error("Lỗi khi lưu cấu hình UI.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteUserTaskUiConfigApi(bpmnProcessId, taskKey, version);
      toast.success("Đã xóa cấu hình UI thành công.");
      setIsNew(true);
      onClose();
    } catch (error) {
      toast.error("Lỗi khi xóa cấu hình UI.");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-6xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-100 bg-emerald-50/50">
          <div>
            <h2 className="text-xl font-bold text-emerald-800">
              Cấu hình UI: {taskName || taskKey}
            </h2>
            <p className="text-sm text-emerald-700/80 font-mono mt-1">
              Key: {taskKey}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-emerald-100 text-emerald-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label
                  htmlFor="displayName"
                  className="font-semibold text-slate-700"
                >
                  Tên hiển thị
                </Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tên hiển thị"
                  className="bg-white"
                />
              </div>

              <div className="grid gap-3">
                <Label
                  htmlFor="description"
                  className="font-semibold text-slate-700"
                >
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả công việc"
                  rows={2}
                  className="bg-white"
                />
              </div>

              <div className="grid gap-3 p-4 border rounded-xl bg-white">
                <Label
                  htmlFor="formSchemaFile"
                  className="font-semibold text-slate-700"
                >
                  File Form Schema (.json/.form)
                </Label>
                <Input
                  id="formSchemaFile"
                  type="file"
                  accept=".json,.form"
                  onChange={(e) =>
                    setFormSchemaFile(e.target.files?.[0] || null)
                  }
                  className="cursor-pointer"
                />
                <p className="text-xs text-slate-500">
                  {formSchemaJson
                    ? "Đã có form schema. Upload file mới để ghi đè."
                    : "Chưa có form schema."}
                </p>
              </div>

              <div className="grid gap-4 p-4 border rounded-xl bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-semibold text-slate-800">
                      Cấu hình Action - Value - Permission
                    </h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRule}
                    className="gap-1"
                  >
                    <Plus className="w-4 h-4" /> Thêm dòng
                  </Button>
                </div>

                <div className="space-y-3">
                  {actionRules.map((rule, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 border rounded-lg bg-slate-50"
                    >
                      <Input
                        className="md:col-span-3 bg-white"
                        placeholder="Hành động (VD: APPROVE)"
                        value={rule.action}
                        onChange={(e) =>
                          updateRule(index, { action: e.target.value })
                        }
                      />
                      <Input
                        className="md:col-span-3 bg-white"
                        placeholder="Giá trị (VD: approve)"
                        value={rule.value}
                        onChange={(e) =>
                          updateRule(index, { value: e.target.value })
                        }
                      />
                      <Input
                        className="md:col-span-5 bg-white"
                        placeholder="Quyền hạn (phân cách bởi dấu phẩy)"
                        value={rule.permissions}
                        onChange={(e) =>
                          updateRule(index, { permissions: e.target.value })
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="md:col-span-1 text-red-600 hover:bg-red-50"
                        onClick={() => removeRule(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <div>
            {!isNew && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting || saving || loading}
                className="gap-2"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Xóa cấu hình
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading || saving || deleting}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || loading || deleting}
              className="bg-emerald-600 hover:bg-emerald-700 gap-2 px-6"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Lưu cấu hình
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
