"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Search, ChevronDown, UserRound, Check } from "lucide-react";
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";

import { VisitFormValues } from "@/types/visit-form";
import { UserOption } from "@/types/user";

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
              <img
                src={selected.photo ?? "/images/default-avatar.jpg"}
                alt={selected.name}
                className="h-12 w-12 rounded-full border object-cover"
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
                    src={user.photo ?? "/images/default-avatar.jpg"}
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
                <div className="py-8 text-center text-sm text-slate-400">
                  No inspector found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
