"use server";

import { db } from "@/lib/utils/db";
import { JsonForms } from "@/lib/utils/schema";
import { desc, eq } from "drizzle-orm";
import FormListItem from "./FormListItem";
import { currentUser } from "@clerk/nextjs/server";
import CreateForm from "./CreateForm";
import { withDb } from "@/lib/utils/db-utils";

const getFormList = async (userEmail) => {
  return withDb(async () => {
    if (!userEmail) {
      return [];
    }
    
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.createdBy, userEmail))
        .orderBy(desc(JsonForms.id));
        
      return result || [];
    } catch (error) {
      console.error('Error fetching forms:', error);
      return [];
    }
  });
};

export default async function FormList() {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      return (
        <div className="py-10 px-4">
          <h2 className="font-bold text-3xl">Your Forms</h2>
          <div className="mt-5">
            <p className="text-muted-foreground">Please sign in to view your forms.</p>
          </div>
        </div>
      );
    }

    const formList = await getFormList(userEmail);

    return (
      <div className="py-10 px-4">
        <h2 className="font-bold text-3xl">Your Forms</h2>
        <div className="mt-5 flex flex-row flex-wrap gap-5">
          {formList.length > 0 ? (
            formList.map((form) => (
              <FormListItem
                key={form.id}
                formRecord={form}
                jsonForm={form.jsonform}
              />
            ))
          ) : (
            <div className="text-muted-foreground space-y-2">
              <p>You have not created any forms yet.</p>
              <CreateForm />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in FormList:', error);
    return (
      <div className="py-10 px-4">
        <h2 className="font-bold text-3xl">Your Forms</h2>
        <div className="mt-5">
          <p className="text-muted-foreground">An error occurred while loading your forms. Please try again later.</p>
        </div>
      </div>
    );
  }
}
