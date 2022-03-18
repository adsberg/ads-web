import { useState } from "react";
import { useQuery, UseQueryOptions } from "graphql-hooks";
import { TestItem } from "../api-client/types";
import Link from "next/link";

export const TEST_ITEM_QUERY = `
  query TestItemQuery {
    testItem(id: "1") {
      id
      name
    }
  }
`;

export const testItemQueryOptions = (): UseQueryOptions<any> => ({
  variables: {},
  updateData: (prevResult, result) => ({
    ...result,
    testItems: prevResult
      ? [...prevResult.testItems, ...result.testItems]
      : result.testItems
  })
});

export default function TestItemComponent() {
  const [skip, setSkip] = useState(0);
  const { loading, error, data, refetch } = useQuery<{ testItem: TestItem }>(
    TEST_ITEM_QUERY,
    testItemQueryOptions()
  );

  if (error) return <div>Error loading posts.</div>;
  if (!data) return <div>Loading</div>;

  const { testItem } = data;
  // const areMorePosts = allPosts.length < _allPostsMeta.count;

  return (
    <>
      <section id="test-item">
        <div>
          <Link href={"/item"}>{testItem.name}</Link>
        </div>
      </section>
    </>
  );
}
