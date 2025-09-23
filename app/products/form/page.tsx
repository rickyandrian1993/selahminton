"use client";

import { supabase } from "@/utils/supabase";
import { useRef, useState } from "react";

export default function ProductForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      let image_url: string | null = null;

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products") // must match your bucket name
          .upload(fileName, imageFile);

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          throw uploadError;
        }

        // get public URL after successful upload
        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(fileName);

        image_url = publicUrl;
      }

      const { error: insertError } = await supabase.from("products").insert({
        name,
        link,
        image_url,
      });

      if (insertError) throw insertError;

      // reset form
      setName("");
      setLink("");
      setImageFile(null);

      // ✅ clear the file input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      alert("Error saving product: " + (err as Error).message);
      console.error(err);
    }
  }

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Check MIME type
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed (jpg, png, gif, etc).");
      return;
    }

    // Or check extension
    const allowedExt = ["jpg", "jpeg", "png", "gif", "webp"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowedExt.includes(ext)) {
      alert("Unsupported file type.");
      return;
    }
    console.log("sini");
    setImageFile(file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mb-4 border p-4 rounded bg-white"
    >
      <input
        className="border p-2"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={imageChangeHandler}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
