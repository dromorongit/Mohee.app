import React from "react"

export function FormField({
  label,
  id,
  error,
  helperText,
  children,
}: {
  label: string
  id: string
  error?: string
  helperText?: string
  children: React.ReactElement
}) {
  const describedBy = error ? `${id}-error` : helperText ? `${id}-helper` : undefined

  return (
    <div className="flex flex-col w-full gap-1.5">
      <label htmlFor={id} id={`${id}-label`} className="text-sm font-semibold leading-none">
        {label}
      </label>
      <div className="relative">
        {React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          id,
          "aria-labelledby": `${id}-label`,
          ...(describedBy ? { "aria-describedby": describedBy } : {}),
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-xs opacity-75">
          {helperText}
        </p>
      )}
    </div>
  )
}
