import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const transformation = transformationTypes[type];

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="m-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          creditBalance={user.creditBalance}
          type={transformation.type as TransformationTypeKey}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
