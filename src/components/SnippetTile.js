"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import deleteSnippetAction from "@/actions/snippet/delete";
import { useContext } from "react";
import { SnipppetContext } from "./SnippetContext";

const SnippetTile = ({ Snippet, Sr_no }) => {
  const { setSnippetEditValue } = useContext(SnipppetContext);
  async function handleDelete(getId) {
    const response = await deleteSnippetAction(getId, "/snippet");
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  function handleEdit(getSnippet) {
    setSnippetEditValue(getSnippet);
  }
  return (
    <Card>
      <CardContent>
        <h2 className="font-meduim text-xl">
          <span>{Sr_no}.</span> {Snippet.title}
        </h2>
        <p className="text-md">{Snippet.description}</p>
      </CardContent>
      <CardFooter className={"space-x-2"}>
        <Button size={"sm"} onClick={() => handleEdit(Snippet)}>
          Edit
        </Button>
        <Button size={"sm"} onClick={() => handleDelete(Snippet._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SnippetTile;
