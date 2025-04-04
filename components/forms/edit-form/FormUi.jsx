"use client";

import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Button } from "@/app/components/ui/button";
import FieldEdit from "./FieldEdit";
import { db } from "@/lib/utils/db";
import { userResponses } from "@/lib/utils/schema";
import moment from "moment";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

function FormUi({
  jsonForm,
  selectedTheme,
  selectedStyle,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId,
  enabledSignIn = false,
}) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  let formRef = useRef();
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hadleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    
    if (enabledSignIn && !isSignedIn) {
      toast.error("Please sign in to submit this form");
      return;
    }

    if (!formId) {
      toast.error("Invalid form reference");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const result = await db.insert(userResponses).values({
        jsonResponse: JSON.stringify(formData),
        createdAt: moment().format("DD/MM/yyyy"),
        formRef: parseInt(formId),
        createdBy: user?.emailAddresses?.[0]?.emailAddress || "anonymous"
      });

      if (result) {
        formRef.current?.reset();
        setFormData({});
        toast.success("Response Submitted Successfully!");
        router.push("/thanks");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.message?.includes('foreign key constraint')) {
        toast.error("Invalid form reference. Please try again later.");
      } else {
        toast.error("Error while saving your form. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? [...formData[fieldName]] : [];

    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
    } else {
      const index = list.findIndex(item => item.label === itemName);
      if (index > -1) {
        list.splice(index, 1);
      }
    }

    setFormData({
      ...formData,
      [fieldName]: list,
    });
  };

  if (!formId) {
    return (
      <div className="p-5 text-center">
        <p className="text-muted-foreground">This form is not properly configured.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className="border p-5 md:w-[600px] rounded-lg border-blue-500 overflow-hidden"
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key == "boxshadow" && "5px 5px 0px black",
        border: selectedStyle?.key == "border" && selectedStyle.value,
      }}
    >
      <h2 className="font-bold text-center pb-2 text-pretty break-words text-2xl md:text-3xl">
        {jsonForm?.formTitle}
      </h2>
      <h2 className="text-sm md:text-base text-muted-foreground text-center">
        {jsonForm?.formHeading}
      </h2>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.fieldType == "select" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-muted-foreground">
                {field.label}
              </label>

              <Select
                required={field?.required}
                onValueChange={(v) => hadleSelectChange(field.fieldName, v)}
              >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item.label ? item.label : item}
                    >
                      {item.label ? item.label : item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-muted-foreground">
                {field.label}
              </label>
              <div className="flex flex-wrap gap-2">
                {field.options.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 border p-2 rounded-md"
                  >
                    <Checkbox
                      id={item.label ? item.label : item}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          field.fieldName,
                          item.label ? item.label : item,
                          checked
                        )
                      }
                    />
                    <label
                      htmlFor={item.label ? item.label : item}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label ? item.label : item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-muted-foreground">
                {field.label}
              </label>
              <RadioGroup
                onValueChange={(v) => hadleSelectChange(field.fieldName, v)}
              >
                <div className="flex flex-wrap gap-2">
                  {field.options.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 border p-2 rounded-md"
                    >
                      <RadioGroupItem
                        value={item.label ? item.label : item}
                        id={item.label ? item.label : item}
                      />
                      <Label htmlFor={item.label ? item.label : item}>
                        {item.label ? item.label : item}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-muted-foreground">
                {field.label}
              </label>
              <Input
                type={field.fieldType}
                name={field.fieldName}
                placeholder={field.placeholder}
                required={field?.required}
                onChange={handleInputChange}
                className="bg-transparent"
              />
            </div>
          )}

          {editable && (
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end mt-5">
        {enabledSignIn && !isSignedIn ? (
          <SignInButton mode="modal">
            <Button type="button">Sign In to Submit</Button>
          </SignInButton>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default FormUi;
