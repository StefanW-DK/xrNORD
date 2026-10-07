"use client";

import { useEffect, useRef } from "react";

/**
 * Client half of the form spam guards (see src/lib/formGuard.ts).
 * Renders a hidden honeypot input and records when the form appeared.
 * Spread `fields()` into the JSON body of the submission.
 */
export function useSpamGuard() {
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const fields = () => ({
    website: honeypot.current?.value ?? "",
    startedAt: startedAt.current,
  });

  const honeypotField = (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Website
        <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );

  return { honeypotField, fields };
}
