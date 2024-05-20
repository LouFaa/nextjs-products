import { notFound } from "next/navigation";

export const apiFetch = async (path) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      notFound();
    }

    return response.json();
  } catch (error) {
    notFound();
  }
};
