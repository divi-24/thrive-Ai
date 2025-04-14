"use server";

import { FormListItemResp } from "@/components/forms/response/FormListItemResp";
import { db } from "@/lib/utils/db";
import { JsonForms } from "@/lib/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
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
        .where(eq(JsonForms.createdBy, userEmail));
        
      return result || [];
    } catch (error) {
      console.error('Error fetching forms:', error);
      return [];
    }
  });
};

export default async function Responses() {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      return (
        <div className="py-10 px-4">
          <h2 className="font-bold text-3xl">Responses</h2>
          <div className="mt-5">
            <p className="text-muted-foreground">Please sign in to view your form responses.</p>
          </div>
        </div>
      );
    }

    const formList = await getFormList(userEmail);

    return (
      <div className="py-10 px-4">
        <h2 className="font-bold text-3xl">Responses</h2>
        <div className="mt-5 flex flex-row flex-wrap gap-5">
          {formList.length > 0 ? (
            formList.map((form, index) => (
              <FormListItemResp
                key={index}
                formRecord={form}
                jsonForm={JSON.parse(form.jsonform)}
              />
            ))
          ) : (
            <div className="text-muted-foreground">
              <p>No form responses found.</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Responses:', error);
    return (
      <div className="py-10 px-4">
        <h2 className="font-bold text-3xl">Responses</h2>
        <div className="mt-5">
          <p className="text-muted-foreground">An error occurred while loading your responses. Please try again later.</p>
        </div>
      </div>
    );
  }
}
