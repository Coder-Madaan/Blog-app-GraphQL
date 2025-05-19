// app/blog/page.jsx
'use client';

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      title
      author
    }
  }
`;

export default function BlogListPage() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-8 bg-amber-200 rounded w-1/4 mb-8"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-6 p-6 bg-white rounded-lg shadow-md">
            <div className="h-6 bg-amber-100 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-amber-100 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center">
      <div className="bg-red-100 p-6 rounded-lg max-w-md text-center">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Error loading posts</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">
            The Orange Chronicle
          </h1>
          <div className="border-t-2 border-b-2 border-amber-200 py-2">
            <p className="text-stone-600 uppercase tracking-wide text-sm">
              Latest Posts
            </p>
          </div>
        </header>

        <div className="space-y-6">
          {data.posts.map((post) => (
            <article 
              key={post._id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/blog/${post._id}`}>
                <div className="p-6">
                  <h2 className="text-2xl font-serif text-amber-700 group-hover:text-amber-800 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-stone-600">
                    by <span className="font-medium text-stone-700">{post.author}</span>
                  </p>
                  <div className="mt-4 flex items-center">
                    <span className="text-amber-600 hover:text-amber-700 font-medium">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}