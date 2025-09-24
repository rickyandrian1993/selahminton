import { supabaseServer } from "@/libs/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = supabaseServer();

  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const link = formData.get("link") as string;
    const file = formData.get("image") as File;

    if (!name || !link || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Upload image to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("products").getPublicUrl(fileName);

    // Insert product into DB
    const { error: insertError } = await supabase.from("products").insert([
      {
        name,
        link,
        image_url: publicUrl,
      },
    ]);

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error adding product:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
