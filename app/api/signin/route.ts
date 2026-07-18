import dbConnect from "@/lib/dbconnect";
import User from "@/models/user.model";
export async function POST(req: Request) {
  await dbConnect();
  const { phoneno, code } = await req.json();

  if (!phoneno || !code) {
    return new Response(
      JSON.stringify({ error: "Phone number or code is required" }),
      { status: 400 },
    );
  }
  const user = await User.findOne({ phoneno, code });
  if (!user) {
    return new Response(
      JSON.stringify({ error: "Invalid phone number or code" }),
      { status: 401 },
    );
  }
  return new Response(JSON.stringify({ message: "Signin successful", user }), {
    status: 200,
  });
}
