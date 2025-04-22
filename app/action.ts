"use server";

export async function handleForm(prevState: any, formData: FormData) {
  // console.log(formData.get("name"));
  // console.log(formData.get("email"));
  // console.log(formData.get("password"));
  const errors = [];
  if (formData.get("password") !== "1234") errors[0] = "wrong password";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    errors,
  };
}
