import BlogListing from './listing'

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[]; symbol?: string | string[] }>
}) {
  const params = await searchParams
  return <BlogListing token={first(params.token)} symbol={first(params.symbol)} />
}
