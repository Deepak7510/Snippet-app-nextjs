import fetchSnippetAction from "@/actions/snippet/fetch";
import AddSnippet from "@/components/addSnippet";
import SnippetTile from "@/components/SnippetTile";

async function Snippet() {
  const { data } = await fetchSnippetAction();

  return (
    <div className="mt-20 px-20">
      <AddSnippet />
      <div className="space-y-2 mt-3">
        {data && data.length > 0 ? (
          data.map((item, index) => {
            return (
              <SnippetTile Snippet={item} Sr_no={index + 1} key={item._id} />
            );
          })
        ) : (
          <div className="text-xl font-bold">No Snippet</div>
        )}
      </div>
    </div>
  );
}

export default Snippet;
