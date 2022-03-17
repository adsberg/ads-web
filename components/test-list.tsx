import { useState } from "react";
import { useQuery, UseQueryOptions } from "graphql-hooks";
import { TestItem } from "../lib/api/types";

export const TEST_LIST_QUERY = `
  query TestListQuery {
    testItems {
      id
      name
    }
  }
`;

export const testItemsQueryOptions = ():UseQueryOptions<any> => ({
  variables: {},
  updateData: (prevResult, result) => ({
    ...result,
    testItems: prevResult
      ? [...prevResult.testItems, ...result.testItems]
      : result.testItems
  })
});

export default function TestList() {
  const [skip, setSkip] = useState(0);
  const { loading, error, data, refetch } = useQuery<{ testItems: TestItem[] }>(
    TEST_LIST_QUERY,
    testItemsQueryOptions()
  );

  if (error) return <div>Error loading posts.</div>;
  if (!data) return <div>Loading</div>;

  const {testItems} = data;
  // const areMorePosts = allPosts.length < _allPostsMeta.count;

  return (
    <>
      <section id="test-list">
        <ul>
          {testItems.map((post, index) => (
            <li key={post.id}>
              <div>
                <span>{index + 1}. </span>
                <h2>{post.name}</h2>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
