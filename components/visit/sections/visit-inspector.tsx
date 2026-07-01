"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Search, ChevronDown, UserRound, Check, Plus } from "lucide-react";
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";

import { VisitFormValues } from "@/types/visit-form";
import { UserOption } from "@/types/user";
import Image from "next/image";

interface Props {
  users: UserOption[];
  register: UseFormRegister<VisitFormValues>;
  watch: UseFormWatch<VisitFormValues>;
  setValue: UseFormSetValue<VisitFormValues>;
  errors: FieldErrors<VisitFormValues>;
}

export function VisitInspector({
  users,
  register,
  watch,
  setValue,
  errors,
}: Props) {
  const selectedId = Number(watch("user_id"));

  const selected = useMemo(
    () => users.find((user) => user.id === selectedId),
    [users, selectedId],
  );

  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showCreateInspector, setShowCreateInspector] = useState(false);

  const [saving, setSaving] = useState(false);

  const [visitor, setVisitor] = useState({
    name: "",
    employee_id: "",
    role: "",
    email: "",
    phone: "",
    joined_at: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const [preview, setPreview] = useState("/images/default-avatar.jpg");

  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.role}`.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [users, keyword]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleCreateVisitor() {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", visitor.name);
      formData.append("employee_id", visitor.employee_id);
      formData.append("role", visitor.role);
      formData.append("email", visitor.email);
      formData.append("phone", visitor.phone);
      formData.append("joined_at", visitor.joined_at);

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      // otomatis memilih visitor baru
      setValue("user_id", result.id, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      alert("Visitor created successfully.");

      setShowCreateInspector(false);

      setVisitor({
        name: "",
        employee_id: "",
        role: "",
        email: "",
        phone: "",
        joined_at: "",
      });

      setPhoto(null);

      setPreview("/images/default-avatar.jpg");

      window.location.reload();
    } catch (err) {
      console.error(err);

      alert("Failed to create visitor.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4 border-b border-slate-200 pb-8">
      <div>
        <h2 className="text-xl font-semibold">Inspector</h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the inspector responsible for this visit.
        </p>
      </div>

      <div ref={ref} className="relative">
        {/* Selected */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            transition
            hover:border-blue-500
            hover:shadow-sm
          "
        >
          {selected ? (
            <div className="flex items-center gap-4">
              <Image
                src={selected.photo || "/images/default-avatar.jpg"}
                alt={selected.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-slate-200 object-cover"
              />

              <div className="text-left">
                <p className="font-semibold text-slate-900">{selected.name}</p>

                <p className="text-sm text-slate-500">{selected.role}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <UserRound className="text-slate-400" />

              <span className="text-slate-400">Select Inspector</span>
            </div>
          )}

          <ChevronDown
            size={18}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        <input
          type="hidden"
          {...register("user_id", {
            required: "Inspector is required",
            valueAsNumber: true,
          })}
        />

        {errors.user_id && (
          <p className="mt-2 text-sm text-red-500">{errors.user_id.message}</p>
        )}

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute
              z-50
              mt-2
              w-full
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-xl
            "
          >
            {/* Search */}
            <div className="border-b p-4">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
                <Search size={16} className="text-slate-400" />

                <input
                  placeholder="Search inspector..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto">
              {filtered.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    setValue("user_id", user.id, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });

                    setOpen(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    px-4
                    py-3
                    transition
                    hover:bg-blue-50
                    ${selectedId === user.id ? "bg-blue-50" : ""}
                  `}
                >
                  {/* PERBAIKAN DI SINI */}
                  <img
                    src={preview}
                    alt={user.name}
                    className="h-12 w-12 rounded-full border object-cover"
                  />

                  <div className="flex-1 text-left">
                    <p className="font-medium text-slate-900">{user.name}</p>

                    <p className="text-xs text-slate-500">{user.role}</p>
                  </div>

                  {selectedId === user.id && (
                    <Check size={18} className="text-blue-600" />
                  )}
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="space-y-4 p-5">
                  <p className="text-center text-sm text-slate-500">
                    No inspector found.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setShowCreateInspector(true);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-white
                      transition
                      hover:bg-blue-700
                    "
                  >
                    <Plus size={18} />
                    Add "{keyword}" as New Inspector
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setShowCreateInspector(true);
          }}
          className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-dashed
              border-blue-300
              bg-blue-50
              px-4
              py-3
              text-sm
              font-medium
              text-blue-600
              transition
              hover:bg-blue-100
            "
        >
          <Plus size={18} />
          Add New Inspector
        </button>
      </div>
      {showCreateInspector && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="border-b border-slate-200 px-6 py-5">
              <h3 className="text-xl font-bold text-slate-900">
                Add New Visitor
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Register a new visitor without leaving this page.
              </p>
            </div>

            {/* Body */}
            <div className="space-y-6 p-6">
              {/* Upload Photo */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src="/images/default-avatar.jpg"
                    alt="Preview"
                    className="h-28 w-28 rounded-full border-4 border-slate-200 object-cover"
                  />

                  <label
                    className="
                absolute
                bottom-0
                right-0
                cursor-pointer
                rounded-full
                bg-blue-600
                px-3
                py-2
                text-xs
                font-medium
                text-white
                shadow-lg
              "
                  >
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        setPhoto(file);

                        setPreview(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  JPG, PNG (Max 5 MB)
                </p>
              </div>

              {/* Form */}
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    value={visitor.name}
                    onChange={(e) =>
                      setVisitor((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Visitor Name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Employee ID
                  </label>

                  <input
                    type="text"
                    value={visitor.employee_id}
                    onChange={(e) =>
                      setVisitor((prev) => ({
                        ...prev,
                        employee_id: e.target.value,
                      }))
                    }
                    placeholder="EMP0001"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Role *
                  </label>

                  <select
                    value={visitor.role}
                    onChange={(e) =>
                      setVisitor((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option>Supervisor</option>
                    <option>Assistant</option>
                    <option>Inspector</option>
                    <option>Foreman</option>
                    <option>Manager</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    value={visitor.email}
                    onChange={(e) =>
                      setVisitor((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="email@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    value={visitor.phone}
                    onChange={(e) =>
                      setVisitor((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+62..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Join Date
                  </label>

                  <input
                    type="date"
                    value={visitor.joined_at}
                    onChange={(e) =>
                      setVisitor((prev) => ({
                        ...prev,
                        joined_at: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                type="button"
                onClick={() => setShowCreateInspector(false)}
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-5
                  py-3
                  font-medium
                  text-slate-600
                  hover:bg-slate-100
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleCreateVisitor}
                className="
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:bg-slate-400
                "
              >
                {saving ? "Saving..." : "Save Visitor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
