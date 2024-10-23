import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("sign up hit");

    if (!body.username || !body.email || !body.password) {
      return new Response("please fill all the fields,", { status: 400 });
    }
    if (body.password.length < 6) {
      return new Response("password must be more than 5 charecters.", {
        status: 400,
      });
    }
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (findUser) {
      return new Response("user already exists.", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });
    return new Response("user saved successfully", { status: 200 });
  } catch (err) {
    return new Response(`internal server error ${err}`, {
      status: 500,
    });
  }
}
