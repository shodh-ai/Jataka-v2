import { redirect } from "next/navigation";

/** Legacy URL — send pilots to the live booking flow */
export default function PilotPage() {
  redirect("/book-pilot");
}
