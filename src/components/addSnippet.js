"use client";
import createSnippet from "@/actions/snippet/create";
import fetchSnippetAction from "@/actions/snippet/fetch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SnipppetContext } from "./SnippetContext";
import editSnippetAction from "@/actions/snippet/edit";

const schema = z.object({
  title: z.string().nonempty("Title is required."),
  description: z.string().nonempty("Description is required."),
});

function AddSnippet() {
  const {
    openSnippetDialog,
    setOpenSnippetDialog,
    snippetEditValue,
    setSnippetEditValue,
  } = useContext(SnipppetContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (snippetEditValue !== null) {
      setValue("title", snippetEditValue.title);
      setValue("description", snippetEditValue.description);
      setOpenSnippetDialog(true);
    }
  }, [snippetEditValue]);

  async function handleOnSubmit(data) {
    let response;
    if (snippetEditValue === null) {
      response = await createSnippet(data, "/snippet");
    } else {
      const id = snippetEditValue._id;
      response = await editSnippetAction(data, id, "/snippet");
    }
    if (response.success) {
      toast.success(response.message);
      reset();
      setSnippetEditValue(null);
      setOpenSnippetDialog(false);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="mt-20">
      <>
        <div className="px-4">
          <Button onClick={() => setOpenSnippetDialog(true)}>
            Add Snippet
          </Button>
        </div>
        <Dialog
          open={openSnippetDialog}
          onOpenChange={() => {
            setOpenSnippetDialog(false);
            reset();
            setSnippetEditValue(null);
          }}
        >
          <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Enter the title"
                  />
                  {errors && errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    {...register("description")}
                    id="description"
                    placeholder="Enter the description"
                  />
                  {errors && errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <Button type="submit">Save Snippet</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}

export default AddSnippet;
