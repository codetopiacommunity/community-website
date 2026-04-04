const HASHNODE_GQL_ENDPOINT = "https://gql.hashnode.com";

export interface HashnodeAuthor {
  name: string;
  profilePicture: string;
}

export interface HashnodeTag {
  name: string;
  slug: string;
}

export interface HashnodeArticle {
  slug: string;
  title: string;
  brief: string;
  coverImage: { url: string };
  author: HashnodeAuthor;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: HashnodeTag[];
  reactionCount: number;
  responseCount: number;
}

export interface HashnodeArticleDetail extends HashnodeArticle {
  content: { html: string };
  url: string;
  seo?: { title?: string; description?: string };
}

const GET_PUBLICATION_ARTICLES = `
  query GetPublicationArticles($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            slug title brief
            coverImage { url }
            author { name profilePicture }
            publishedAt readTimeInMinutes
            tags { name slug }
            reactionCount responseCount
          }
        }
      }
    }
  }
`;

const GET_ARTICLE = `
  query GetArticle($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        slug title brief
        coverImage { url }
        author { name profilePicture }
        publishedAt readTimeInMinutes
        tags { name slug }
        reactionCount responseCount
        content { html }
        url
        seo { title description }
      }
    }
  }
`;

async function gqlFetch<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(HASHNODE_GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`Hashnode API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json.data as T;
}

function mapNode(node: Record<string, unknown>): HashnodeArticle {
  const coverImage = (node.coverImage as Record<string, unknown> | null) ?? {};
  const author = (node.author as Record<string, unknown> | null) ?? {};
  const tags = (node.tags as Record<string, unknown>[] | null) ?? [];

  return {
    slug: (node.slug as string) ?? "",
    title: (node.title as string) ?? "",
    brief: (node.brief as string) ?? "",
    coverImage: { url: (coverImage.url as string) ?? "" },
    author: {
      name: (author.name as string) ?? "",
      profilePicture: (author.profilePicture as string) ?? "",
    },
    publishedAt: (node.publishedAt as string) ?? "",
    readTimeInMinutes: (node.readTimeInMinutes as number) ?? 0,
    tags: tags.map((t) => ({
      name: (t.name as string) ?? "",
      slug: (t.slug as string) ?? "",
    })),
    reactionCount: (node.reactionCount as number) ?? 0,
    responseCount: (node.responseCount as number) ?? 0,
  };
}

export async function fetchArticles(host: string): Promise<HashnodeArticle[]> {
  const data = await gqlFetch<{
    publication: {
      posts: { edges: { node: Record<string, unknown> }[] };
    } | null;
  }>(GET_PUBLICATION_ARTICLES, { host, first: 50 });

  const edges = data?.publication?.posts?.edges ?? [];
  return edges.map((edge) => mapNode(edge.node));
}

export async function fetchArticle(
  host: string,
  slug: string,
): Promise<HashnodeArticleDetail | null> {
  const data = await gqlFetch<{
    publication: { post: Record<string, unknown> | null } | null;
  }>(GET_ARTICLE, { host, slug });

  const post = data?.publication?.post;
  if (!post) return null;

  const base = mapNode(post);
  const content = (post.content as Record<string, unknown> | null) ?? {};
  const seo = (post.seo as Record<string, unknown> | null) ?? null;

  return {
    ...base,
    content: { html: (content.html as string) ?? "" },
    url: (post.url as string) ?? "",
    ...(seo
      ? {
          seo: {
            title: (seo.title as string | undefined) ?? undefined,
            description: (seo.description as string | undefined) ?? undefined,
          },
        }
      : {}),
  };
}
